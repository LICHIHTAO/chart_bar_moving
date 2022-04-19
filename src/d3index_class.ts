import type {HierarchyNode} from "d3-hierarchy"
import {hierarchy} from "d3-hierarchy"

import type {Selection, } from "d3-selection"

import type {dataSet, margintype, HierarchyDatum} from "./data"
import {data} from "./data"

import {reduce, Transition} from "d3"
import {
    scaleLinear, 
    range, 
    axisBottom,
    scaleBand,
    xml,
    select,
    selectAll,
    axisLeft,
    active,
    map,
    max,
    zoom,
    some,
    scaleSequential,
    interpolateBlues,

    } from "d3"

 
// 1. 가져다 쓰려는 사람이 html tag 지정
// 2. data 넣는 함수
// 3. data 바꿀때 사용하는 함수

// const chart = new chart1()
// chart.select("d3ChartStats")
// chart.inputData(data)
// chart.chageData(data)


let root:HierarchyNode<HierarchyDatum> = hierarchy(data)
    .sum((d)=> d.value as number)
    .sort((a, b) => {
        if(a.value == undefined || b.value == undefined ){
            return 0;
        } else{
            return b.value - a.value;
        }
    })
    .eachAfter((d, idx) => {
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
    })

function dataset(d:HierarchyNode<HierarchyDatum>[]){
    
    let maxlenght = max(map(d, d=>d.children? d.children.length : 0)) as number
    let final = [];
    let t = d.length
    for (let j = 0; j <t; j++){
        let data = d[j]
        let resetValue:number = 0;

        for (let i =0; i < maxlenght; i++){
            let part:dataSet = {};
            let result = [];

            if(data.children){
                if (data.children[i]==undefined){ 
                    result.push(0)
                } else {        
                    part.y0 = resetValue
                    resetValue += data.children[i].value as number
                    part.y1 = resetValue
                    part.index = j
                    part.data = {
                        "name": data.children[i].data.name, 
                        "value": data.children[i].data.value as number
                    }
                    result.push(part)
                }
            } else if (i==0) {
                part.y0 = 0
                part.y1 = data.data.value as number
                part.index = j
                part.data = {
                    "name": data.data.name, 
                    "value": data.data.value as number
                }
                result.push(part)
            } else {
                result.push(0)
            }

            if (j==0){
                final.push(result)
            } else {
                if(Object.keys(part).length === 0){
                    final[i].push(0)
                } else{
                    final[i].push(part)
                }
            }
        }  
    }
    return final
}


class chart1 {
    private height:number = 500
    private width:number = 300 

    private margin: margintype = {top: 30, bottom: 20, right: 10, left:30}

    private duration: number = 750
    private paddinginner: number = 0.2
    private paddingouter: number = 0.2

    private xRange = [margin.left, width - margin.right]
    private xDomain = range(0, 10); 
    private xScale = scaleBand<number|string>().domain(xDomain).range(xRange).paddingInner(paddinginner).paddingOuter(paddingouter)
    private xAxis = axisBottom(xScale).tickSizeOuter(5)

    private yRange = [height - margin.bottom, margin.top];
    private yDomain:number[] = [0, root.value as number]
    private yScale = scaleLinear().domain(yDomain).range(yRange)
    private yAxis = axisLeft(yScale).ticks(width/80, "s")

    private color = scaleSequential(interpolateBlues).domain([-10.5 * 2, 1.0 * 28])

    /**
     * select
     */

    public select(tagName:string) {
        const svg = selectAll(tagName)
            .append("svg")
            // .attr("width", width)
            // .attr("height", height)
            .attr("viewBox", [0,0,this.width,this.height])
            // .call(myzoom)
    
        svg.append("rect")
            .attr("class","d3Chart_stats_background")
            .attr("fill-opacity",0)
            .attr("width", this.width)
            .attr("height",this.height)
            .attr("cursor","pointer")
            .on("click",(event,d)=>up(svg, d as HierarchyNode<HierarchyDatum>));
    
        svg.append("g")
                .attr("class","d3Chart_stats_x-axis")
                .attr("transform", `translate (0, ${this.height - this.margin.bottom})`)
                .call(this.xAxis)
            
        svg.append("g")
                .attr("class", "d3Chart_stats_y-axis")
                .attr("transform", `translate(${this.margin.left},0)`)        
                .call(this.yAxis);
    
            this.down(svg, this.inputData)
    
            return svg.node()
    
    }

    private down(svg:Selection<SVGSVGElement, unknown, HTMLElement, any>, d:HierarchyNode<HierarchyDatum>){
    if(!d.children || active(svg.node()))return;

    svg.select(".d3Chart_stats_background").datum(d);

    // const transition1:Transition<SVGSVGElement, unknown, HTMLElement, any> = svg.transition().duration(duration)
    // const transition2 = transition1.transition()

    const exit = svg.selectAll(".d3Chart_stats_enter")
        .attr("class", "d3Chart_stats_exit")

    exit.selectAll("rect")
        .attr("fill-opacity", p => p === d ? 0 : null);

    exit //.transition(transition1)
        .attr("fill-opacity", 0)
        .remove();

    const enter = bar(svg, down, d, ".d3Chart_stats_exit")

    yScale.domain([0, max(d.children, d=>d.value)])

    svg.selectAll(".d3Chart_stats_y-axis")//.transition(transition2)
    .call(yAxis);

      // Transition entering bars to the new x-scale.
    enter.selectAll("g") //.transition(transition2)
    .attr("transform", (_, i) => `translate(0, ${xScale.bandwidth() * i})`);

    // Color the bars as parents; they will fade to children if appropriate.
    enter.selectAll("rect")
        .attr("fill", color(true))
        .attr("fill-opacity", 1)
        //.transition(transition2)
        .attr("fill", d => color(!!d.children))
        .attr("width", d => x(d.value) - x(0));
}

    public inputData(data:HierarchyNode<HierarchyDatum>):HierarchyDatum {
        const data1 = hierarchy(data)
            .sum((d)=> d.value as number)
            .sort((a, b) => {
                if(a.value == undefined || b.value == undefined){
                    return 0;
                } else{
                    return b.value - a.value;
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
            })
        return data1
    }


    private dataset(d:HierarchyNode<HierarchyDatum>[]) {
    
    this.maxlenght = max(map(d, d=>d.children? d.children.length : 0)) as number
    final = [];
    t = d.length

    for (let j = 0; j <t; j++){
        let data = d[j]
        let resetValue:number = 0;

        for (let i =0; i < maxlenght; i++){
            let part:dataSet = {};
            let result = [];

            if(data.children){
                if (data.children[i]==undefined){ 
                    result.push(0)
                } else {        
                    part.y0 = resetValue
                    resetValue += data.children[i].value as number
                    part.y1 = resetValue
                    part.index = j
                    part.data = {
                        "name": data.children[i].data.name, 
                        "value": data.children[i].data.value as number
                    }
                    result.push(part)
                }
            } else if (i==0) {
                part.y0 = 0
                part.y1 = data.data.value as number
                part.index = j
                part.data = {
                    "name": data.data.name, 
                    "value": data.data.value as number
                }
                result.push(part)
            } else {
                result.push(0)
            }

            if (j==0){
                final.push(result)
            } else {
                if(Object.keys(part).length === 0){
                    final[i].push(0)
                } else{
                    final[i].push(part)
                }
            }
        }  
    }
    return final
}
}
 
 
// 1. 가져다 쓰려는 사람이 html tag 지정
// 2. data 넣는 함수
// 3. data 바꿀때 사용하는 함수

// const chart = new chart1()
// chart.select("d3ChartStats")
// chart.inputData(data)
// chart.chageData(data)