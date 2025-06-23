import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);
    const wrapperRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!wrapperRef.current) return;
        
        const observer = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
        });
        
        observer.observe(wrapperRef.current);
        return () => observer.disconnect();
    }, []);

    const margin = {
        top: 10, 
        bottom: 60, 
        left: 40, 
        right: 10
    };
    
    const boundsWidth = dimensions.width - margin.left - margin.right;
    const boundsHeight = dimensions.height - margin.top - margin.bottom;

    const isNumericX = props.ox === "Год";
    
    const sortedData = useMemo(() => {
        if (!isNumericX || props.data.length === 0) return props.data;
        
        return [...props.data].sort((a, b) => 
            Number(a.labelX) - Number(b.labelX)
        );
    }, [props.data, isNumericX]);

    const allValues = sortedData.flatMap(d => [
        ...(props.oy[0] ? [d.values[1]] : []),
        ...(props.oy[1] ? [d.values[0]] : [])
    ]);
    
    const [minY, maxY] = allValues.length > 0 
        ? d3.extent(allValues) 
        : [0, 100];

    const scaleX = useMemo(() => {
        if (sortedData.length === 0) return null;
        
        if (isNumericX) {
            return d3.scalePoint()
                .domain(sortedData.map(d => d.labelX))
                .range([0, boundsWidth])
                .padding(0.5);
        } else {
            return d3.scaleBand()
                .domain(sortedData.map(d => d.labelX))
                .range([0, boundsWidth])
                .padding(0.1);
        }
    }, [sortedData, boundsWidth, isNumericX]);

    const scaleY = useMemo(() => {
        return d3.scaleLinear()
            .domain([minY * 0.85, maxY * 1.1])
            .range([boundsHeight, 0]);
    }, [boundsHeight, minY, maxY]);

    useEffect(() => {
        if (!chartRef.current || !scaleX || sortedData.length === 0) return;
        
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        
        const graph = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
        const xAxis = isNumericX 
            ? d3.axisBottom(scaleX).tickFormat(d3.format("d"))
            : d3.axisBottom(scaleX);
            
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${dimensions.height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", isNumericX ? "0" : "-.8em")
            .attr("dy", isNumericX ? ".25em" : ".15em")
            .attr("transform", isNumericX ? null : "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
        
        if (props.chartType === "scatter") {
            const seriesCount = props.oy.filter(Boolean).length;
            const offsetStep = Math.min(10, (isNumericX ? scaleX.step() : scaleX.bandwidth()) / (seriesCount + 1));
            
            let seriesIndex = 0;
            
            if (props.oy[0]) {
                graph.selectAll(".dot-max")
                    .data(sortedData)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => {
                        const baseX = isNumericX 
                            ? scaleX(d.labelX)
                            : scaleX(d.labelX) + scaleX.bandwidth() / 2;
                        const offset = seriesCount > 1 
                            ? (seriesIndex - (seriesCount - 1) / 2) * offsetStep 
                            : 0;
                        return baseX + offset;
                    })
                    .attr("cy", d => scaleY(d.values[1]))
                    .style("fill", "red");
                seriesIndex++;
            }
            
            if (props.oy[1]) {
                graph.selectAll(".dot-min")
                    .data(sortedData)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => {
                        const baseX = isNumericX 
                            ? scaleX(d.labelX)
                            : scaleX(d.labelX) + scaleX.bandwidth() / 2;
                        const offset = seriesCount > 1 
                            ? (seriesIndex - (seriesCount - 1) / 2) * offsetStep 
                            : 0;
                        return baseX + offset;
                    })
                    .attr("cy", d => scaleY(d.values[0]))
                    .style("fill", "blue");
            }
        } else {
            // ОБНОВЛЕННАЯ ЛОГИКА ДЛЯ ГИСТОГРАММ
            const seriesCount = (props.oy[0] ? 1 : 0) + (props.oy[1] ? 1 : 0);
            let barWidth, barSpacing;
            
            if (isNumericX) {
                barSpacing = scaleX.step() * 0.8;
                barWidth = seriesCount > 0 ? barSpacing / seriesCount : barSpacing;
            } else {
                barWidth = scaleX.bandwidth() / (seriesCount || 1);
                barSpacing = barWidth;
            }

            if (props.oy[0]) {
                graph.selectAll(".bar-max")
                    .data(sortedData)
                    .enter()
                    .append("rect")
                    .attr("x", d => {
                        if (isNumericX) {
                            const baseX = scaleX(d.labelX);
                            return baseX - barSpacing / 2;
                        } else {
                            return scaleX(d.labelX);
                        }
                    })
                    .attr("y", d => scaleY(d.values[1]))
                    .attr("width", barWidth)
                    .attr("height", d => boundsHeight - scaleY(d.values[1]))
                    .style("fill", "red");
            }
            
            if (props.oy[1]) {
                graph.selectAll(".bar-min")
                    .data(sortedData)
                    .enter()
                    .append("rect")
                    .attr("x", d => {
                        if (isNumericX) {
                            const baseX = scaleX(d.labelX);
                            const offset = props.oy[0] ? barWidth : 0;
                            return baseX - barSpacing / 2 + offset;
                        } else {
                            const offset = props.oy[0] ? barWidth : 0;
                            return scaleX(d.labelX) + offset;
                        }
                    })
                    .attr("y", d => scaleY(d.values[0]))
                    .attr("width", barWidth)
                    .attr("height", d => boundsHeight - scaleY(d.values[0]))
                    .style("fill", "blue");
            }
        }
    }, [scaleX, scaleY, sortedData, props.oy, props.chartType, dimensions, isNumericX, margin]);

    if (sortedData.length === 0) {
        return <div>Нет данных для отображения графика</div>;
    }

    return (
        <div ref={wrapperRef} style={{ width: '100%', height: '400px' }}>
            <svg 
                ref={chartRef} 
                width={dimensions.width} 
                height={dimensions.height}
            />
        </div>
    )
}

export default ChartDraw;