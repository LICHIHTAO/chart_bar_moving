
import type {HierarchyNode} from "d3-hierarchy"
import {hierarchy} from "d3-hierarchy"

import type {Selection, } from "d3-selection"

import type { margintype, HierarchyDatum} from "./data"
import {data} from "./data"

//import {NumberValue, reduce, Transition} from "d3"
import {
    scaleLinear, 
    range, 
    axisBottom,
    scaleBand,
    select,
    selectAll,
    axisLeft,
    active,
    map,
    max,
    zoom,
    scaleSequential,
    interpolateBlues,

    } from "d3"


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

const margin: margintype = {top: 30, bottom: 100, right: 10, left:30}
const height:number = 500
let width:number = 500
const duration: number = 750
const paddinginner: number = 0.2
const paddingouter: number =  0.2

const xRange = [margin.left, width - margin.right]
const xDomain = range(xmax())
let xScale = scaleBand<number|string>().range(xRange).domain(xDomain).paddingInner(paddinginner).paddingOuter(paddingouter)
let xAxis = axisBottom(xScale).tickSizeOuter(0)
//let xPad = xScale.step() * xScale.paddingOuter() * xScale.align()

const yRange = [height - margin.bottom, margin.top];
let yDomain:number[] = [0, root.value as number]
let yScale = scaleLinear().domain(yDomain).range(yRange).nice()
let yAxis = axisLeft(yScale).ticks(width/80, "s")

const color = scaleSequential(interpolateBlues).domain([-10.5 * 2, 1.0 * 28])

function myzoom(svg:Selection<SVGSVGElement, unknown, HTMLElement, any>){
    const extent:number[][]= [[margin.left, margin.top], [width - margin.right, height - margin.top]];

    svg.call(zoom()
        .scaleExtent([1,8])
        .translateExtent(extent)
        .extent(extent)
        .on("zoom",myzoomed));

    function myzoomed(event){
        let xlabel:string[] = [];
        xScale.range([margin.left, width - margin.right].map(d=>event.transform.applyX(d)));
        
        svg.select(".d3Chart_stats_enter")
            .selectAll("g")
                .attr("transform", (d)=>{
                    const data = d as  HierarchyNode<HierarchyDatum>
                    xlabel.push(data.data.name as string);
                    return `translate(${xScale(xScale.domain()[data.data.index as number])},0)`;
                })
                    .selectAll("rect")
                        .attr("width", xScale.bandwidth())

        const y = svg.select(".d3Chart_stats_y-axis") as Selection<SVGSVGElement, unknown, HTMLElement, any>
        y.raise().call(yAxis)
            .call(g => g.selection ? g.selection().select(".domain").remove() : g.select(".domain").remove())
                    
        const x = svg.select(".d3Chart_stats_x-axis") as Selection<SVGSVGElement, unknown, HTMLElement, any>
        x.call(xAxis)
            .call(g=>g.selectAll("text").text(null).data(xlabel).text(d=>d))

    }
}

function chart (){
    //차트의 전체 사이즈 설정
    const svg = selectAll("#d3ChartStats")
        .append("svg")
        // .attr("width", width)
        // .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .call(myzoom)

    //배경rect를 만들고 클릭하면 이전 차트 실행
    svg.append("rect")
        .attr("class","d3Chart_stats_background")
        .attr("fill-opacity",0)
        .attr("width", width)
        .attr("height",height)
        .attr("cursor","pointer") //커서모양 변경
        .on("click",(_,d)=>up(svg, d as HierarchyNode<HierarchyDatum>));
    
    //x축 세팅
    svg.append("g")
        .attr("class","d3Chart_stats_x-axis")
        .attr("transform", `translate (0, ${height - margin.bottom})`)
        .call(xAxis)
        .call(g => g.selectAll("g")
            .selectAll("text")
                .text(null)
                .attr("text-anchor", "start")
                .attr("alignment-baseline", "baseline")); //텍스트 제거,(원점)왼쪽하단 

    //y축 세팅
    svg.append("g")
        .attr("class", "d3Chart_stats_y-axis")
        .attr("transform", `translate(${margin.left},0)`)  
        .call(yAxis).raise()
        .call(g => (g.selection ? g.selection() : g).select(".domain").remove()); //선 삭제

    down(svg, root)

    return svg.node()
}

//자식 데이터로 내려가며 그래프를 그려주는 함수
function down(svg:Selection<SVGSVGElement, unknown, HTMLElement, any>, d:HierarchyNode<HierarchyDatum>){
    //자식 데이터가 없으면 리턴
    if(!d.children || active(svg.node())) return;

    //현제 데이터를 배경 데이터에 재저장
    svg.select(".d3Chart_stats_background").datum(d);

    //기존에 있는 enter 들을 투명화시키고 제거
    const exit = svg.selectAll(".d3Chart_stats_enter")
        .attr("class", "d3Chart_stats_exit")

    exit.selectAll("g")
        .attr("fill-opacity", p => p === d ? 0 : null);

    exit.transition().duration(duration)
        .attr("fill-opacity",0)
        .remove();
    
    // 모션을 하고 지울 단색 봉 생성
    const move = onecolorBar(svg, d,".d3Chart_stats_exit",d.data.index)

    //모션 1에서 서서히 사라지면서 제거

    move.attr("fill-opacity",1)
        .transition().duration(duration)
        .on("end", function(p) {select(this)
            .attr("fill-opacity", 0);})
            .remove();

    move.selectAll("rect")
        .attr("fill-opacity",1)
        .transition().duration(duration)
        .attr("transform", transforming("spread") as unknown as string);

    // 최종적으로 보여질 칼라봉 생성
    const enter = fullcolorBar(svg, down, d ,".d3Chart_stats_exit")

    //모션 2 데이터 최대값에 맞게  y축 사이즈 재설정
    const ymax = max(d.children as HierarchyNode<HierarchyDatum>[], d=>d? d.value : 0);

    yScale.domain([0, ymax? ymax : 0])

    const y = svg.select(".d3Chart_stats_y-axis") as Selection<SVGSVGElement, unknown, HTMLElement, any>
    y.transition().duration(duration).transition()
        .call(yAxis)
        .call(g => g.selection ? g.selection().select(".domain").remove() : g.select(".domain").remove())


    //모션 2 x축 label 이동 
    svg.select(".d3Chart_stats_x-axis")
        .selectAll("text")         
            .text(null)
            .data(map(d.children, d=>d.data.name))
                .text(d=>d)
                    .attr("opacity",0)
                    .attr("transform",`rotate(60)`)
                    .transition().duration(duration).transition()
                    .attr("opacity",1)
                    .attr("transform",`translate(12,1) rotate(60)`);

    //모션 2이 시작할때 칼라봉 보이게 설정
    enter.transition().duration(duration).transition()
        .on("start", function(p) {select(this).attr("fill-opacity", 1);})

    //모션 2에서 칼라봉을 하단으로 이동
    enter.selectAll("g")
        .transition().duration(duration).transition()
        .attr("transform", transforming("array") as unknown as string)

    //모션 2에서 칼라봉의 사이즈를 yScale 맞게 재설정
    const rectsize = enter.selectAll("g")
        .selectAll("rect") as Selection<SVGGElement, unknown, HTMLElement, any>;

        rectsize.transition().duration(duration).transition()
        .attr("y", (d, i) => {
            const data = d as HierarchyNode<HierarchyDatum>;
            return i===0? yScale(data.data.value as number): yScale(data.data.y1 as number);
        })
        .attr("height", (d)=>{
            const data = d as HierarchyNode<HierarchyDatum>;
            return yScale(0)-yScale(data.value as number)
        })


}

//부모 데이터로 올라가며 그래프를 그려주는 함수
function up(svg:Selection<SVGSVGElement, unknown, HTMLElement, any>, d:HierarchyNode<HierarchyDatum>){
    //부모 데이터가 없으면 리턴, exit값이 존재하면 리턴 
    if(!d.parent || !svg.selectAll(".d3Chart_stats_exit").empty()) return;
    //배경에 부모데이터를 재설정
    svg.select(".d3Chart_stats_background").datum(d.parent);
    
    //클릭된 인텍스 값 저장
    const idx = d.data.index

    //기존에 있는 enter를 exit으로 전환
    const exit = svg.selectAll(".d3Chart_stats_enter")
        .attr("class", "d3Chart_stats_exit");
   
    //y축의 최대값 재설정 및 모션 1 적용
    const ymax = max(d.parent.children as HierarchyNode<HierarchyDatum>[], d=>d? d.value : 0);
    yScale.domain([0, ymax ? ymax : 0])

    const y = svg.select(".d3Chart_stats_y-axis") as Selection<SVGSVGElement, unknown, HTMLElement, any>
    y.transition().duration(duration)
        .call(yAxis)
        .call(g => g.selection ? g.selection().select(".domain").remove() : g.select(".domain").remove())


    // 모션 1 기존 칼라봉의 위치 조정 및 봉 사이즈를 y축에 맞게 재설정
    exit.transition().duration(duration)
        .on("end", function(p) {select(this).remove();})
        .call(g=>g.selectAll("g").attr("transform", transforming("up") as unknown as string))
        .call(g=>g.selectAll("g")
            .selectAll('rect')
                .attr("height", (d)=>{
                    const data = d as HierarchyNode<HierarchyDatum>;
                    return yScale(0)-yScale(data.value as number);
                   })
                .attr("y", (d, i) => {
                    const data = d as HierarchyNode<HierarchyDatum>;
                    return i===0? yScale(data.data.value as number): yScale(data.data.y1 as number);
                }))
    
    //모션 2 x축 label 최기화, 가시화 및 이동
    svg.select(".d3Chart_stats_x-axis")
        .selectAll("text")
            .text(null)
            .data(map(d.parent.children as HierarchyNode<HierarchyDatum>[] , d=>d.data.name))
                .text(d=>d)
                    .attr("opacity",0)
                    .attr("transform",`rotate(60)`)
                    .transition().duration(duration).transition()
                    .attr("opacity",1)
                    .attr("transform",`translate(12,1) rotate(60)`);

    // 모션 2에서 사용할 움직용 단색봉 생성
    const move =onecolorBar(svg, d,".d3Chart_stats_exit")

    // 모션 2 시작 할 때 보이게 하고 특정 index 값에 쌓음
    move.selectAll("rect")
        .attr("transform",transforming("spread")as unknown as string)
        .transition().duration(duration).transition()
            .attr("transform", (d) =>{
                const data = d as HierarchyNode<HierarchyDatum>;
                return `translate(${xScale(xScale.domain()[idx as number])}, ${yScale(data.data.y1 as number)})`;
            })
            .on("start", function(p) {select(this).attr("fill-opacity",1);})

    // 모션 2 마지막 끝날 때 데이터 삭제
    move.transition().duration(duration).transition().on("end", function(p) {select(this).remove();})

    // 마지막에 보일 칼라봉 생성
    const enter = fullcolorBar(svg, down, d.parent ,".d3Chart_stats_exit")
    
    // 모션 2 동안에 서서히 가시화
    enter.selectAll("g")
        .attr("fill-opacity", 0)
        .attr("transform", transforming("array") as unknown as string)
        .transition().duration(duration).transition()
        .attr("fill-opacity", 1)
}

// 칼라봉 그려주는 함수
function fullcolorBar (svg:Selection<SVGSVGElement, unknown, HTMLElement, any>, down:Function, d:HierarchyNode<HierarchyDatum>, selector:string){
    const g = svg.insert("g",selector)
    .attr("class", "d3Chart_stats_enter")
    
    g.attr("fill-opacity", 0)
    .selectAll("g")
    .data(d.children as HierarchyNode<HierarchyDatum>[])
    .join("g")
        .on("click",(_, d) => down(svg, d))
        .attr("cursor", d=>!d.children ? null : "pointer")
        .attr("transform", (d,i)=>`translate(${xScale(xScale.domain()[i])},${yScale(d.data.y0 as number)-yScale(0)})`)
            .selectAll("g")
            .data(d=>d.children? d.children : d)
                .join("rect")
                    .attr("class", (_,i)=>`d3Chartstats_color_${i}`)
                    .attr("fill", (_,i)=>color(i))
                    .attr("y", (d,i) => i===0? yScale(d.data.value as number): yScale(d.data.y1 as number))
                    .attr("height", d => yScale(0)-yScale(d.value as number))
                    .attr("width", xScale.bandwidth())

    return g
}

//단색봉 그려주는 함수
function onecolorBar(svg:Selection<SVGSVGElement, unknown, HTMLElement, any>, d:HierarchyNode<HierarchyDatum>, selector:string,idx:number|null = null){
    const g = svg.insert("g", selector)
        .attr("class", "d3Chart_stats_move")

    const bar = g.attr("fill-opacity", 0).selectAll("g")
        .data(d.children as HierarchyNode<HierarchyDatum>[])
        .join("rect")
            .attr("width", xScale.bandwidth())
            .attr("height", d=> yScale(0)-yScale(d.value as number))
            .attr("fill", (_,i)=> color(i));

    if(idx == null){
        bar.attr("transform", d=>`translate(${xScale(xScale.domain()[d.data.index as number])},${yScale(d.data.y1 as number)})`)
    }else {
        bar.attr("transform", d=> `translate(${xScale(xScale.domain()[idx])},${yScale(d.data.y1 as number)})`)
    }

    return g
}

// 모션에서 사용하는 위치 리턴 함수
function transforming(type:string){
    return (d: HierarchyNode<HierarchyDatum>, i: number): string =>{
        let t:string = "";
        switch(type){
            case "array":
                t = `translate(${xScale(xScale.domain()[i])}, 0)`;
                break;

            case "spread":
                t = `translate(${xScale(xScale.domain()[i])}, ${yScale(d.data.y1 as number)})`;
                break;

            default:
                t = `translate(${xScale(xScale.domain()[i])}, ${yScale(d.data.y0 as number) - yScale(0)})`;
                break;
            };
    return t;
    }
}

// x축의 최대 label 갯수 확인용
function xmax ():number {
    let max:number = 1;
    root.each(d => d.children && (max = Math.max(max, d.children.length)));
    return max
  }

function maxwidth():number{
    let max = 1;
    root.each(d => d.children && (max = Math.max(max, d.children.length)));
    return max * xScale.step() + margin.left + margin.right;
  }


chart()
