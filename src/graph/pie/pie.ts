
import type{ScaleLinear, ScaleBand,ScaleOrdinal, NumberValue} from"d3-scale"
import {scaleLinear, scaleBand, scaleOrdinal} from "d3-scale"

import { select, selection } from "d3-selection";
import type{Selection} from "d3-selection";
import {hierarchy} from "d3-hierarchy"
import type {HierarchyNode} from "d3-hierarchy"

import {arc, pie} from "d3-shape";
import {interpolateRainbow, } from "d3-scale-chromatic"

import { interpolate ,quantize} from "d3-interpolate";
import {easeElasticOut} from "d3-ease"

import {transition, active} from 'd3-transition';


import { data, HierarchyDatum } from "./data";

class chart {

    private color: ScaleOrdinal<string, string, never> 
    private _tagname : string;
    private pie_size:number;
    private root: HierarchyNode<HierarchyDatum>;

    constructor(tagname:string){
        this._tagname = tagname
        this.pie_size = 300
        this.root = this.inputdata(data)
        this.color = scaleOrdinal()
    }

    public update(){
        let scale = scaleLinear().domain([0,1]).range([0, Math.PI * 2])
        let pie_size = this.pie_size
        this.color = scaleOrdinal(quantize(interpolateRainbow, this.root.children?.length as number + 1))
        
        const svg = select(this._tagname)
            .append("svg")
            .attr("width", this.pie_size)
            .attr("height", this.pie_size)
            .attr("viewBox",[0,0,this.pie_size,this.pie_size])
            .attr("font", "10px sans-serif")
            
        svg.append("circle")
            .datum(this.root)
            .attr("class", "d3Chart_stats_background")
            .attr("transform",`translate(${this.pie_size/2},${this.pie_size/2})`)
            .attr("fill-opacity", 1)
            .attr("fill", "white")
            .attr("r", this.pie_size * 0.18)
            .attr("cursor","pointer") //커서모양 변경
                .on("click", (evt, d)=> this.cnetermovemotion(evt, this.pie_size))
                .on("mouseover", (evt, d)=>this.centermotion(evt, d,this.pie_size,true) )
                .on("mouseout", (evt, d)=>this.centermotion(evt, d,this.pie_size, false));

        
        let label = svg.append("text")
            .attr("transform",`translate(${this.pie_size/2},${this.pie_size/2})`)
            .attr("class","textcenter")
            .attr("text-anchor", "middle")
            .attr("fill", "#888")
                
        label.append("tspan")
            .attr("class","text1")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", "-0.5em")
            .text("확인")

        label.append("tspan")
            .attr("class","text2")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", "1.2em")
            .text("확인")
        
        this.mPie(svg, this.root)

        return svg.node()
    }

    //파이 그리는 곳 
    private mPie(svg:Selection<SVGSVGElement, unknown, HTMLElement, any>, data:HierarchyNode<HierarchyDatum>){
        if(!data.children || active(svg.node())) return;
        // if(!d.parent || !svg.selectAll(".d3Chart_stats_exit").empty()) return;

        console.log(active(svg.node()))

        let mArc = arc<void>()
            .innerRadius(this.pie_size * 0.18)
            .outerRadius(this.pie_size * 0.40)

        svg.select(".arcMotion").remove()

        let g = svg.append("g")
            .attr("class","arcStatic")
            .attr("transform",`translate(${this.pie_size/2},${this.pie_size/2})`)
            .datum(data)

         g.selectAll("g")
            .data(d=>d.children)
            .join("path")
                .attr("d",(d)=> { console.log(d);return mArc(d.data)})
                .attr("fill", (d)=>  this.color(d.data.index))
                .attr("fill-opacity", 1)
                    .on("mouseover", (evt, d)=>this.mousemotion(evt, this.pie_size,true))
                    .on("mouseout", (evt, d)=>this.mousemotion(evt, this.pie_size, false))
                    .on("click", (event, d)=>{
                        this.mPie(svg, d);

                        this.movemotion(event, d, svg, this.pie_size);
                        return
                        })
    }

    private cnetermovemotion(event: Event, pie_size: number){
        select(event.target as SVGGElement)
            .raise()    
            .transition()
            .duration(200)
                .attr("r", pie_size * 0.41)
                .transition()
                .delay(150)
                .duration(200)
                .attr("r", pie_size * 0.18)
            
    }

    //중앙 마우스 over, out
    private centermotion(event: Event, d:HierarchyNode<HierarchyDatum>, pie_size: number,vote:Boolean){
        select(event.target as SVGGElement)
        .raise()
            .transition()
            .duration(200)
            .ease(easeElasticOut)
            .attr("fill-opacity", vote? 1 : 0)
            .attr("r", vote? pie_size * 0.2 : pie_size * 0.18)
    }

    //클릭해서 실행하는 곳
    private movemotion(event: Event, d:HierarchyNode<HierarchyDatum>, svg:Selection<SVGSVGElement, unknown, HTMLElement, any>, pie_size: number){
        
        svg.select(".arcStatic").attr("class", "arcMotion")   

        let mArc = arc<void>()
            .innerRadius(pie_size*0.18)
            .outerRadius(pie_size*0.4)

        select(event.target as SVGGElement)
            .raise()
            .transition()
            .duration(200)
                .attrTween("d", (d:any)=>{
                    let mstartAngle = interpolate(d.data.startAngle, 0); 
                    let mendAngle = interpolate(d.data.endAngle, Math.PI*2); 
                    return (t:number)=>{
                        mArc.startAngle(mstartAngle(t))
                            .endAngle(mendAngle(t))

                        return mArc() as string
                    }
                })
                .transition()
                .delay(100)
                .duration(200)
                .attrTween("d", (d:any)=>{
                    let centerAngle = (d.data.startAngle + d.data.endAngle)/2
                    let mstartAngle = interpolate(0, centerAngle); 
                    let mendAngle = interpolate(Math.PI*2, centerAngle); 
                    return (t:number)=>{
                        mArc.startAngle(mstartAngle(t))
                            .endAngle(mendAngle(t))
                        return mArc() as string
                    }
                })

        select(".arcMotion").transition().duration(200)
            .transition().delay(100).duration(200)
            .remove()
    }


    //마우스 over, out 반응하는 곳
    private mousemotion(evt: Event, pie_size:number, vote:Boolean){
        let innerRadius = pie_size * 0.18
        let startRadius = pie_size * 0.4
        let endRadius = pie_size * 0.45 

        let mArc = arc<void>()
        select(evt.target as SVGGElement) 
            .transition()
            .duration(200).ease(easeElasticOut)
            .attr("fill-opacity",vote? 0.9 : 1)
            .attrTween("d", (d:any)=>{
                let outerRadius = interpolate(vote ? startRadius : endRadius, vote? endRadius : startRadius); 
                return (t:number)=>{
                    mArc.startAngle(d.data.startAngle as number)
                        .endAngle(d.data.endAngle as number)
                        .innerRadius(innerRadius)
                        .outerRadius(outerRadius(t))
                return mArc() as string
                }
            })

    }

    public inputdata(data: HierarchyDatum){
            const root = hierarchy(data)
            .sum(d => d.value as number)
            .sort((a, b) => b.value - a.value)
            .eachAfter((d) => {
                const anglevalue = Math.PI * 2 
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
            
                    if(d.parent.data.endAngle == undefined){
                        
                        d.data.startAngle = 0;
                        d.data.endAngle = ((d.value) as number / (d.parent.value as number))*anglevalue;
                        d.parent.data.startAngle = 0;
                        d.parent.data.endAngle = d.value as number;

                    } else {
                        d.data.startAngle = (d.parent.data.endAngle /(d.parent.value as number)) * anglevalue;
                        d.data.endAngle = (d.data.startAngle + d.data.value/(d.parent.value as number)*anglevalue)
                        d.parent.data.endAngle += (d.value as number);
                    }    
                } else {
                    d.data.index = 0;
                    d.data.value = d.value
                    d.data.startAngle = 0;
                    d.data.endAngle = 2*Math.PI;

                } 
            });
        // console.log(root)
        return root;
    }

}

const chart1 = new chart("#d3Chart")
chart1.update()
