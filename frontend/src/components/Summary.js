import React, { useEffect } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import API_URL from '../config'; 

const Summary = () => {
  useEffect(() => {
    const fetchChart1Data = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/chart1-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { labels, values } = response.data;
        renderBarChart(labels, values);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    
    const fetchChart2Data = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/chart2-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { labels, values } = response.data;

        const transformedData = labels.map((label, index) => ({
          label,
          value: values[index],
        }));

        console.log('Transformed Data for Donut Chart:', transformedData); 
        renderDonutChart(transformedData);
      } catch (error) {
        console.error('Error fetching donut chart data:', error);
      }
    };


    const renderBarChart = (labels, values) => {
      const width = 500;
      const height = 300;
      const margin = { top: 20, right: 30, bottom: 50, left: 40 };

   
      d3.select('#barChartSvg').selectAll('*').remove();

      const svg = d3
        .select('#barChartSvg')
        .attr('width', width)
        .attr('height', height);

      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      const chart = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

  
      const x = d3
        .scaleBand()
        .domain(labels)
        .range([0, chartWidth])
        .padding(0.2);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(values)])
        .range([chartHeight, 0]);

    
      chart
        .append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

      chart.append('g').call(d3.axisLeft(y));

      
      chart
        .selectAll('.bar')
        .data(values)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (_, i) => x(labels[i]))
        .attr('y', (d) => y(d))
        .attr('width', x.bandwidth())
        .attr('height', (d) => chartHeight - y(d))
        .attr('fill', 'steelblue');

     
      chart
        .selectAll('.label')
        .data(values)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', (_, i) => x(labels[i]) + x.bandwidth() / 2)
        .attr('y', (d) => y(d) - 5)
        .attr('text-anchor', 'middle')
        .text((d) => d);
    };

    const renderDonutChart = (data) => {
      try {
        console.log('Rendering Donut Chart with Data:', data); 

        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        
        d3.select('#donutChartSvg').selectAll('*').remove();

        const svg = d3
          .select('#donutChartSvg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie().value((d) => d.value);

        const arc = d3
          .arc()
          .innerRadius(radius / 2) 
          .outerRadius(radius);

        const arcs = svg
          .selectAll('arc')
          .data(pie(data))
          .enter()
          .append('g')
          .attr('class', 'arc');

        arcs
          .append('path')
          .attr('d', arc)
          .attr('fill', (d) => color(d.data.label));

        arcs
          .append('text')
          .attr('transform', (d) => `translate(${arc.centroid(d)})`)
          .attr('text-anchor', 'middle')
          .text((d) => d.data.label);
      } catch (error) {
        console.error('Error rendering donut chart:', error);
      }
    };
    fetchChart1Data();
    fetchChart2Data();
  }, []);



  return (
    <div>
      <h2>Monthly Data Summary</h2>
      <div>
        <h3>Bar Chart</h3>
        <svg id="barChartSvg"></svg>
      </div>
      <h1>Chart Analysis</h1>

<div class="chart-container">
    <h2>1. Summary Chart</h2>
    <p><span class="summary">Data Overview:</span> The summary chart provides monthly data (January, February, and March), showing a consistent downward trend in values:</p>
    <ul class="chart-analysis">
        <li><strong>January:</strong> 85</li>
        <li><strong>February:</strong> 80</li>
        <li><strong>March:</strong> 75</li>
    </ul>
    <p><span class="summary">Analysis:</span> The decline indicates a potential decrease in performance, engagement, or another key metric over the first quarter. This could be due to seasonal factors, operational challenges, or external market conditions.</p>
    <p><span class="summary">Key Points to Highlight:</span></p>
    <ul class="chart-analysis">
        <li>Investigate reasons behind the consistent decline month over month.</li>
        <li>Identify if this trend is cyclical or specific to this time frame.</li>
        <li>Recommend corrective measures to stabilize or reverse the trend.</li>
    </ul>
</div>
      <div>
        <h3>Donut Chart</h3>
        <svg id="donutChartSvg"></svg>
      </div>
      <div class="chart-container">
        <h2>2. Reports Chart</h2>
        <p><span class="summary">Data Overview:</span> The reports chart summarizes the quarterly data (Q1, Q2, and Q3) with similar values:</p>
        <ul class="chart-analysis">
            <li><strong>Q1:</strong> 85</li>
            <li><strong>Q2:</strong> 80</li>
            <li><strong>Q3:</strong> 75</li>
        </ul>
        <p><span class="summary">Analysis:</span> The quarterly data mirrors the monthly trend observed in the summary chart. A steady decline across quarters might indicate an ongoing issue affecting performance or metrics over a more extended period.</p>
        <p><span class="summary">Key Points to Highlight:</span></p>
        <ul class="chart-analysis">
            <li>Compare with the previous year's performance during similar quarters for context.</li>
            <li>Assess if internal or external factors (e.g., resource constraints, market changes) contributed to this decline.</li>
            <li>Develop strategies to address potential root causes, such as operational inefficiencies or customer retention challenges.</li>
        </ul>
    </div>
    <div class="chart-container">
        <h2>General Insights</h2>
        <p>Both charts indicate a consistent decrease in values, whether viewed monthly or quarterly. This suggests a broader trend requiring attention. Key actions might include conducting a deeper analysis to pinpoint causes, implementing new strategies, or preparing contingency plans to address future impacts.</p>
    </div>
    </div>
  );
};

export default Summary;