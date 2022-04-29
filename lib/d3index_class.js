"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_hierarchy_1 = require("d3-hierarchy");
const data_1 = require("./data");
const d3_1 = require("d3");
class chart {
    constructor() {
        this._data = this.inputData(data_1.data);
        this.yDomain = [0, this._data.value];
        this._tagName = "";
        this.height = 500;
        this.width = 500;
        this.margin = { top: 30, bottom: 100, right: 10, left: 30 };
        this.duration = 750;
        this.paddinginner = 0.2;
        this.paddingouter = 0.2;
        this.xRange = [this.margin.left, this.width - this.margin.right];
        this.xDomain = (0, d3_1.range)(this.xmax());
        this.xScale = (0, d3_1.scaleBand)().domain(this.xDomain).range(this.xRange).paddingInner(this.paddinginner).paddingOuter(this.paddingouter);
        this.xAxis = (0, d3_1.axisBottom)(this.xScale).tickSizeOuter(5);
        this.yRange = [this.height - this.margin.bottom, this.margin.top];
        this.yDomain = [0, this._data.value];
        this.yScale = (0, d3_1.scaleLinear)().domain(this.yDomain).range(this.yRange);
        this.yAxis = (0, d3_1.axisLeft)(this.yScale).ticks(this.width / 80, "s");
        this.color = (0, d3_1.scaleSequential)(d3_1.interpolateBlues).domain([-10.5 * 2, 1.0 * 28]);
    }
    select(tagName) {
        this._tagName = tagName;
        console.log("class로 실행");
        const svg = (0, d3_1.selectAll)(tagName)
            .append("svg")
            .attr("viewBox", [0, 0, this.width, this.height])
            .call(this.myzoom);
        svg.append("rect")
            .attr("class", "d3Chart_stats_background")
            .attr("fill-opacity", 0)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("cursor", "pointer")
            .on("click", (_, d) => this.up(svg, d));
        svg.append("g")
            .attr("class", "d3Chart_stats_x-axis")
            .attr("transform", `translate (0, ${this.height - this.margin.bottom})`)
            .call(this.xAxis)
            .call(g => g.selectAll("g")
            .selectAll("text")
            .text(null)
            .attr("text-anchor", "start")
            .attr("alignment-baseline", "baseline"));
        svg.append("g")
            .attr("class", "d3Chart_stats_y-axis")
            .attr("transform", `translate(${this.margin.left},0)`)
            .call(this.yAxis).raise()
            .call(g => (g.selection ? g.selection() : g).select(".domain").remove());
        this.down(svg, this._data);
        return svg.node();
    }
    myzoom(svg) {
        const extent = [[this.margin.left, this.margin.top], [this.width - this.margin.right, this.height - this.margin.top]];
        const mZoom = (0, d3_1.zoom)()
            .scaleExtent([1, 8])
            .translateExtent(extent)
            .extent(extent)
            .on("zoom", this.myzoomed);
        svg.call(mZoom);
    }
    myzoomed(event) {
        let xlabel = [];
        this.xScale.range([this.margin.left, this.width - this.margin.right].map(d => event.transform.applyX(d)));
        let svg = (0, d3_1.selectAll)(this._tagName).select("svg");
        svg.select(".d3Chart_stats_enter")
            .selectAll("g")
            .attr("transform", (d) => {
            const data = d;
            xlabel.push(data.data.name);
            return `translate(${this.xScale(this.xScale.domain()[data.data.index])},0)`;
        })
            .selectAll("rect")
            .attr("width", this.xScale.bandwidth());
        const y = svg.select(".d3Chart_stats_y-axis");
        y.raise().call(this.yAxis)
            .call(g => g.selection ? g.selection().select(".domain").remove() : g.select(".domain").remove());
        const x = svg.select(".d3Chart_stats_x-axis");
        x.call(this.xAxis)
            .call(g => g.selectAll("text").text(null).data(xlabel).text(d => d));
    }
    down(svg, d) {
        if (!d.children || (0, d3_1.active)(svg.node()))
            return;
        svg.select(".d3Chart_stats_background").datum(d);
        const exit = svg.selectAll(".d3Chart_stats_enter")
            .attr("class", "d3Chart_stats_exit");
        exit.selectAll("g")
            .attr("fill-opacity", p => p === d ? 0 : null);
        exit.transition().duration(this.duration)
            .attr("fill-opacity", 0)
            .remove();
        const move = this.onecolorBar(svg, d, ".d3Chart_stats_exit", d.data.index);
        move.attr("fill-opacity", 1)
            .transition().duration(this.duration)
            .on("end", function (p) {
            (0, d3_1.select)(this)
                .attr("fill-opacity", 0);
        })
            .remove();
        move.selectAll("rect")
            .attr("fill-opacity", 1)
            .transition().duration(this.duration)
            .attr("transform", this.transforming("spread"));
        const enter = this.fullcolorBar(svg, this.down, d, ".d3Chart_stats_exit");
        const ymax = (0, d3_1.max)(d.children, d => d ? d.value : 0);
        this.yScale.domain([0, ymax ? ymax : 0]);
        const y = svg.select(".d3Chart_stats_y-axis");
        y.transition().duration(this.duration).transition()
            .call(this.yAxis)
            .call(g => g.selection ? g.selection().select(".domain").remove() : g.select(".domain").remove());
        svg.select(".d3Chart_stats_x-axis")
            .selectAll("text")
            .text(null)
            .data((0, d3_1.map)(d.children, d => d.data.name))
            .text(d => d)
            .attr("opacity", 0)
            .attr("transform", `rotate(60)`)
            .transition().duration(this.duration).transition()
            .attr("opacity", 1)
            .attr("transform", `translate(12,1) rotate(60)`);
        enter.transition().duration(this.duration).transition()
            .on("start", function (p) { (0, d3_1.select)(this).attr("fill-opacity", 1); });
        enter.selectAll("g")
            .transition().duration(this.duration).transition()
            .attr("transform", this.transforming("array"));
        const rectsize = enter.selectAll("g")
            .selectAll("rect");
        rectsize.transition().duration(this.duration).transition()
            .attr("y", (d, i) => {
            const data = d;
            return i === 0 ? this.yScale(data.data.value) : this.yScale(data.data.y1);
        })
            .attr("height", (d) => {
            const data = d;
            return this.yScale(0) - this.yScale(data.value);
        });
    }
    up(svg, d) {
        if (!d.parent || !svg.selectAll(".d3Chart_stats_exit").empty())
            return;
        svg.select(".d3Chart_stats_background").datum(d.parent);
        const idx = d.data.index;
        const exit = svg.selectAll(".d3Chart_stats_enter")
            .attr("class", "d3Chart_stats_exit");
        const ymax = (0, d3_1.max)(d.parent.children, d => d ? d.value : 0);
        this.yScale.domain([0, ymax ? ymax : 0]);
        const y = svg.select(".d3Chart_stats_y-axis");
        y.transition().duration(this.duration)
            .call(this.yAxis)
            .call(g => g.selection ? g.selection().select(".domain").remove() : g.select(".domain").remove());
        exit.transition().duration(this.duration)
            .on("end", function (p) { (0, d3_1.select)(this).remove(); })
            .call(g => g.selectAll("g").attr("transform", this.transforming("up")))
            .call(g => g.selectAll("g")
            .selectAll('rect')
            .attr("height", (d) => {
            const data = d;
            return this.yScale(0) - this.yScale(data.value);
        })
            .attr("y", (d, i) => {
            const data = d;
            return i === 0 ? this.yScale(data.data.value) : this.yScale(data.data.y1);
        }));
        svg.select(".d3Chart_stats_x-axis")
            .selectAll("text")
            .text(null)
            .data((0, d3_1.map)(d.parent.children, d => d.data.name))
            .text(d => d)
            .attr("opacity", 0)
            .attr("transform", `rotate(60)`)
            .transition().duration(this.duration).transition()
            .attr("opacity", 1)
            .attr("transform", `translate(12,1) rotate(60)`);
        const move = this.onecolorBar(svg, d, ".d3Chart_stats_exit");
        move.selectAll("rect")
            .attr("transform", this.transforming("spread"))
            .transition().duration(this.duration).transition()
            .attr("transform", (d) => {
            const data = d;
            return `translate(${this.xScale(this.xScale.domain()[idx])}, ${this.yScale(data.data.y1)})`;
        })
            .on("start", function (p) { (0, d3_1.select)(this).attr("fill-opacity", 1); });
        move.transition().duration(this.duration).transition().on("end", function (p) { (0, d3_1.select)(this).remove(); });
        const enter = this.fullcolorBar(svg, this.down, d.parent, ".d3Chart_stats_exit");
        enter.selectAll("g")
            .attr("fill-opacity", 0)
            .attr("transform", this.transforming("array"))
            .transition().duration(this.duration).transition()
            .attr("fill-opacity", 1);
    }
    fullcolorBar(svg, down, d, selector) {
        const g = svg.insert("g", selector)
            .attr("class", "d3Chart_stats_enter");
        g.attr("fill-opacity", 0)
            .selectAll("g")
            .data(d.children)
            .join("g")
            .on("click", (_, d) => down(svg, d))
            .attr("cursor", d => !d.children ? null : "pointer")
            .attr("transform", (d, i) => `translate(${this.xScale(this.xScale.domain()[i])},${this.yScale(d.data.y0) - this.yScale(0)})`)
            .selectAll("g")
            .data(d => d.children ? d.children : d)
            .join("rect")
            .attr("class", (_, i) => `d3Chartstats_color_${i}`)
            .attr("fill", (_, i) => this.color(i))
            .attr("y", (d, i) => i === 0 ? this.yScale(d.data.value) : this.yScale(d.data.y1))
            .attr("height", d => this.yScale(0) - this.yScale(d.value))
            .attr("width", this.xScale.bandwidth());
        return g;
    }
    onecolorBar(svg, d, selector, idx = null) {
        const g = svg.insert("g", selector)
            .attr("class", "d3Chart_stats_move");
        const bar = g.attr("fill-opacity", 0).selectAll("g")
            .data(d.children)
            .join("rect")
            .attr("width", this.xScale.bandwidth())
            .attr("height", d => this.yScale(0) - this.yScale(d.value))
            .attr("fill", (_, i) => this.color(i));
        if (idx == null) {
            bar.attr("transform", d => `translate(${this.xScale(this.xScale.domain()[d.data.index])},${this.yScale(d.data.y1)})`);
        }
        else {
            bar.attr("transform", d => `translate(${this.xScale(this.xScale.domain()[idx])},${this.yScale(d.data.y1)})`);
        }
        return g;
    }
    transforming(type) {
        return (d, i) => {
            let t = "";
            switch (type) {
                case "array":
                    t = `translate(${this.xScale(this.xScale.domain()[i])}, 0)`;
                    break;
                case "spread":
                    t = `translate(${this.xScale(this.xScale.domain()[i])}, ${this.yScale(d.data.y1)})`;
                    break;
                default:
                    t = `translate(${this.xScale(this.xScale.domain()[i])}, ${this.yScale(d.data.y0) - this.yScale(0)})`;
                    break;
            }
            ;
            return t;
        };
    }
    xmax() {
        let max = 1;
        this._data.each(d => d.children && (max = Math.max(max, d.children.length)));
        return max;
    }
    inputData(data) {
        if (data == undefined || data == null) {
            data = data_1.data;
        }
        const data1 = (0, d3_hierarchy_1.hierarchy)(data)
            .sum((d) => d.value)
            .sort((a, b) => {
            if (a.value == undefined || b.value == undefined) {
                return 0;
            }
            else {
                return b.value - a.value;
            }
        })
            .eachAfter((d) => {
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
        this._data = data1;
        return data1;
    }
}
const charttest = new chart();
charttest.select("d3ChartStats");
//# sourceMappingURL=d3index_class.js.map