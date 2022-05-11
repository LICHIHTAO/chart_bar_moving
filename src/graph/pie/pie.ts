import {  partition, quantize } from "d3";

import type{ScaleLinear, ScaleBand,ScaleOrdinal, NumberValue} from"d3-scale"
import {scaleLinear, scaleBand, scaleOrdinal} from "d3-scale"

import { select, selection } from "d3-selection";
import {range, max, map, ascending} from "d3-array"
import {hierarchy} from "d3-hierarchy"
import type {HierarchyNode} from "d3-hierarchy"

import {arc, pie} from "d3-shape";
import {interpolateRainbow, } from "d3-scale-chromatic"

import { interpolate } from "d3-interpolate";


import { data, HierarchyDatum } from "./data";

class chart {

    private _tagname : string;
    private pie_size:number;
    private root: HierarchyNode<HierarchyDatum>;
    private color: ScaleOrdinal<string, unknown, never>

    constructor(tagname:string){
        this._tagname = tagname
        this.pie_size = 300
        this.root = this.inputdata(data)
        this.color = scaleOrdinal();

    }

    public update(){
        let scale = scaleLinear().domain([0,1]).range([0, Math.PI * 2])
        let color =scaleOrdinal(quantize(interpolateRainbow, this.root.children?.length as number + 1))

        const svg = select(this._tagname)
            .append("svg")
            .attr("width", this.pie_size)
            .attr("height", this.pie_size)
            .attr("viewBox",[0,0,this.pie_size,this.pie_size])
            .attr("font", "10px sans-serif")

        let mArc = arc<void>()
            .innerRadius(this.pie_size*0.21)
            .outerRadius((d)=>{return this.pie_size * 0.45})
            
        let label = svg
            .append("text")
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
              .attr("x", 0)
              .attr("y", 0)
              .attr("dy", "1.2em")
              .text("확인")

        let g = svg.append("g")
                .attr("transform",`translate(${this.pie_size/2},${this.pie_size/2})`)
                .attr("class","arc")

        g.selectAll("g")
        .data(this.root.children)
        .join("path")
            .attr("d",(d)=>{console.log(d); return mArc(d.data)})
            .on("mouseover", (event, d)=>{
                g            
                .attr("stroke","white")
                .transition()
                .duration(1000)
                .attr("d", arcOver)             
                .attr("stroke-width",6);

                console.log(d)
            })
        
        
     

        

        // let motionarc = arcpath.datum({outerRadius:this.pie_size*0.45})
        //     .attr("d", <any>mArc)
         
        // arcpath.on("mouseover", (event,d)=>{
        //     console.log(d)
        //     const percentage = ((d.data.y1 - d.data.y0)*100).toPrecision(3)

        //     label.select(".text1")
        //         .style("visibility", "null")
        //         .text(percentage + "%"); 
                
        //     label.select(".text2")
        //         .text(d.data.name);

        //     motionarc.transition().duration(1000).attrTween("d", (d)=>{
        //         let minterpolate = interpolate(this.pie_size*0.45, this.pie_size*0.5);
        //         return (t:number) => {                
        //             d.outerRadius = minterpolate(t);
        //             mArc.outerRadius(d.outerRadius);
   
        //             return mArc() as string
        //         }
        //     })
        // })

                   

    

    //     const path = g.append("g")
    //     .selectAll("path")
    //     .data(this.root.descendants().slice(1))
    //     .join("path")
    //       .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
    //       .attr("fill-opacity", d => this.arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
    //       .attr("pointer-events", d => this.arcVisible(d.current) ? "auto" : "none")
    
    //       .attr("d", d => arc(d.current));
    
    //   path.filter(d => d.children)
    //       .style("cursor", "pointer")
    //     //   .on("click", clicked);
    
    //   path.append("title")
    //       .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);


    }
    
    // private arcVisible(d) {
    //     return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    //   }

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
                    d.data.endAngle = 1;

                } 
            });
        // console.log(root)
        return root;
    }

}

const chart1 = new chart("#d3Chart")
chart1.update()
