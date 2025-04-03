import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const DashboardPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore();
                const usersCollection = collection(db, 'users');
                const snapshot = await getDocs(usersCollection);
                const users = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(users);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {data.length > 0 ? (
                        <DataTable data={data} columns={['name', 'email', 'role', 'lastLogin']} />
                    ) : (
                        <p>No data available</p>
                    )}
                    <AnalyticsChart />
                </>
            )}
        </DashboardLayout>
    );
};

export default DashboardPage;
