import type {HierarchyNode} from "d3-hierarchy"
import {hierarchy} from "d3-hierarchy"




import type {Selection, } from "d3-selection"
import {select, selectAll, local} from "d3-selection"

import type{ScaleLinear, ScaleBand,ScaleOrdinal, NumberValue} from"d3-scale"
import {scaleLinear, scaleBand, scaleOrdinal} from "d3-scale"

import type {Axis} from "d3-axis"
import {axisBottom, axisLeft,axisRight } from "d3-axis"


import { csvParse, autoType } from "d3-dsv"

import { active } from "d3-transition"

import {zoom} from "d3-zoom"

import {interpolateBlues}from "d3-scale-chromatic"

import {data as localdata} from "./data"
import type {margintype, HierarchyDatum} from "./data"

import type {Stack} from "d3-shape"
import {stack,stackOrderNone,stackOffsetNone,stackOrderReverse} from "d3-shape"

import {range, max,min, map, ascending, rollup, filter, sort} from "d3-array"

import {schemeTableau10, } from "d3-scale-chromatic"



class chart {
    /**
     * 원본 input 데이터 저장용도
     */
    /**
     * 전달받은 데이터 저장용
     */

    /**
     * html에 위치할 태크 값 전달 받는 용
     */
    private _tagName:string;
    private _data:{[key:string]:any};

    private height:number;
    private width:number;
    private margin: margintype;
    private paddinginner: number;
    private paddingouter: number;

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


    constructor(name:string, data:HierarchyDatum [], major?:string){
        this.majorkey = major ? major : "Engineering"
        this.xLabel = `← Male · ${this.majorkey} · Female →`;
        this._tagName= name
        this._data = this.inputData(localdata)

        this.height= 500;
        this.width= 500;
        this.margin = {top: 30, bottom: 50, right: 20, left:20, middle: 20};
        this.paddinginner = 0.2;
        this.paddingouter = 0.2;
        this.submajordatas = [];
        this.color = scaleOrdinal();
            
            
        this.maxValue = max(map(this._data[this.majorkey],s=>max(map(s.data, d=>d.x1))))

        this.rxRange = [this.margin.left, this.width/2 - this.margin.right];
        this.lxRange = [this.width/2 - this.margin.right, this.margin.left];

        this.xDomain = [0, this.maxValue]
        this.xScale = scaleLinear().domain([0, this.maxValue]).range([0, (this.width/2-this.margin.middle)]).nice();
        this.rxScale =scaleLinear().domain(this.xDomain).range(this.rxRange);
        this.lxScale =scaleLinear().domain(this.xDomain).range(this.lxRange);

        this.rxAxis = axisBottom(this.rxScale).ticks(this.width / 80, "s");
        this.lxAxis = axisBottom(this.lxScale).ticks(this.width / 80, "s");

  
        this.yRange = [this.margin.top, this.height - this.margin.bottom];
        this.yDomain = ["<5", "5-9", "10-14","15-19","20-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79","80-84", "≥85"]

        this.yScale =  scaleBand<number|string>().domain(this.yDomain).range(this.yRange).paddingInner(this.paddinginner).paddingOuter(this.paddingouter);
        this.ryAxis = axisRight(this.yScale).tickSize(4);
        this.lyAxis = axisLeft(this.yScale).tickSize(4);

    }
 
    public update(){
        const Fdata = filter(this._data[this.majorkey],d=>d.name == "Female")
        const Mdata = filter(this._data[this.majorkey],d=>d.name == "Male")

        this.color = scaleOrdinal(this.submajordatas, schemeTableau10)
        console.log(this.color("Math"))

        const svg = select(this._tagName)
                .append("svg")
                .attr("height", this.height)
                .attr("width",this.width)
                .attr("viewBox", [0,0,this.width, this.height])
                .attr("style", "max-width: 100%; height: auto; height: intrinsic;")

        let g = svg.append('g')
        .attr('class', 'inner-region')
   
        // DRAW AXES
        g.append('g')
            .attr('class', 'axis y right')
            .attr('transform', `translate(${this.width/2+this.margin.middle}, 0)`)
            .call(this.lyAxis)
                .selectAll('text')
                .attr('dx',`-${this.margin.middle * 0.65}`)
                .style('text-anchor', 'middle');
                
        g.append('g')
        .attr('class', 'axis x right')
        .attr('transform', `translate(${this.width/2},${this.height-this.margin.bottom})`)
        .call(this.rxAxis);


        g.append('g')
        .attr('class', 'axis y left')
        .attr('transform', `translate(${this.width/2-this.margin.left}, 0)`)
        .call(this.ryAxis)
        .call(g=>g.selectAll(".tick text").remove())

        g.append('g')
        .attr('class', 'axis x left')
        .attr('transform', `translate(0, ${this.height-this.margin.bottom})`)
        .call(this.lxAxis);


        g.append("text")    
            .attr("transform",`translate(${this.width/2},${this.height-10})`)
            .attr("text-anchor", "middle")
            .text(this.xLabel)

                
        let lBarGroup = g.append('g').data(Fdata)
        .attr('transform', `translate(${this.width/2-this.margin.left}, 0)` + 'scale(-1,1)');

        let rBarGroup = g.append('g').data(Mdata)
            .attr('transform',`translate(${this.width/2+this.margin.middle}, 0)`);

        lBarGroup.selectAll("g")
            .data(d=>d.data)
            .join("rect")
                .attr("fill", d =>this.color(d.name))
                .attr("y",d=>this.yScale(this.yDomain[d.index]))
                .attr("x",d=>this.xScale(d.x0))
                .attr("width",d=>this.xScale(d.value))
                .attr("height",this.yScale.bandwidth())

       
        rBarGroup.selectAll("g")
        .data(d=>d.data)
        .join("rect")
            .attr("fill", d =>this.color(d.name))
            .attr("y",d=>this.yScale(this.yDomain[d.index]))
            .attr("x",d=>this.xScale(d.x0))
            .attr("width",d=>this.xScale(d.value))
            .attr("height",this.yScale.bandwidth())
}


    // [(math)[[0,10,data{}],[0,15,data{}],[0,20,data{}],[0,23,data{}] ...],
    //  (game)[[10,15,data{}],[15,25,data{}],[20,21,data{}],[23,32,data{}]...],
    //  (engineer)[[15,16,data{}],[25,31,data{}],[21,32,data{}],[32,35,data{}]...]]
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