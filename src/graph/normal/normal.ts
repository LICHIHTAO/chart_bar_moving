import type{ScaleLinear, ScaleBand,ScaleOrdinal, NumberValue} from"d3-scale"
import {scaleLinear, scaleBand, scaleOrdinal} from "d3-scale"

import type {Axis} from "d3-axis"
import {axisBottom, axisLeft,axisRight } from "d3-axis"

import type{ Selection} from "d3-selection"

import {select, selectAll, pointer} from "d3-selection"

import {zoom} from "d3-zoom"

import {max, map, filter, sort} from "d3-array"

import type { datatype } from "./data";
import  { data } from "./data";

class chart {
    private width: number
    private height: number
    private _tagName: string
    private margin: {
        top: number;
        bottom: number;
        left: number;
        right:number;
    }
    private xDomain:string[];
    private xRange:number[];
    private xScale: ScaleBand<string>
    private xAxis: Axis<string>;

    private yDomain:number[];
    private yRange:number[];
    private yScale: ScaleLinear<number, number, never>
    private yAxis: Axis<NumberValue>;


    constructor (tagname:string, data:datatype){
        this._tagName= tagname

        this.width = 500
        this.height = 500
        this.margin = {top: 30, bottom: 20, right: 20, left:40};

        this.xDomain = map(data, d=> d.children.map(d=>d.name))[0] as string[]
        this.xRange = [this.margin.left, this.width - this.margin.right]
        this.xScale = scaleBand().domain(this.xDomain).range(this.xRange)
        this.xAxis =  axisBottom(this.xScale).ticks(this.width / 80, "s").tickSizeOuter(0)

        this.yDomain = [0, max(map(data, d=>max(d.children.map(d=>d.value)))) as number]
        this.yRange = [ this.height - this.margin.bottom, this.margin.top]
        this.yScale = scaleLinear().domain(this.yDomain).range(this.yRange).nice();
        this.yAxis =  axisLeft(this.yScale).tickSize(4).tickSizeOuter(0)
    }


    public update(){
        const width = this.width
        const margin_right = 20

        const svg = select(this._tagName)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("viewBox", [0,0,this.width, this.height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
            .call((d) => {
                this.myzoom(d)
            })


        svg.append("g")
            .attr("class","d3Chart_normal_x-axis")
            .attr("transform", `translate(0, ${this.height - this.margin.bottom})`)
            .call(this.xAxis)

        svg.append("g")
            .attr("class","d3Chart_normal_y-axis")
            .attr("transform",`translate(${this.margin.left},0)`)
            .call(this.yAxis)
            .call(g => g.selectAll(".tick line").clone()
            .attr("x2", this.width - this.margin.left - this.margin.right)
            .attr("stroke-opacity", 0.1))

        const tooltip = select(document.createElement("div"))
            .call(this.createTooltip);

        const line = svg.append("line")
            .attr("y1", this.margin.top)
            .attr("y2", this.height-this.margin.bottom)
            .attr("stroke", "rgba(0,0,0,0.2)")
            .style("pointer-events", "none");


        const margin_left = 40    
        svg.on("mousemove", function(d) {
                let [x,y] = pointer(d);
                if (x< margin_left || x>width-margin_right) return;
                line.attr("transform", `translate(${x} 0)`);
                y +=20;
                if(x > (this.width as number)/2){
                    x-= 100;
                } 
                tooltip

                  .attr("left", x + "px")
                  .attr("top", y + "px")
              })
        
    }

    private myzoom(svg:Selection<SVGSVGElement, unknown, HTMLElement, any>){

        const extent:[[number, number], [number, number]]= [[this.margin.left, this.margin.top], [this.width - this.margin.right, this.height - this.margin.top]];
        const mZoom = zoom<SVGSVGElement, unknown>()
            .scaleExtent([1,8])
            .translateExtent(extent)
            .extent(extent)
            .on("zoom", d=>this.myzoomed(d));
        svg.call(mZoom);
    }

    private myzoomed(event:any){
        
        this.xScale.range([this.margin.left, this.width - this.margin.right].map(d=>event.transform.applyX(d)));
        let svg = selectAll(this._tagName).select("svg");

        svg.select(".d3Chart_normal_x-axis")
            .call(this.xAxis)

    }

    private createTooltip(el:any) {
        el
            .style("position", "absolute")
            .style("pointer-events", "none")
            .style("top", 0)
            .style("opacity", 0)
            .style("background", "white")
            .style("border-radius", "5px")
            .style("box-shadow", "0 0 10px rgba(0,0,0,.25)")
            .style("padding", "10px")
            .style("line-height", "1.3")
            .style("font", "11px sans-serif")
        }

}

let chart1 = new chart ("#d3Chart1", data)
chart1.update()
