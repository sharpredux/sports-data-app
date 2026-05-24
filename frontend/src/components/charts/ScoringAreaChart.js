'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function ScoringAreaChart({ labels, scored, allowed }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#fff' } }
    },
    scales: {
      x: { grid: { color: '#333' }, ticks: { color: '#aaa' } },
      y: { grid: { color: '#333' }, ticks: { color: '#aaa' } }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Scored',
        data: scored,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.3
      },
      {
        fill: true,
        label: 'Allowed',
        data: allowed,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.3
      }
    ]
  };

  return <div style={{ height: '300px' }}><Line options={options} data={data} /></div>;
}
