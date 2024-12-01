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

      <p>
        This chart displays data fetched from the backend API. It represents the values for the months of January, February, and March.
      </p>
      <p>
        Remote Monitoring Technologies: Wearable devices and mobile health applications enable continuous monitoring of vital signs and chronic conditions, facilitating proactive management and early detection of potential health issues.
        Reference: <a href="https://time.com/7021731/health-care-technology-patient-safety/" target="_blank" rel="noopener noreferrer">https://time.com/7021731/health-care-technology-patient-safety/</a>
      </p>
      <p>
        <strong>Technical Aspects:</strong> This project uses a decoupled architecture with a React frontend and a Node.js backend. The backend serves a RESTful API for user authentication and data. JWT is used for secure session management. The frontend is a Single Page Application (SPA) implemented with React Router for navigation. Docker is used for containerization, and CORS ensures secure communication between services.
      </p>
      <div>
        <h3>Donut Chart</h3>
        <svg id="donutChartSvg"></svg>
      </div>
    </div>
  );
};

export default Summary;
