'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function TrendLineChart({ data, title, color = '#3b82f6' }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: !!title, text: title, color: '#fff' }
    },
    scales: {
      x: { grid: { color: '#333' }, ticks: { color: '#aaa' } },
      y: { grid: { color: '#333' }, ticks: { color: '#aaa' } }
    }
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        borderColor: color,
        backgroundColor: color,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 3
      }
    ]
  };

  return <div style={{ height: '300px' }}><Line options={options} data={chartData} /></div>;
}
