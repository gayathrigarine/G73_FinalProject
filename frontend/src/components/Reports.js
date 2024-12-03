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
      <h1>Healthcare Technologies and Their Effectiveness</h1>

<div class="section">
    <h2>1. Electronic Health Records (EHRs)</h2>
    <p><span class="effectiveness">Effectiveness:</span> 85%</p>
    <p><strong>Overview:</strong> EHRs centralize patient data, enabling healthcare providers to access comprehensive medical histories.</p>
    <p><strong>Impact:</strong> Streamlines workflows, reduces paperwork, and minimizes errors caused by manual record-keeping.</p>
    <p><strong>Challenges:</strong> Implementation costs and usability concerns for healthcare staff.</p>
</div>

<div class="section">
    <h2>2. Computerized Physician Order Entry (CPOE)</h2>
    <p><span class="effectiveness">Effectiveness:</span> 80%</p>
    <p><strong>Overview:</strong> CPOE systems allow physicians to enter medication and treatment orders directly into a digital system.</p>
    <p><strong>Impact:</strong> Reduces prescription errors and ensures faster communication between departments.</p>
    <p><strong>Challenges:</strong> Initial resistance from users and the need for seamless integration with existing systems.</p>
</div>

<div class="section">
    <h2>3. Clinical Decision Support Systems (CDSS)</h2>
    <p><span class="effectiveness">Effectiveness:</span> 75%</p>
    <p><strong>Overview:</strong> CDSS aids clinicians by providing evidence-based recommendations and alerts during diagnosis or treatment.</p>
    <p><strong>Impact:</strong> Enhances decision-making, improves patient outcomes, and supports adherence to guidelines.</p>
    <p><strong>Challenges:</strong> Over-reliance on alerts can lead to "alert fatigue," reducing system effectiveness.</p>
</div>

<div class="section">
    <h2>4. Remote Patient Monitoring (RPM)</h2>
    <p><span class="effectiveness">Effectiveness:</span> 70%</p>
    <p><strong>Overview:</strong> RPM uses wearable devices and sensors to track patient vitals and health metrics in real time.</p>
    <p><strong>Impact:</strong> Reduces hospital readmissions and enhances chronic disease management, especially for remote or underserved areas.</p>
    <p><strong>Challenges:</strong> Dependence on reliable internet connectivity and concerns about data privacy.</p>
</div>

<div class="section">
    <h2>5. Telemedicine</h2>
    <p><span class="effectiveness">Effectiveness:</span> 65%</p>
    <p><strong>Overview:</strong> Telemedicine enables remote consultations and follow-ups via video calls, chat, or other communication tools.</p>
    <p><strong>Impact:</strong> Increases access to healthcare for rural or underserved populations.</p>
    <p><strong>Challenges:</strong> Limited internet access in some regions and potential technical difficulties during consultations.</p>
</div>
    </div>
  );
};

export default Reports;
