import type {HierarchyNode} from "d3-hierarchy"
import {hierarchy} from "d3-hierarchy"

import type{ScaleLinear, ScaleBand,ScaleOrdinal, NumberValue} from"d3-scale"
import {scaleLinear, scaleBand, scaleOrdinal} from "d3-scale"

import type {Axis} from "d3-axis"
import {axisBottom, axisLeft,axisRight } from "d3-axis"

import {select} from "d3-selection"

import {max, map, filter, sort} from "d3-array"

import {schemeTableau10, } from "d3-scale-chromatic"

import type {margintype, HierarchyDatum} from "./data"
import {data as localdata} from "./data"


/**
 * 전공별 남여 인구 분표 차트. 왼쪽<=:남성, 오른쪽=>:여성 
 * 새부전공은 다른 색상으로 표기됨.
 */
class chart {

    private _tagName:string;
    private _data:{[key:string]:any};

    private height:number;
    private width:number;
    private margin: margintype;

    private rxRange:[number, number];
    private lxRange:[number, number];

    private xDomain:number[];
    private xScale: ScaleLinear<number, number, never>;

    private rxScale: ScaleLinear<number, number, never>;
    private lxScale: ScaleLinear<number, number, never>;

    private rxAxis : Axis<NumberValue>;
    private lxAxis : Axis<NumberValue>;


    private yRange:[number, number];
    private yDomain:string[];
    private yScale:ScaleBand<string | number>;
    private ryAxis:Axis<string | number>;
    private lyAxis:Axis<string | number>;


    private color:ScaleOrdinal<string, string, never>
    private xLabel: string;
    private majorkey : string;
    private submajordatas:string [];
    private maxValue:number;

/**
 * 초기값으로 위치할 tag(ID,class)과 데이터를 넣어준다.
 * @param tagname ID, class 입력
 * @param data 데이터 입력
 * @param major 보여질 전공 이름 입력 (기본값 Engineering)
 */
    constructor(tagname:string, data:HierarchyDatum [], major?:string){
        /**
         * @argument majorkey major 입력값이 없으면 "Engineering" 으로 저장 ("Engineering"는 데이터에 key 데이터로 있어야 함)
         */
        this.majorkey = major ? major : "Engineering"
        /**
         *  @argument xLabel 중앙 하단에 표시됨. major를 설정하면 중앙 글기가 바뀜
         */
        this.xLabel = `← Male · ${this.majorkey} · Female →`;

        this._tagName= tagname
        this._data = this.inputData(data)

        this.height= 500;
        this.width= 500;
        this.margin = {top: 30, bottom: 50, right: 20, left:20, middle: 20};
        /**
         * @argument submajordatas 전공에서 세부전공빼서 담는 list
         */
        this.submajordatas = [];
        this.color = scaleOrdinal();

        /**
         * @argument maxValue 데이터의 전체 값중에 최대 값
         */
        this.maxValue = max(map(this._data[this.majorkey] as HierarchyDatum[], s=>max(map(s.data, d=>d.x1))))

        this.rxRange = [this.margin.left, this.width/2 - this.margin.right];
        this.lxRange = [this.width/2 - this.margin.right, this.margin.left];

        this.xDomain = [0, this.maxValue]
        /**
         * @argument xScale  기준이 되는 x 축 scale
         * @argument rxScale 오른쪽 x 축 scale
         * @argument lxScale 왼쪽 x 축 scale
         */
        this.xScale = scaleLinear().domain(this.xDomain).range([0, (this.width/2-this.margin.middle-this.margin.right)]).nice();
        this.rxScale =scaleLinear().domain(this.xDomain).range(this.rxRange).nice();
        this.lxScale =scaleLinear().domain(this.xDomain).range(this.lxRange).nice();

        this.rxAxis = axisBottom(this.rxScale).ticks(this.width / 80, "s").tickSizeOuter(0)
        this.lxAxis = axisBottom(this.lxScale).ticks(this.width / 80, "s").tickSizeOuter(0)

        this.yRange = [this.margin.top, this.height - this.margin.bottom];
        this.yDomain = ["<5", "5-9", "10-14","15-19","20-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79","80-84", "≥85"]

        this.yScale =  scaleBand<number|string>().domain(this.yDomain).range(this.yRange).paddingInner(0.2).paddingOuter(0.2);
        this.ryAxis = axisRight(this.yScale).tickSize(4).tickSizeOuter(0)
        this.lyAxis = axisLeft(this.yScale).tickSize(4).tickSizeOuter(0)

    }
 
    public update(){
        // 데이터에 있는 남성, 여성 데이터를 각각 나눠서 저장함.
        const Fdata = filter(this._data[this.majorkey],d=>d.name == "Female") as HierarchyDatum[]
        const Mdata = filter(this._data[this.majorkey],d=>d.name == "Male") as HierarchyDatum[]

        //this.submajordatas 값이 function inputData가 끝나야 값을 받기 때문에 색상을 여기서 설정함
        this.color = this.color.domain(this.submajordatas).range(schemeTableau10)

        const svg = select(this._tagName)
                .append("svg")
                .attr("height", this.height)
                .attr("width",this.width)
                .attr("viewBox", [0,0,this.width, this.height])
                .attr("style", "max-width: 100%; height: auto; height: intrinsic;")

        // x, y axis 그리기 tag 생성
        svg.append("g")
            .attr("class", "d3chart_distribute_lxAxis")
            .attr("transform", `translate(0, ${this.height-this.margin.bottom})`)
            .call(this.lxAxis);

        svg.append("g")
            .attr("class", "d3chart_distribute_ryAxis")
            .attr("transform", `translate(${this.width/2-this.margin.left}, 0)`)
            .call(this.ryAxis)
            .call(g=>g.selectAll(".tick text").remove())

        svg.append("g")
            .attr("class", "d3chart_distribute_lyAxis")
            .attr("transform", `translate(${this.width/2+this.margin.middle}, 0)`)
            .call(this.lyAxis)
                .selectAll("text")
                .attr("dx",`-${this.margin.middle * 0.65}`)
                .style("text-anchor", "middle");
                
        svg.append("g")
            .attr("class", "d3chart_distribute_rxAxis")
            .attr("transform", `translate(${this.width/2},${this.height-this.margin.bottom})`)
            .call(this.rxAxis);

        //중앙 남여 표시 글 tag 생성
        svg.append("text")    
            .attr("transform",`translate(${this.width/2},${this.height-10})`)
            .attr("text-anchor", "middle")
            .text(this.xLabel)

        // 오른쪽 여성(rBarGroup), 왼쪽 남성(lBarGroup) 분리해서 bar 만들기        
        let lBarGroup = svg.append("g").data(Fdata)
            .attr("transform", `translate(${this.width/2-this.margin.left}, 0)` + "scale(-1,1)");

        let rBarGroup = svg.append("g").data(Mdata)
            .attr("transform",`translate(${this.width/2+this.margin.middle}, 0)`);

        lBarGroup.selectAll("g")
            .data(d=>d.data as HierarchyDatum[])
            .join("rect")
                .attr("fill", d =>this.color(d.name as string))
                .attr("y",d=>this.yScale(this.yDomain[d.index as number])as number)
                .attr("x",d=>this.xScale(d.x0 as number))
                .attr("width",d=>this.xScale(d.value as number))
                .attr("height",this.yScale.bandwidth())

        rBarGroup.selectAll("g")
        .data(d=>d.data as HierarchyDatum[])
        .join("rect")
            .attr("fill", d =>this.color(d.name as string))
            .attr("y",d=>this.yScale(this.yDomain[d.index as number])as number)
            .attr("x",d=>this.xScale(d.x0 as number))
            .attr("width",d=>this.xScale(d.value as number))
            .attr("height",this.yScale.bandwidth())
}

    /**
     * 변경할 데이터를 넣어주는 함수
     * @param data {major:[{sex:[{age:[{sumajor:, value:}]}]}]}
     * @returns 수정된 데이터가 반환됨 {major:[{sex:[{data:[{sumajor, value, index ...}]}]}]}
     */

    public inputData(data:HierarchyDatum[]){
        let finaldict:{[key:string]:any} = {}
        for (let i in data){
            let _sexdict:any[] = []
            let major :string =""
            major = data[i].name
            let _sexdatas:HierarchyDatum = data[i]

            for(let z in _sexdatas.children){
                let _datalist:HierarchyDatum[] = []
                let stacklist:number[] = [];
                let _datadict:{[key:string]:HierarchyDatum[]|string} = {}
                let _sex = _sexdatas.children[Number(z)].name

                hierarchy(_sexdatas.children[Number(z)])
                .sum(d=> d.value as number)
                .eachBefore((d) => {
 
                    if (d.children){
                        map(d.children, (d, i)=>d.data.index=i)
                        // console.log(d.children)
                    } else{
                        d.data.index = d.parent?.data.index
                        _datalist.push(d.data)
                        if (!this.submajordatas) {
                            this.submajordatas = map(d.parent?.children as HierarchyNode<HierarchyDatum>[], d=> d.data.name)
                        }
                    }
                });

                let finaldata1= sort(_datalist, d=>d.name)

                for (let j of finaldata1){
                    if (stacklist[j.index as number]==undefined){
                        stacklist[j.index as number] = 0 + (j.value as number)
                        j.x0 = 0
                        j.x1 = j.value
                    } else{
                        j.x0 = stacklist[j.index as number]
                        j.x1 = stacklist[j.index as number] + (j.value?j.value:0)
                        stacklist[j.index as number] += j.value as number
                    }  
                } 
                _datadict["name"] = _sex;
                _datadict["data"] = finaldata1
                _sexdict.push(_datadict)
            }
            finaldict[major] = _sexdict
        } 
        console.log(finaldict)
        this._data = finaldict
        return finaldict;
    }
}

let chart1 = new chart("#d3Chart1", localdata)
chart1.update()
// chart1.inputData(data)