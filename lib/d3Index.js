"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_hierarchy_1 = require("d3-hierarchy");
const data_1 = require("./data");
const d3_1 = require("d3");
let root = (0, d3_hierarchy_1.hierarchy)(data_1.data)
    .sum((d) => d.value)
    .sort((a, b) => {
    if (a.value == undefined || b.value == undefined) {
        return 0;
    }
    else {
        return b.value - a.value;
    }
})
    .eachAfter((d, idx) => {
    if (d.parent) {
        d.data.value = d.value;
        if (d.parent.data.index == undefined) {
            d.parent.data.index = 0;
            d.data.index = 0;
        }
        else {
            d.parent.data.index = d.parent.data.index + 1;
            d.data.index = d.parent.data.index;
        }
        if (d.parent.data.y1 == undefined) {
            d.data.y0 = 0;
            d.data.y1 = d.value;
            d.parent.data.y0 = 0;
            d.parent.data.y1 = d.value;
        }
        else {
            d.data.y0 = d.parent.data.y1;
            d.data.y1 = d.data.y0 + d.value;
            d.parent.data.y1 += d.value;
        }
    }
    else {
        d.data.index = 0;
        d.data.value = d.value;
        d.data.y0 = 0;
        d.data.y1 = d.data.value;
    }
});
const margin = { top: 30, bottom: 100, right: 10, left: 30 };
const height = 500;
let width = 500;
const duration = 750;
const paddinginner = 0.2;
const paddingouter = 0.2;
const xRange = [margin.left, width - margin.right];
const xDomain = (0, d3_1.range)(xmax());
let xScale = (0, d3_1.scaleBand)().range(xRange).domain(xDomain).paddingInner(paddinginner).paddingOuter(paddingouter);
let xAxis = (0, d3_1.axisBottom)(xScale).tickSizeOuter(0);
const yRange = [height - margin.bottom, margin.top];
let yDomain = [0, root.value];
let yScale = (0, d3_1.scaleLinear)().domain(yDomain).range(yRange).nice();
let yAxis = (0, d3_1.axisLeft)(yScale).ticks(width / 80, "s");
const color = (0, d3_1.scaleSequential)(d3_1.interpolateBlues).domain([-10.5 * 2, 1.0 * 28]);
function myzoom(svg) {
    const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];
    const mZoom = (0, d3_1.zoom)()
        .scaleExtent([1, 8])
        .translateExtent(extent)
        .extent(extent)
        .on("zoom", myzoomed);
    svg.call(mZoom);
    function myzoomed(event) {
        let xlabel = [];
        xScale.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
        svg.select(".d3Chart_stats_enter")
            .selectAll("g")
            .attr("transform", (d) => {
            const data = d;
            xlabel.push(data.data.name);
            return `translate(${xScale(xScale.domain()[data.data.index])},0)`;
        })
            .selectAll("rect")
            .attr("width", xScale.bandwidth());
        const y = svg.select(".d3Chart_stats_y-axis");
        y.raise().call(yAxis)
            .call(g => g.selection ? g.selection().select(".domain").remove() : g.select(".domain").remove());
        const x = svg.select(".d3Chart_stats_x-axis");
        x.call(xAxis)
            .call(g => g.selectAll("text").text(null).data(xlabel).text(d => d));
    }
}
function chart() {
    const svg = (0, d3_1.selectAll)("#d3ChartStats")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .call(myzoom);
    svg.append("rect")
        .attr("class", "d3Chart_stats_background")
        .attr("fill-opacity", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("cursor", "pointer")
        .on("click", (_, d) => up(svg, d));
    svg.append("g")
        .attr("class", "d3Chart_stats_x-axis")
        .attr("transform", `translate (0, ${height - margin.bottom})`)
        .call(xAxis)
        .call(g => g.selectAll("g")
        .selectAll("text")
        .text(null)
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "baseline"));
    svg.append("g")
        .attr("class", "d3Chart_stats_y-axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis).raise()
        .call(g => (g.selection ? g.selection() : g).select(".domain").remove());
    down(svg, root);
    return svg.node();
}
function down(svg, d) {
    if (!d.children || (0, d3_1.active)(svg.node()))
        return;
    svg.select(".d3Chart_stats_background").datum(d);
    const exit = svg.selectAll(".d3Chart_stats_enter")
        .attr("class", "d3Chart_stats_exit");
    exit.selectAll("g")
        .attr("fill-opacity", p => p === d ? 0 : null);
    exit.transition().duration(duration)
        .attr("fill-opacity", 0)
        .remove();
    const move = onecolorBar(svg, d, ".d3Chart_stats_exit", d.data.index);
    move.attr("fill-opacity", 1)
        .transition().duration(duration)
        .on("end", function (p) {
        (0, d3_1.select)(this)
            .attr("fill-opacity", 0);
    })
        .remove();
    move.selectAll("rect")
        .attr("fill-opacity", 1)
        .transition().duration(duration)
        .attr("transform", transforming("spread"));
    const enter = fullcolorBar(svg, down, d, ".d3Chart_stats_exit");
    const ymax = (0, d3_1.max)(d.children, d => d ? d.value : 0);
    yScale.domain([0, ymax ? ymax : 0]);
    const y = svg.select(".d3Chart_stats_y-axis");
    y.transition().duration(duration).transition()
        .call(yAxis)
        .call(g => g.selection ? g.selection().select(".domain").remove() : g.select(".domain").remove());
    svg.select(".d3Chart_stats_x-axis")
        .selectAll("text")
        .text(null)
        .data((0, d3_1.map)(d.children, d => d.data.name))
        .text(d => d)
        .attr("opacity", 0)
        .attr("transform", `rotate(60)`)
        .transition().duration(duration).transition()
        .attr("opacity", 1)
        .attr("transform", `translate(12,1) rotate(60)`);
    enter.transition().duration(duration).transition()
        .on("start", function (p) { (0, d3_1.select)(this).attr("fill-opacity", 1); });
    enter.selectAll("g")
        .transition().duration(duration).transition()
        .attr("transform", transforming("array"));
    const rectsize = enter.selectAll("g")
        .selectAll("rect");
    rectsize.transition().duration(duration).transition()
        .attr("y", (d, i) => {
        const data = d;
        return i === 0 ? yScale(data.data.value) : yScale(data.data.y1);
    })
        .attr("height", (d) => {
        const data = d;
        return yScale(0) - yScale(data.value);
    });
}
function up(svg, d) {
    if (!d.parent || !svg.selectAll(".d3Chart_stats_exit").empty())
        return;
    svg.select(".d3Chart_stats_background").datum(d.parent);
    const idx = d.data.index;
    const exit = svg.selectAll(".d3Chart_stats_enter")
        .attr("class", "d3Chart_stats_exit");
    const ymax = (0, d3_1.max)(d.parent.children, d => d ? d.value : 0);
    yScale.domain([0, ymax ? ymax : 0]);
    const y = svg.select(".d3Chart_stats_y-axis");
    y.transition().duration(duration)
        .call(yAxis)
        .call(g => g.selection ? g.selection().select(".domain").remove() : g.select(".domain").remove());
    exit.transition().duration(duration)
        .on("end", function (p) { (0, d3_1.select)(this).remove(); })
        .call(g => g.selectAll("g").attr("transform", transforming("up")))
        .call(g => g.selectAll("g")
        .selectAll('rect')
        .attr("height", (d) => {
        const data = d;
        return yScale(0) - yScale(data.value);
    })
        .attr("y", (d, i) => {
        const data = d;
        return i === 0 ? yScale(data.data.value) : yScale(data.data.y1);
    }));
    svg.select(".d3Chart_stats_x-axis")
        .selectAll("text")
        .text(null)
        .data((0, d3_1.map)(d.parent.children, d => d.data.name))
        .text(d => d)
        .attr("opacity", 0)
        .attr("transform", `rotate(60)`)
        .transition().duration(duration).transition()
        .attr("opacity", 1)
        .attr("transform", `translate(12,1) rotate(60)`);
    const move = onecolorBar(svg, d, ".d3Chart_stats_exit");
    move.selectAll("rect")
        .attr("transform", transforming("spread"))
        .transition().duration(duration).transition()
        .attr("transform", (d) => {
        const data = d;
        return `translate(${xScale(xScale.domain()[idx])}, ${yScale(data.data.y1)})`;
    })
        .on("start", function (p) { (0, d3_1.select)(this).attr("fill-opacity", 1); });
    move.transition().duration(duration).transition().on("end", function (p) { (0, d3_1.select)(this).remove(); });
    const enter = fullcolorBar(svg, down, d.parent, ".d3Chart_stats_exit");
    enter.selectAll("g")
        .attr("fill-opacity", 0)
        .attr("transform", transforming("array"))
        .transition().duration(duration).transition()
        .attr("fill-opacity", 1);
}
function fullcolorBar(svg, down, d, selector) {
    const g = svg.insert("g", selector)
        .attr("class", "d3Chart_stats_enter");
    g.attr("fill-opacity", 0)
        .selectAll("g")
        .data(d.children)
        .join("g")
        .on("click", (_, d) => down(svg, d))
        .attr("cursor", d => !d.children ? null : "pointer")
        .attr("transform", (d, i) => `translate(${xScale(xScale.domain()[i])},${yScale(d.data.y0) - yScale(0)})`)
        .selectAll("g")
        .data(d => d.children ? d.children : d)
        .join("rect")
        .attr("class", (_, i) => `d3Chartstats_color_${i}`)
        .attr("fill", (_, i) => color(i))
        .attr("y", (d, i) => i === 0 ? yScale(d.data.value) : yScale(d.data.y1))
        .attr("height", d => yScale(0) - yScale(d.value))
        .attr("width", xScale.bandwidth());
    return g;
}
function onecolorBar(svg, d, selector, idx = null) {
    const g = svg.insert("g", selector)
        .attr("class", "d3Chart_stats_move");
    const bar = g.attr("fill-opacity", 0).selectAll("g")
        .data(d.children)
        .join("rect")
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(0) - yScale(d.value))
        .attr("fill", (_, i) => color(i));
    if (idx == null) {
        bar.attr("transform", d => `translate(${xScale(xScale.domain()[d.data.index])},${yScale(d.data.y1)})`);
    }
    else {
        bar.attr("transform", d => `translate(${xScale(xScale.domain()[idx])},${yScale(d.data.y1)})`);
    }
    return g;
}
function transforming(type) {
    return (d, i) => {
        let t = "";
        switch (type) {
            case "array":
                t = `translate(${xScale(xScale.domain()[i])}, 0)`;
                break;
            case "spread":
                t = `translate(${xScale(xScale.domain()[i])}, ${yScale(d.data.y1)})`;
                break;
            default:
                t = `translate(${xScale(xScale.domain()[i])}, ${yScale(d.data.y0) - yScale(0)})`;
                break;
        }
        ;
        return t;
    };
}
function xmax() {
    let max = 1;
    root.each(d => d.children && (max = Math.max(max, d.children.length)));
    return max;
}
chart();
//# sourceMappingURL=d3Index.js.map