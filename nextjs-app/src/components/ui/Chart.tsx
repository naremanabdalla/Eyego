import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface User {
  id: string;
  name: string;
  email: string;
  status?: string;
}

interface ChartProps {
  userData: User[];
}

const Chart: React.FC<ChartProps> = ({ userData }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this component only renders on the client
  }, []);

  if (!isClient) {
    return null; // Avoid rendering on the server
  }

  const activeUsers = userData.filter(user => user.status === 'active').length;
  const inactiveUsers = userData.length - activeUsers;

  const data = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        label: '# of Users',
        data: [activeUsers, inactiveUsers],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">User Status Distribution</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default Chart;