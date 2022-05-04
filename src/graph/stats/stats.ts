import type {HierarchyNode} from "d3-hierarchy"
import {hierarchy} from "d3-hierarchy"

import type {Selection, } from "d3-selection"
import {select, selectAll } from "d3-selection"

import type{ScaleLinear, ScaleBand, ScaleSequential, NumberValue} from"d3-scale"
import {scaleLinear, scaleBand, scaleSequential} from "d3-scale"

import type {Axis} from "d3-axis"
import {axisBottom, axisLeft } from "d3-axis"

import {range, max, map, ascending} from "d3-array"

import { active } from "d3-transition"

import {zoom} from "d3-zoom"

import {interpolateBlues}from "d3-scale-chromatic"

import type { margintype, HierarchyDatum} from "./data"
import {data as localdata} from "./data"

// 1. 가져다 쓰려는 사람이 html tag 지정
// 2. data 넣는 함수
// 3. data 바꿀때 사용하는 함수

// const chart = new chart1()
// chart.select("d3ChartStats") 끝
// chart.inputData(data) 끝
// chart.chageData(data) 필요한가?

/**
 * @author 이지도
 * @email leemap@fromknowledge.info / 비상 lctmap@naver.com
 * @date 2022.04.21
 * 
 *목적: 
 * 해당 chart는 통계용 그래프를 그려준다.
 *설명:
 * 봉을 층층이 쌓은 형식으로 내부에 포함하고 있는 봉까지 한번에 확인할 수 있다.
 * 클릭을 하면 봉이 상하 좌우로 움직이며 새로운 봉의 형태를 잡는다.
 * inputdata로 Hierarchy타입의 데이터를 넣어야 하고 층이 많을 수록 모션이 많다.
 */
class chart {
    /**
     * 원본 input 데이터 저장용도
     */
    private _originaldata:HierarchyDatum; 

    /**
     * 전달받은 데이터 저장용
     */
    private _data:HierarchyNode<HierarchyDatum>;

    /**
     * html에 위치할 태크 값 전달 받는 용
     */
    private _tagName:string;
    private height:number;
    private width:number;

    private margin: margintype;

    private duration: number;
    private paddinginner: number;
    private paddingouter: number;

    private xRange:[number, number];
    private xDomain:number[];
    private xScale : ScaleBand<string | number>;
    private xAxis : Axis<string | number>;

    private yRange:[number, number];
    private yDomain:number[];
    private yScale:ScaleLinear<number, number, never>;
    private yAxis:Axis<NumberValue>;

    private color:ScaleSequential<string, never>;

    constructor(){

        this._originaldata = localdata; 
        this._data = this.inputData(localdata);
        this._tagName= "";

        this.height= 500;
        this.width= 500;
        this.margin = {top: 30, bottom: 100, right: 10, left:30};
        this.duration = 750;
        this.paddinginner = 0.2;
        this.paddingouter = 0.2;
    
        this.xRange = [this.margin.left, this.width - this.margin.right];
        this.xDomain = range(this.xmax());

        /**
         * scaleBand<number|string> => d3에서 문자열만 받을 수 있게 되어 있어서 숫자열도 받을 수 있게 넣어줌.
         */
        this.xScale = scaleBand<number|string>().domain(this.xDomain).range(this.xRange).paddingInner(this.paddinginner).paddingOuter(this.paddingouter);
        this.xAxis = axisBottom(this.xScale).tickSizeOuter(0);
    
        this.yRange = [this.height - this.margin.bottom, this.margin.top];
        this.yDomain = [0, this._data.value as number];
        this.yScale = scaleLinear().domain(this.yDomain).range(this.yRange);
        this.yAxis = axisLeft(this.yScale).ticks(this.width/80, "s");
    
        this.color = scaleSequential(interpolateBlues).domain([-10.5 * 2, 1.0 * 28]);
    }

    
    /**
     * 해당 html 위치에 chart를 실행시킴
     * @param tagName id, class 등 위치 값을 넣어준다.((예)#11111, .11111)
     * @function myzoom x축 확대 축소 함수
     * @function up children 에서 parent로 가는 함수
     * @function down parent 에서 children 으로 가는 함수
     * @returns svg.node()
     */
    public select(tagName:string) {
        this._tagName = tagName

        /**
         * 차트의 전체 사이즈 설정
        */
        console.log("class로 실행")
        const svg = select(tagName) // argument
            .append("svg")
            // .attr("width", width)
            // .attr("height", height)
            .attr("viewBox", [0, 0,this.width, this.height])
            .call((d) => {
                this.myzoom(d)
            })

        /**
         * 배경rect를 만들고 클릭하면 이전 차트 실행
         */
        svg.append("rect")
            .attr("class", "d3Chart_stats_background")
            .attr("fill-opacity",0)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("cursor","pointer") //커서모양 변경
            .on("click",(_,d)=>this.up(svg, d as HierarchyNode<HierarchyDatum>));
        
        /**
         * x축 세팅
         */
        svg.append("g")
            .attr("class","d3Chart_stats_x-axis")
            .attr("transform", `translate (0, ${this.height - this.margin.bottom})`)
            .call(this.xAxis)
            .call(g => g.selectAll("g")
                .selectAll("text")
                    .text(null)
                    .attr("text-anchor", "start")
                    .attr("alignment-baseline", "baseline")); //텍스트 제거,(원점)왼쪽하단 

        /**
         * y축 세팅
         */
        svg.append("g")
            .attr("class", "d3Chart_stats_y-axis")
            .attr("transform", `translate(${this.margin.left},0)`)  
            .call(this.yAxis).raise()
            .call(g => (g.selection ? g.selection() : g).select(".domain").remove()); //선 삭제

        this.down(svg, this._data)
        return svg.node()
        
    }


    /**
     * x축 줌 용도
     * @param svg 전체 svg 태크 선택
     * @function myzoomed 사이즈가 변했을 때 호출되는 위치 재설정 함수
     */
    private myzoom(svg:Selection<SVGSVGElement, unknown, HTMLElement, any>){

        const extent:[[number, number], [number, number]]= [[this.margin.left, this.margin.top], [this.width - this.margin.right, this.height - this.margin.top]];
        const mZoom = zoom<SVGSVGElement, unknown>()
            .scaleExtent([1,8])
            .translateExtent(extent)
            .extent(extent)
            .on("zoom", d=>this.myzoomed(d));
    
        svg.call(mZoom);
    }

    /**
     * myzoom에서 사용하는 함수
     * @param event 기본셋팅값
     */
    private myzoomed(event:any){
        /**
        * 기존 x축 값 저장용 리스트
        */
        let xlabel:string[] = [];
        this.xScale.range([this.margin.left, this.width - this.margin.right].map(d=>event.transform.applyX(d)));
        
        let svg = selectAll(this._tagName).select("svg");
        svg.select(".d3Chart_stats_enter")
            .selectAll("g")
                .attr("transform", (d)=>{
                    /**
                    * d 가 바로 HierarchyNode<HierarchyDatum> 타입을 받을 수 없어서 data로 새로 받음
                    */
                    const data = d as HierarchyNode<HierarchyDatum>
                    /**
                     * 기존에 있는 x축 이름 값 저장
                     */
                    xlabel.push(data.data.name as string);
                    return `translate(${this.xScale(this.xScale.domain()[data.data.index as number])},0)`;
                })
                    .selectAll("rect")
                        .attr("width", this.xScale.bandwidth());
        
        /**
         * rect 위로 y축을 세팅하기 위한 raise() 용
         */
        const y = svg.select(".d3Chart_stats_y-axis") as Selection<SVGSVGElement, unknown, HTMLElement, any>;
        y.raise().call(this.yAxis)
            .call(g => g.selection ? g.selection().select(".domain").remove() : g.select(".domain").remove());
        /**
         * x축 설정
         */    
        const x = svg.select(".d3Chart_stats_x-axis") as Selection<SVGSVGElement, unknown, HTMLElement, any>;
        x.call(this.xAxis)
            .call(g=>g.selectAll("text").text(null).data(xlabel).text(d=>d));

        }
    
    
/**
 * 자식 데이터로 내려가며 그래프를 그려주는 함수
 * @param svg 전체 svg 태그
 * @param d children 값이 존재하는 데이터
 */
    private down(svg:Selection<SVGSVGElement, unknown, HTMLElement, any>, d:HierarchyNode<HierarchyDatum>){
        /**
         *자식 데이터가 없으면 리턴
         */
        if(!d.children || active(svg.node())) return;

        /**
         * 현제 데이터를 배경 rect 데이터에 재저장
         */
        svg.select(".d3Chart_stats_background").datum(d);

        /**
         * 기존에 있는 enter 들을 모션 1 도중 서서히 투명화시키고 제거
         */
        const exit = svg.selectAll(".d3Chart_stats_enter")
            .attr("class", "d3Chart_stats_exit");

        exit.selectAll("g")
            .attr("fill-opacity", p => p === d ? 0 : null);

        exit.transition().duration(this.duration)
            .attr("fill-opacity",0)
            .remove();
        
        /**
         * 모션용 단색 봉 생성 (최후삭제)
         */ 
        const move = this.onecolorBar(svg, d,".d3Chart_stats_exit",d.data.index);

        /**
         * 모션 1에서 서서히 사라지면서 제거
         */
        move.attr("fill-opacity",1)
            .transition().duration(this.duration)
            .on("end", function(p) {select(this)
                .attr("fill-opacity", 0);})
                .remove();
        
        /**
         * 모션 1에서 흩어지는 모션용
         */
        move.selectAll("rect")
            .attr("fill-opacity",1)
            .transition().duration(this.duration)
            .attr("transform", (d,i)=> this.transforming(d as HierarchyNode<HierarchyDatum>,i,"spread"));

        /**
         * 최종적으로 보여질 칼라봉 생성
         */
        const enter = this.fullcolorBar(svg, d, ".d3Chart_stats_exit");

        /**
         * 모션 2 데이터 최대값에 맞게  y축 사이즈 재설정
         */
        const ymax = max(d.children as HierarchyNode<HierarchyDatum>[], d=>d? d.value : 0);

        this.yScale.domain([0, ymax? ymax : 0]);

        const y = svg.select(".d3Chart_stats_y-axis") as Selection<SVGSVGElement, unknown, HTMLElement, any>;
        y.transition().duration(this.duration).transition()
            .call(this.yAxis)
            .call(g => g.selection ? g.selection().select(".domain").remove() : g.select(".domain").remove());


        /**
         * 모션 2, x축 label 이동 
         */
        svg.select(".d3Chart_stats_x-axis")
            .selectAll("text")         
                .text(null)
                .data(map(d.children, d=>d.data.name))
                    .text(d=>d)
                        .attr("opacity",0)
                        .attr("transform",`rotate(60)`)
                        .transition().duration(this.duration).transition()
                        .attr("opacity",1)
                        .attr("transform",`translate(12,1) rotate(60)`);

        /**
         * 모션 2이 시작할때 칼라봉 보이게 설정
         */
        enter.transition().duration(this.duration).transition()
            .on("start", function(p) {select(this).attr("fill-opacity", 1);});

        /**
         * 모션 2에서 칼라봉을 하단으로 이동
         */
        enter.selectAll("g")
            .transition().duration(this.duration).transition()
            .attr("transform", (d,i)=> this.transforming(d as HierarchyNode<HierarchyDatum>, i, "array"));

        /**
         * 모션 2에서 칼라봉의 사이즈를 yScale 맞게 재설정
         */
        const rectsize = enter.selectAll("g")
            .selectAll("rect") as Selection<SVGGElement, unknown, HTMLElement, any>;

            rectsize.transition().duration(this.duration).transition()
            .attr("y", (d, i) => {
                const data = d as HierarchyNode<HierarchyDatum>;
                return i===0?this. yScale(data.data.value as number): this.yScale(data.data.y1 as number);
            })
            .attr("height", (d)=>{
                const data = d as HierarchyNode<HierarchyDatum>;
                return this.yScale(0)-this.yScale(data.value as number)
            });
    }

   
    /**
     * 부모 데이터로 올라가며 그래프를 그려주는 함수
     * @param svg 전체 svg 태그
     * @param d parent가 있는 데이터
     */
    private up(svg:Selection<SVGSVGElement, unknown, HTMLElement, any>, d:HierarchyNode<HierarchyDatum>){
        /**
         * 부모 데이터가 없으면 리턴, exit값이 존재하면 리턴 
         */
        if(!d.parent || !svg.selectAll(".d3Chart_stats_exit").empty()) return;
        /**
         * 배경에 부모데이터를 재설정
         */
        svg.select(".d3Chart_stats_background").datum(d.parent);
        
        /**
         * 클릭된 인텍스 값 저장
         */
        const idx = d.data.index;

        /**
         * 기존에 있는 enter를 exit으로 전환
         */
        const exit = svg.selectAll(".d3Chart_stats_enter")
            .attr("class", "d3Chart_stats_exit");
    
        /**
         * y축의 최대값 재설정 및 모션 1 적용
         */
        const ymax = max(d.parent.children as HierarchyNode<HierarchyDatum>[], d=>d? d.value : 0);
        this.yScale.domain([0, ymax ? ymax : 0])

        const y = svg.select(".d3Chart_stats_y-axis") as Selection<SVGSVGElement, unknown, HTMLElement, any>;
        y.transition().duration(this.duration)
            .call(this.yAxis)
            .call(g => g.selection ? g.selection().select(".domain").remove() : g.select(".domain").remove());
        /**
         * 모션 1 기존 칼라봉의 위치 조정 및 봉 사이즈를 y축에 맞게 재설정
         */ 
        exit.transition().duration(this.duration)
            .on("end", function(p) {select(this).remove();})
            .call(g=>g.selectAll("g").attr("transform", (d,i)=> this.transforming(d as HierarchyNode<HierarchyDatum>, i,"up") as string))
            .call(g=>g.selectAll("g")
                .selectAll('rect')
                    .attr("height", (d)=>{
                        const data = d as HierarchyNode<HierarchyDatum>;
                        return this.yScale(0)-this.yScale(data.value as number);
                    })
                    .attr("y", (d, i) => {
                        const data = d as HierarchyNode<HierarchyDatum>;
                        return i===0? this.yScale(data.data.value as number): this.yScale(data.data.y1 as number);
                    }))
        
        /**
         * 모션 2 x축 label 최기화, 가시화 및 이동
         */
        svg.select(".d3Chart_stats_x-axis")
            .selectAll("text")
                .text(null)
                .data(map(d.parent.children as HierarchyNode<HierarchyDatum>[] , d=>d.data.name))
                    .text(d=>d)
                        .attr("opacity",0)
                        .attr("transform",`rotate(60)`)
                        .transition().duration(this.duration).transition()
                        .attr("opacity",1)
                        .attr("transform",`translate(12,1) rotate(60)`);

        /**
         * 모션 2에서 사용할 움직용 단색봉 생성
         */ 
        const move = this.onecolorBar(svg, d,".d3Chart_stats_exit");

        /**
         * 모션 2 시작 할 때 보이게 하고 특정 index 값에 쌓음
         */ 
        move.selectAll("rect")
            .attr("transform", (d,i)=> this.transforming(d as HierarchyNode<HierarchyDatum>,i,"spread"))
            .transition().duration(this.duration).transition()
                .attr("transform", (d) =>{
                    const data = d as HierarchyNode<HierarchyDatum>;
                    return `translate(${this.xScale(this.xScale.domain()[idx as number])}, ${this.yScale(data.data.y1 as number)})`;
                })
                .on("start", function(p) {select(this).attr("fill-opacity",1);});

        /**
         * 모션 2 마지막 끝날 때 데이터 삭제
         */ 
        move.transition().duration(this.duration).transition().on("end", function(p) {select(this).remove();});

        /**
         * 마지막에 보일 칼라봉 생성
         */
        const enter = this.fullcolorBar(svg, d.parent ,".d3Chart_stats_exit");
        
        /**
         * 모션 2 동안에 서서히 가시화
         */ 
        enter.selectAll("g")
            .attr("fill-opacity", 0)
            .attr("transform",(d,i)=> this.transforming(d as HierarchyNode<HierarchyDatum>, i, "array"))
            .transition().duration(this.duration).transition()
            .attr("fill-opacity", 1);
    }


    /**
     *  칼라봉 그려주는 함수
     * @param svg 전체 svg 태그
     * @param d 해당상태의 데이터
     * @param selector 순간 클릭으로 인해 값변경을 부드럽게 해주기 위한 class 명 받기용
     * @returns g (class", "d3Chart_stats_enter") 태그를 반환
     */
    private fullcolorBar (svg:Selection<SVGSVGElement, unknown, HTMLElement, any>, d:HierarchyNode<HierarchyDatum>, selector:string){
        const g = svg.insert("g",selector)
            .attr("class", "d3Chart_stats_enter");
        
        g.attr("fill-opacity", 0)
        .selectAll("g")
        .data(d.children as HierarchyNode<HierarchyDatum>[])
        .join("g")
            .on("click",(_, d) => this.down(svg, d))
            .attr("cursor", d=>!d.children ? null : "pointer")
            .attr("transform", (d,i)=>`translate(${this.xScale(this.xScale.domain()[i])},${this.yScale(d.data.y0 as number)-this.yScale(0)})`)
                .selectAll("g")
                .data(d=>d.children? d.children : d)
                    .join("rect")
                        .attr("class", (_,i)=>`d3Chartstats_color_${i}`)
                        .attr("fill", (_,i)=>this.color(i))
                        .attr("y", (d,i) => i===0? this.yScale(d.data.value as number): this.yScale(d.data.y1 as number))
                        .attr("height", d => this.yScale(0)-this.yScale(d.value as number))
                        .attr("width", this.xScale.bandwidth())
                            .append("title")
                            .text(d=>[d.data.name, (d.data.value)?.toLocaleString('en-US')].join("\n"))
        
        return g;
    }

    /**
     * 단색봉 그려주는 함수
     * @param svg 전체 svg태그
     * @param d 데이터
     * @param selector 순간 클릭으로 인해 값변경을 부드럽게 해주기 위한 class 명 받기용
     * @param idx 클릭한 특정 인덱스 값을 받음
     * @returns g ("class", "d3Chart_stats_move") 반환
     */
    private onecolorBar(svg:Selection<SVGSVGElement, unknown, HTMLElement, any>, d:HierarchyNode<HierarchyDatum>, selector:string,idx:number|null = null){
        const g = svg.insert("g", selector)
            .attr("class", "d3Chart_stats_move");

        const bar = g.attr("fill-opacity", 0).selectAll("g")
            .data(d.children as HierarchyNode<HierarchyDatum>[])
            .join("rect")
                .attr("width", this.xScale.bandwidth())
                .attr("height", d=> this.yScale(0)-this.yScale(d.value as number))
                .attr("fill", (_,i)=> this.color(i));

        if(idx == null){
            bar.attr("transform", d=>`translate(${this.xScale(this.xScale.domain()[d.data.index as number])},${this.yScale(d.data.y1 as number)})`);
        }else {
            bar.attr("transform", d=> `translate(${this.xScale(this.xScale.domain()[idx])},${this.yScale(d.data.y1 as number)})`);
        }

        return g;
    }

    // 모션에서 사용하는 위치 리턴 함수
    /**
     * 
     * @param d  데이터
     * @param i 인덱스
     * @param type (array, spread, up(default))중 입력
     * @returns translate (string) 반환
     */
    private transforming(d: HierarchyNode<HierarchyDatum>, i: number, type:string){
            let t:string = "";
            switch(type){
                case "array":
                    t = `translate(${this.xScale(this.xScale.domain()[i])}, 0)`;
                    break;

                case "spread":
                    t = `translate(${this.xScale(this.xScale.domain()[i])}, ${this.yScale(d.data.y1 as number)})`;
                    break;

                default:
                    t = `translate(${this.xScale(this.xScale.domain()[i])}, ${this.yScale(d.data.y0 as number) - this.yScale(0)})`;
                    break;
                };
        return t;
    }

    /**
     * x축의 최대 label 갯수 확인용
     * @returns x축의 최대 갯수
     */ 
    private xmax ():number {
        let max:number = 1;
        this._data.each(d => d.children && (max = Math.max(max, d.children.length)));
        return max;
    }


    /**
     * 알파벳 순으로 데이터를 정리하는 함수
     * 리턴은 없으나 this_data 값에 결과 값 저장
     * @param data 원본 데이터 children 만 있는 형식
     */
    private alphaData(data:HierarchyDatum){
        if (data == undefined || data == null){
            data = localdata;
        }
        const data1 = hierarchy(data)
            .sum((d)=> d.value as number)
            .sort((a, b) => {
                if(a.value == undefined || b.value == undefined){
                    return 0;
                } else{
                    return ascending(a.data.name, b.data.name);
                }
            })
            .eachAfter((d) => {
                // console.log("name",d.data.name,"value",d.value)
                if (d.parent){
                    d.data.value = d.value

                    if (d.parent.data.index==undefined){
                        d.parent.data.index = 0;
                        d.data.index = 0;
                    } else {
                        d.parent.data.index = d.parent.data.index + 1
                        d.data.index = d.parent.data.index
                    } 
            
                    if(d.parent.data.y1 == undefined){
                        
                        d.data.y0 = 0;
                        d.data.y1 = d.value as number;
                        d.parent.data.y0 = 0;
                        d.parent.data.y1 = d.value as number;

                    } else {
                        d.data.y0 = d.parent.data.y1 as number;
                        d.data.y1 = d.data.y0 + (d.value as number);
                        d.parent.data.y1 += (d.value as number);
                    }    
                    
                } else {
                    d.data.index = 0;
                    d.data.value = d.value
                    d.data.y0 = 0;
                    d.data.y1 = d.data.value;

                } 
            });
        this._data = data1;
    }
    
    /**
     * 데이터의 크기순으로 정렬한 데이터 (기본값)
     * @param data 원본 데이터 
     * @returns value 값(금액)을 내림차순으로 정렬한 hierarchy 데이터 반환
     */
    public inputData(data:HierarchyDatum): HierarchyNode<HierarchyDatum> {
        if (data == undefined || data == null){
            data = localdata;
        }
        this._originaldata = data
        const data1 = hierarchy(data)
            .sum((d)=>  d.value as number)
            .sort((a, b) => {
                if(a.value == undefined || b.value == undefined){
                    return 0;
                } else{
                    return ascending(b.value, a.value);
                }
            })
            .eachAfter((d) => {
                // console.log("name",d.data.name,"value",d.value)
                if (d.parent){
                    d.data.value = d.value

                    if (d.parent.data.index==undefined){
                        d.parent.data.index = 0;
                        d.data.index = 0;
                    } else {
                        d.parent.data.index = d.parent.data.index + 1
                        d.data.index = d.parent.data.index
                    } 
            
                    if(d.parent.data.y1 == undefined){
                        
                        d.data.y0 = 0;
                        d.data.y1 = d.value as number;
                        d.parent.data.y0 = 0;
                        d.parent.data.y1 = d.value as number;

                    } else {
                        d.data.y0 = d.parent.data.y1 as number;
                        d.data.y1 = d.data.y0 + (d.value as number);
                        d.parent.data.y1 += (d.value as number);
                    }    
                    
                } else {
                    d.data.index = 0;
                    d.data.value = d.value
                    d.data.y0 = 0;
                    d.data.y1 = d.data.value;

                } 
            });
        this._data = data1;
        return data1;
    }
}
const charttest = new chart();
charttest.select("#d3Chart");