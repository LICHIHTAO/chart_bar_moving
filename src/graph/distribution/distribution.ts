import type {HierarchyNode} from "d3-hierarchy"
import {hierarchy} from "d3-hierarchy"

import type {Stack} from "d3-shape"
import {stack,stackOrderNone,stackOffsetNone,stackOrderReverse} from "d3-shape"


import type {Selection, } from "d3-selection"
import {select, selectAll, } from "d3-selection"

import type{ScaleLinear, ScaleBand, ScaleSequential, NumberValue} from"d3-scale"
import {scaleLinear, scaleBand, scaleSequential} from "d3-scale"

import type {Axis} from "d3-axis"
import {axisBottom, axisLeft } from "d3-axis"

import {range, max, map, ascending,rollup} from "d3-array"

import { csvParse, autoType } from "d3-dsv"

import { active } from "d3-transition"

import {zoom} from "d3-zoom"

import {interpolateBlues}from "d3-scale-chromatic"

import {data1 as data} from "./data"
import type {margintype, StackDatum} from "./data"


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
    private height:number;
    private width:number;

    private margin: margintype;

    private paddinginner: number;
    private paddingouter: number;

    private xRange:[number, number];
    private xDomain:number[];
    private xScale: ScaleBand<string | number>;
    private xAxis : Axis<string | number>;

    private yRange:[number, number];
    private yDomain:number[];
    private yScale:ScaleLinear<number, number, never>;
    private yAxis:Axis<NumberValue>;

    private color:ScaleSequential<string, never>;
    private xLabel: string;
    private majorkey : string;

    constructor(){
        this.majorkey = "Engin"
        this.xLabel = `← Male · ${this.majorkey} · Female →`;
        this._tagName= "";

        this.height= 500;
        this.width= 500;
        this.margin = {top: 30, bottom: 100, right: 10, left:30};
        this.paddinginner = 0.2;
        this.paddingouter = 0.2;
    
        this.xRange = [this.margin.left, this.width - this.margin.right];
        // this.xDomain = range(this.xmax());

        /**
         * scaleBand<number|string> => d3에서 문자열만 받을 수 있게 되어 있어서 숫자열도 받을 수 있게 넣어줌.
         */
        // this.xScale = scaleBand<number|string>().domain(this.xDomain).range(this.xRange).paddingInner(this.paddinginner).paddingOuter(this.paddingouter);
        // this.xAxis = axisBottom(this.xScale).tickSizeOuter(0);
    
        // this.yRange = [this.height - this.margin.bottom, this.margin.top];
        // // this.yDomain = [0, this._data.value as number];
        // // this.yScale = scaleLinear().domain(this.yDomain).range(this.yRange);
        // // this.yAxis = axisLeft(this.yScale).ticks(this.width/80, "s");
    
        this.color = scaleSequential(interpolateBlues).domain([-10.5 * 2, 1.0 * 28]);
    }
 
    // public select(){
    //     const svg = select(this._tagName)
    //             .append("svg")
    //             .attr("height", this.height)
    //             .attr("width",this.width)
    //             .attr("viewBox", [0,0,this.width, this.height])
    //             .attr("style", "max-width: 100%; height: auto; height: intrinsic;")

        
    //     svg.append("g")
    //     .attr("transform", `translate(0,${this.margin.top})`)
    //     .call(this.xAxis)
    //     .call(g => g.select(".domain").remove())
    //     .call(g => g.selectAll(".tick line").clone()
    //         .attr("y2", this.height - this.margin.top - this.margin.top)
    //         .attr("stroke-opacity", 0.1))
    //     .call(g => g.append("text")
    //         .attr("x", this.xScale(0))
    //         .attr("y", -22)
    //         .attr("fill", "currentColor")
    //         .attr("text-anchor", "middle")
    //         .text(xLabel));          
    // }


    // [(math)[[0,10,data{}],[0,15,data{}],[0,20,data{}],[0,23,data{}] ...],
    //  (game)[[10,15,data{}],[15,25,data{}],[20,21,data{}],[23,32,data{}]...],
    //  (engineer)[[15,16,data{}],[25,31,data{}],[21,32,data{}],[32,35,data{}]...]]
    public inputData(data:StackDatum): Stack<any, StackDatum, string>{

        let ageslist:string[] =  ["<5","5-9","10-14","15-19","20-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79","80-84","≥85",]

        let malestack=stack().keys(ageslist).order(stackOrderNone)
        .offset(stackOffsetNone)(data).filter(d=>console.log(d))

        // console.log(malestack)


        // let maleData: number[]
        // let femaleData: number[]
        // for (let i in majorlist){ //3번
        //     let _list = []

        //     for (let j of data){ // 50번
        //         let _value:number
        //         let list_2 = []
        //         let _data = j
        //         list_2.data = _data

        //         if (j.sex == "Male"){
        //             if (j.submajor == majorlist[i]){
        //                 if (i == "0"){
        //                     list_2.push(0)
        //                 }
        //                 list_2.push(j.value)
        //                 console.log(list_2)
    
                     
    
    
        //             } else if (data.age == j){

        //             }

        //         } else{
        //     }}

        // }
    }
        



}

let chart1 = new chart()
chart1.inputData(data)