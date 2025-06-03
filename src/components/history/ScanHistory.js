import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ScanHistory = ({ scans }) => {
  const chartData = {
    labels: scans.map(scan => new Date(scan.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Confidence Level',
        data: scans.map(scan => scan.confidence * 100),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Scan History'
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Scan History</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Recent Scans</h3>
        <div className="space-y-2">
          {scans.slice(0, 5).map(scan => (
            <div key={scan.id} className="bg-gray-50 p-3 rounded">
              <p className="font-medium">{scan.classification}</p>
              <p className="text-sm text-gray-600">
                {(scan.confidence * 100).toFixed(2)}% confidence
              </p>
              <p className="text-xs text-gray-500">
                {new Date(scan.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanHistory; 