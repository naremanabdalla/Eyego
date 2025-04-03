import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'offline';
  lastActive?: string;
}

interface AnalyticsCardsProps {
  userData: User[];
}

export const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ userData }) => {
  const totalUsers = userData.length;
  const onlineUsers = userData.filter(user => user.status === 'online').length;
  const offlineUsers = totalUsers - onlineUsers;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-blue-500 text-white p-4 rounded shadow">
        <h2 className="text-lg font-bold">Total Users</h2>
        <p className="text-2xl">{totalUsers}</p>
      </div>
      <div className="bg-green-500 text-white p-4 rounded shadow">
        <h2 className="text-lg font-bold">Online Users</h2>
        <p className="text-2xl">{onlineUsers}</p>
      </div>
      <div className="bg-red-500 text-white p-4 rounded shadow">
        <h2 className="text-lg font-bold">Offline Users</h2>
        <p className="text-2xl">{offlineUsers}</p>
      </div>
    </div>
  );
};

interface ChartData {
  name: string;
  online: number;
  offline: number;
}

export const AnalyticsChart: React.FC<{ userData: User[] }> = ({ userData }) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('bar');
  
  const chartData = [
    {
      name: 'User Status',
      online: userData.filter(user => user.status === 'online').length,
      offline: userData.filter(user => user.status === 'offline').length
    }
  ];

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">User Status Analytics</h2>
        <button
          onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          {chartType === 'line' ? 'Show Bar Chart' : 'Show Line Chart'}
        </button>
      </div>
      
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="online" 
                name="Online Users"
                stroke="#4ade80" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#4ade80', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="offline" 
                name="Offline Users"
                stroke="#f87171" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#f87171', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Bar 
                dataKey="online" 
                name="Online Users"
                fill="#4ade80" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar 
                dataKey="offline" 
                name="Offline Users"
                fill="#f87171" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};