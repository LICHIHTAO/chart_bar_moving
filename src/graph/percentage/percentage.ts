import type {ScaleLinear, } from "d3-scale";
import {scaleLinear, } from "d3-scale";

import type {Selection, } from "d3-selection";
import {select} from "d3-selection";

/**
 * import {transition} from 'd3-transition' 으로 작성하면 호환이 안됨.
 */
import 'd3-transition';

import {arc} from "d3-shape";

import { interpolate } from "d3-interpolate";
import { easeQuadOut, } from "d3-ease";


/**
 * @author 이지도
 * @email leemap@fromknowledge.info / 비상 lctmap@naver.com
 * @date 2022.04.29
 * @version type/D3 7.1.0 
 * 
 * 원형 게이지 차트 
 * 중간에 text가 있고 주위 게이지를 통해 얼마나 진행했는지 확인 할 수 있음. 
 * chart(ID or class, data{}) - {inputvalue : 0~99 값(필수), size : 차트사이즈(필수) ...}
 */
class chart {
    private _tagname: string

    private minvalue:number

    // public endDomain: number
    // public startDomain: number
    /**
     * @argument LevelText 차트의 첫번째줄 표기 글 (Level, 단계 .. 등등) 입력
     */
    private LevelText:string
    /**
     * @argument numberText 차트의 두번째 줄 표기 글 (번위 입력 0~200, 세종~태종(글자로할시 글자 크기도 변경))
     */
    private numberText:string
    /**
     * @argument numberTextRatio 차트의 두번째 줄 표기 글의 사이즈 비율 / 초기값(0.2) 0.1 ~ 0.2 값을 추천
     */
    private numberTextRatio:number
    /**
     * @argument inputvalue 0~99까지의 값(단위:%) / 학습완료한 level
     */
    private inputvalue: number
    /**
     * @argument sizestandard 차트에 나오는 모든 크기의 기준이 됨(sizestandard 비율에 맞게 모든 값이 수정됨, width = height = sizestandard)
     */
    private sizestandard: number
    /**
     * @argument color 색상을 정해줌 [배경게이지, 게이지색상, 텍스트색상]
     */
    private color: [string, string, string]

    /**
     * @argument _svg svg 태그 값 / 중복 생성을 막기위해 만듬
     */
    private _svg:Selection<SVGSVGElement, unknown, HTMLElement, any> | undefined
    /**
     * @argument _newArcs g 태그 값 / 중복 생성을 막기위해 만듬
     */
    private _newArcs: Selection<SVGGElement, unknown, HTMLElement, any> | undefined
    /**
     * @argument _background 배경 게이지 path 태그 값 / 중복 생성을 막기위해 만듬
     */
    private _background: Selection<SVGPathElement, unknown, HTMLElement, any> | undefined
    /**
     * @argument _foreground 배경 게이지 path 태그 값 / 중복 생성을 막기위해 만듬
     */
    private _foreground: Selection<SVGPathElement, unknown, HTMLElement, any> | undefined
    /**
     * @argument _text1 첫줄 글씨 text 태그 값 / 중복 생성을 막기위해 만듬
     */
    private _text1:Selection<SVGTextElement, unknown, HTMLElement, any> | undefined
    /**
     * @argument _text2 둘째줄 글씨 text 태그 값 / 중복 생성을 막기위해 만듬
     */
    private _text2:Selection<SVGTextElement, unknown, HTMLElement, any> | undefined

    /**
     * 
     * @param name ID, class 값
     * @param data {inputvalue:0~99값(필수)/size:차트사이즈(필수)/start?:게이지시작/
                text1?:첫줄글/text2?:두번째줄글/textRatio?:두번째줄 글씨사이즈/
                color?:[배경게이지색상, 게이지 색상, 글씨색상]}
     */
    constructor(name:string, data:{inputvalue:number,
                                    size: number,
                                    start?:number,
                                    text1?:string,
                                    text2?:string,
                                    textRatio?:number,
                                    color?:[string, string, string]}){
        if (!name) throw new Error ("ID, class 값을 넣어주세요.");

        this._tagname = name

        if(!data.inputvalue) throw new Error("inputvalue 값을 넣어주세요.");

        this.inputvalue = data.inputvalue
        if(!data.size) throw new Error("size 값을 넣어주세요.");
        this.sizestandard = data.size

        this.minvalue = 0
        if(data.start) this.minvalue = data.start;

        if(data.start && data.start>= this.inputvalue) throw new Error("inputvalue가 end 보다 커야합니다.");

        this.LevelText = "Level"
        if(data.text1) this.LevelText = data.text1;

        this.numberText =`${this.minvalue}~${this.inputvalue}`
        if(data.text2) this.numberText = data.text2;

        this.numberTextRatio = 0.2
        if(data.textRatio) this.numberTextRatio = data.textRatio;

        this.color = ["#e6e6e6", "#6cd4a7", "#231f20"]

    }

    /**
     * 차트를 클릭하면 값 리턴
     * @param callback (event:pointerEvent - 각종 값 존재, data:undefined - data를 안 넣어줌)
     */
    public onClick(callback:(event:Event, data:any) => void){
        this._newArcs?.on("click", (evt, data) => {
            callback(evt, data);
        });
    }
    
    /**
     * 실행 및 업데이트 함수
     * @param data {inputvalue:0~99값(필수)/size:차트사이즈(필수)/start?:게이지시작/
                text1?:첫줄글/text2?:두번째줄글/textRatio?:두번째줄 글씨사이즈/
                color?:[배경게이지색상, 게이지 색상, 글씨색상]}
     */
    public update(data?:{
        /**
         * @param inputvalue 넣을값
         */
        inputvalue?:number,
        size?: number,
        start?:number,
        text1?:string, 
        text2?:string, 
        textRatio?:number,
        color?:[string, string, string]}) {
        /**
         * data 값이 존재하면 기존값에 덮어씌워서 this에 저장
         */
        if(data){
            if (data.inputvalue) this.inputvalue = data.inputvalue;
            if (data.size) this.sizestandard = data.size ;
            if (data.start) {
                if(this.inputvalue <= data.start) throw new Error("start 값은 inputvalue 보다 작아야함")
                this.minvalue = data.start;}
            if (data.text1) this.LevelText = data.text1;
            if (data.text2) this.numberText = data.text2;
            if (data.textRatio) this.numberTextRatio = data.textRatio;
        }

        let scale:ScaleLinear<number, number, never> = scaleLinear()
            .domain([0, 99])
            .range([0, Math.PI*2])
            .clamp(true);
    
        /**
         * <svg>를 한번만 생성 */ 
        if(!this._svg) this._svg = select(this._tagname).append("svg") as Selection<SVGSVGElement, unknown, HTMLElement, any>;
            
        this._svg.attr("width", this.sizestandard)
                .attr("height", this.sizestandard)
                .attr("viewBox",[0,0,this.sizestandard, this.sizestandard])
 
        /**
         * arc -> 3가지 타입이 있는데 그중 <any, Datum> 타입을 사용하기 위해 <void>를 넣어주므로서 <any, void> 사용
         *          1번째 및 3번째 타임을 사용할시 에러발생
         * <any, Datum> 타입을 사용하는 이유는 호모양을 지속적으로 갱신을 해주기 위함.
         */
        let backgroundArc = arc<void>()
            .startAngle(scale(0))
            .endAngle(scale(99))
            .innerRadius(this.sizestandard * 0.33)
            .outerRadius(this.sizestandard * 0.45)            
            // .cornerRadius(standard * 0.05);

        let mArc = arc<void>()
            .startAngle(scale(this.minvalue))
            .innerRadius(this.sizestandard * 0.33)
            .outerRadius(this.sizestandard * 0.45)            
            .cornerRadius(this.sizestandard * 0.05);
        
        /**
         * <g> 를 한번만 생성 */ 
        if(!this._newArcs)this._newArcs = this._svg
            .append("g")
                .attr("class", "d3chart_percentageChart_arcs");

        this._newArcs.attr("transform", `translate(${this.sizestandard/2},${this.sizestandard/2})`)

        //기준점(원점)을 표시하기위한 타원형
        // let startpoint = newArcs.append("ellipse")
        //         .attr("class","d3chart_percentageChart_startpoint")
        //         .attr("cy",-103)
        //         .attr("rx",3)
        //         .attr("ry",10)
        //         .attr("fill", this.color[0]);

        /**
         * <path>를 한번만 생성 */
        if(!this._background) this._background = this._newArcs.append("path")
            .attr("class", "d3chart_percentageChart_backgroundArc");
        
        this._background
            .attr("d", <any>backgroundArc)
            .attr("fill", this.color[0]);

        /**
         * <path>를 한번만 생성 */
        if(!this._foreground)this._foreground = this._newArcs.append("path") 
            .attr("class","d3chart_percentageChart_arc"); 
        
        let foregroundmotion = this._foreground
            .datum({endAngle:scale(this.inputvalue)}) //endAngle은 변수화 하여 datum에 저장
            /**
             * mArc는 리턴값이 존재함(M08...)따라서 any타입으로 정의함 */   
            .attr("d", <any>mArc)            
            .attr("fill", this.color[1])
            
        foregroundmotion.transition().duration(1000).ease(easeQuadOut)
            .attrTween("d", (d)=>{
                let minterpolate = interpolate(scale(this.minvalue as number), scale(this.inputvalue));
                return (t:number) => {                
                    d.endAngle = minterpolate(t);
                    mArc.endAngle(d.endAngle);
                    // 기준점(원점)이 있을 때 게이지가 꽉 차면 색상 변경해줌
                    // if (d.endAngle == this.scale(100)){
                    //     startpoint.attr("fill",this.color[1]);
                    // }
                    /**
                     * mArc는 void값이라 실질적으로 아무것도 반환하지 않음 대신 attrTween의 반환값이 string이여 함므로 형식만 as string으로 반환함.
                     * 따라서 endAngle이 적용된 mArc만 실행되게 됨.
                     */
                    return mArc() as string
                }
            })
        /**
        * 첫번째 줄의 text(예시, level)
        * <text>를 한번만 생성 
        */
        if(!this._text1)this._text1 =  this._newArcs.append("text")
            .attr("class", "d3chart_percentageChart_text1");
        
        this._text1.text(this.LevelText)
            .attr("y",`${-this.sizestandard*0.075}px`)
            .attr("font-size", this.sizestandard*0.15)
            .attr("font-family", "Freight")
            .attr("text-anchor", "middle")
            .attr("fill", this.color[2]);

        /**
        * 두번째 줄의 text(예시, 0~200)
        * <text>를 한번만 생성 
         */
        if(!this._text2) this._text2 =this._newArcs.append("text")
            .attr("class", "d3chart_percentageChart_text2");
        
        this._text2.text(this.numberText)
            .attr("y",`${this.sizestandard*0.13}px`)
            .attr("font-size", this.sizestandard*this.numberTextRatio)
            .attr("font-family", "Freight")
            .attr("text-anchor", "middle")
            .attr("font-weight", "bold")
            .attr("fill", this.color[2]);
    }
}


let draw = new chart("#d3Chart1",{inputvalue:50, size:400})
draw.update()
// draw.update({text2:"0~9",size: 300, start:50, inputvalue:60})
draw.onClick((event:Event, data:any)=>{
    console.log(event, data)
})
