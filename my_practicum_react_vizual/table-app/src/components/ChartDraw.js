import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);
    const wrapperRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        if (!wrapperRef.current) return;
        
        const observer = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
        });
        
        observer.observe(wrapperRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setHasData(props.data && props.data.length > 0);
    }, [props.data]);

    const margin = {
        top: 20, 
        bottom: 100,
        left: 70,
        right: 30
    };
    
    const boundsWidth = dimensions.width - margin.left - margin.right;
    const boundsHeight = dimensions.height - margin.top - margin.bottom;
    
    const allValues = props.data.flatMap(d => [
        ...(props.oy[0] ? [d.values[1]] : []),
        ...(props.oy[1] ? [d.values[0]] : [])
    ]);
    
    const [minY, maxY] = allValues.length > 0 
        ? d3.extent(allValues) 
        : [0, 100];

    const scaleX = useMemo(() => {
        if (!hasData || !props.data || props.data.length === 0) return null;
        
        const bandScale = d3.scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0, boundsWidth])
            .padding(0.1);
            
        if (bandScale.bandwidth() > 100) {
            bandScale.paddingInner(0.1);
        } else {
            bandScale.paddingInner(0.4);
        }
        return bandScale;
    }, [props.data, boundsWidth, hasData]);

    const scaleY = useMemo(() => {
        let domainMin = minY * 0.85;
        let domainMax = maxY * 1.1;
        
        if (domainMin === domainMax) {
            domainMin = Math.max(0, domainMin - 10);
            domainMax = domainMax + 10;
        }
        
        domainMin = Math.max(0, domainMin);
        
        return d3.scaleLinear()
            .domain([domainMin, domainMax])
            .range([boundsHeight, 0])
            .nice();
    }, [boundsHeight, minY, maxY]);

    useEffect(() => {
        if (!hasData || !scaleX || !scaleY || 
            boundsWidth <= 0 || boundsHeight <= 0) return;
        
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        
        const graph = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
        const xAxis = d3.axisBottom(scaleX);
            
        const xAxisGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${dimensions.height - margin.bottom})`)
            .call(xAxis);
            
        xAxisGroup.selectAll("text")
            .style("text-anchor", "end")
            .style("font-weight", "normal")
            .attr("dx", "-0.8em")
            .attr("dy", "0.15em")
            .attr("transform", "rotate(-45)");

        xAxisGroup.append("text")
            .attr("class", "axis-label")
            .attr("x", boundsWidth / 2)
            .attr("y", 50)
            .attr("fill", "black")
            .style("text-anchor", "middle")
            .style("font-weight", "normal")
            .text(props.ox);

        const yAxis = d3.axisLeft(scaleY);
        const yAxisGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
            
        yAxisGroup.selectAll("text")
            .style("font-weight", "normal");

        yAxisGroup.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -boundsHeight / 2)
            .attr("y", -50)
            .attr("fill", "black")
            .style("text-anchor", "middle")
            .style("font-weight", "normal")
            .text("Проданные копии (млн)");
        
        if (props.chartType === "scatter") {
            const seriesCount = props.oy.filter(Boolean).length;
            const offsetStep = Math.min(10, scaleX.bandwidth() / (seriesCount + 1));
            let seriesIndex = 0;
            
            if (props.oy[0]) {
                graph.selectAll(".dot-max")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => {
                        const baseX = scaleX(d.labelX) + scaleX.bandwidth() / 2;
                        const offset = seriesCount > 1 ? (seriesIndex - (seriesCount - 1) / 2) * offsetStep : 0;
                        return baseX + offset;
                    })
                    .attr("cy", d => scaleY(d.values[1]))
                    .style("fill", "red")
                    .append("title")
                    .text(d => `Макс: ${d.values[1]} млн`);
                seriesIndex++;
            }
            
            if (props.oy[1]) {
                graph.selectAll(".dot-min")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => {
                        const baseX = scaleX(d.labelX) + scaleX.bandwidth() / 2;
                        const offset = seriesCount > 1 ? (seriesIndex - (seriesCount - 1) / 2) * offsetStep : 0;
                        return baseX + offset;
                    })
                    .attr("cy", d => scaleY(d.values[0]))
                    .style("fill", "blue")
                    .append("title")
                    .text(d => `Мин: ${d.values[0]} млн`);
            }
        } else {
            const barWidth = scaleX.bandwidth() / ((props.oy[0] && props.oy[1]) ? 2 : 1);
                
            if (props.oy[0]) {
                graph.selectAll(".bar-max")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + (props.oy[1] ? 0 : barWidth / 2))
                    .attr("y", d => scaleY(d.values[1]))
                    .attr("width", barWidth)
                    .attr("height", d => Math.abs(scaleY(d.values[1]) - scaleY(0)))
                    .style("fill", "red")
                    .append("title")
                    .text(d => `Макс: ${d.values[1]} млн`);
            }
            
            if (props.oy[1]) {
                graph.selectAll(".bar-min")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + (props.oy[0] ? barWidth : 0))
                    .attr("y", d => scaleY(d.values[0]))
                    .attr("width", barWidth)
                    .attr("height", d => Math.abs(scaleY(d.values[0]) - scaleY(0)))
                    .style("fill", "blue")
                    .append("title")
                    .text(d => `Мин: ${d.values[0]} млн`);
            }
        }
    }, [scaleX, scaleY, props.data, props.oy, props.chartType, dimensions, boundsHeight, boundsWidth, hasData, margin]);

    if (!hasData) {
        return (
            <div ref={wrapperRef} style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc' }}>
                <div style={{ textAlign: 'center' }}>
                    <p>Выберите параметры и нажмите "Построить"</p>
                    <p style={{ color: '#666', fontSize: '0.9em' }}>
                        {props.data && props.data.length === 0 ? 
                            "Нет данных для отображения. Попробуйте изменить фильтры." : 
                            "Ожидание данных..."
                        }
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div ref={wrapperRef} style={{ width: '100%', height: '500px' }}>
            <svg 
                ref={chartRef} 
                width={dimensions.width} 
                height={dimensions.height}
            />
        </div>
    )
}

export default ChartDraw;