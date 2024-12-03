import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to G73 dashboard!</p>
      <p>Summary
The U.S. healthcare system faces mounting challenges, including preventable harm, patient burnout, and provider fatigue.
A recent study shows that 25% of hospitalized patients experience preventable harm, emphasizing the need for improvement. 
Innovative technologies, such as AI and machine learning, promise better patient outcomes. 
Startups like Elythea are using machine-learning algorithms to identify high-risk pregnancies early, potentially reducing maternal mortality. 
However, adoption barriers persist due to complex healthcare infrastructure.
Patient burnout is another concern, driven by long wait times, brief consultations, and high medical costs. 
The pandemic exacerbated these issues, straining both patients and healthcare professionals. Burnout among providers negatively impacts care quality, creating a cycle of dissatisfaction. 
Solutions include AI-powered hospital command centers, which aggregate real-time data for decision-making, enhancing efficiency and care quality. 
Addressing these issues requires systemic reforms, transparent billing, and improved scheduling processes.
</p>
<p>For deeper insights, refer to these sources:
<ul>
<li>How Healthcare Technology Can Improve Patient Safety :https://time.com/7021731/health-care-technology-patient-safety/
</li>
<li>Patient Burnout and Challenges in Healthcare :https://time.com/6257775/patient-burnout-health-care/
</li>
</ul>
</p>
<p>
Technical Aspects
This project integrates technologies like Python Flask for backend development, React for frontend interfaces, and SQL databases for data management.
AI algorithms are built using TensorFlow, deployed via Dockerized microservices for scalability.
The infrastructure leverages AWS for cloud computing and real-time data processing, ensuring robust and efficient operation.</p> </div>
  );
};

export default Dashboard;
