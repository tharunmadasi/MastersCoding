import React from 'react';
import { PieChart, Pie ,BarChart, Bar, CartesianGrid, XAxis, YAxis} from 'recharts';
import './BatchReport.css';
 
 
function BatchReport() {
 
    // Sample data
    const data = [
        { name: 'Geeksforgeeks', students: 400 },
        { name: 'Technical scripter', students: 700 },
        { name: 'Geek-i-knack', students: 200 },
        { name: 'Geek-o-mania', students: 1000 }
    ];
 
 
    return (
        <div className='charts'>
        <PieChart width={400} height={400}>
            <Pie data={data} dataKey="students" outerRadius={200} fill="deepskyblue" />
        </PieChart>
        <BarChart width={600} height={300} data={data}>
            <Bar dataKey="students" fill="chartreuse" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </BarChart>
        </div>
    );
}
 
export default BatchReport