import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import API_URL from '../config'; 

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No token found. Please log in.');
            return;
          }
  
          const response = await axios.get(`${API_URL}/chart4-data`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const technologies = response.data.technologies;
          setData(technologies);
          renderDonutChart(technologies);
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      };

    const renderDonutChart = (chartData) => {
      const width = 500;
      const height = 300;
      const radius = Math.min(width, height) / 2;

    
      const svgContainer = d3.select('#donutChartSvg');
      svgContainer.selectAll('*').remove();

      const svg = svgContainer
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const color = d3
        .scaleOrdinal()
        .domain(chartData.map((d) => d.name))
        .range(d3.schemeCategory10);

      const pie = d3.pie().value((d) => d.effectiveness);

      const arc = d3.arc().innerRadius(80).outerRadius(radius);

      
      svg
        .selectAll('path')
        .data(pie(chartData))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d) => color(d.data.name))
        .attr('stroke', '#fff')
        .style('stroke-width', '2px');

      
      svg
        .selectAll('text')
        .data(pie(chartData))
        .enter()
        .append('text')
        .attr('transform', (d) => `translate(${arc.centroid(d)})`)
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .text((d) => d.data.name);
    };

    fetchChartData();
  }, []);

  return (
    <div>
      <h2>Effectiveness of Health Technologies</h2>
      <svg id="donutChartSvg"></svg>
      <p>
        This chart represents the effectiveness of various health technologies based on collected data.
      </p>
      <p>
        The data highlights the importance of modern health technology such as EHRs, CPOE, and telemedicine in improving patient outcomes.
      </p>
    </div>
  );
};

export default Reports;
