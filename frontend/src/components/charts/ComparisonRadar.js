'use client';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function ComparisonRadar({ labels, teamA, teamB, colorA, colorB }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: teamA.name,
        data: teamA.data,
        backgroundColor: `${colorA}33`,
        borderColor: colorA,
        borderWidth: 2,
      },
      {
        label: teamB.name,
        data: teamB.data,
        backgroundColor: `${colorB}33`,
        borderColor: colorB,
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: '#333' },
        grid: { color: '#333' },
        pointLabels: { color: '#aaa' },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: { labels: { color: '#fff' } }
    }
  };

  return <div style={{ height: '300px' }}><Radar data={data} options={options} /></div>;
}
