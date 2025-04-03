import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { ref, onValue, set, onDisconnect } from 'firebase/database';
import { db, database, auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { AnalyticsCards, AnalyticsChart } from '../components/dashboard/AnalyticsChart';
import DataTable from '../components/ui/DataTable';

interface User {
  id: string;
  uid: string;
  name: string;
  email: string;
  status: 'online' | 'offline';
  lastActive: string | null;
  lastChanged?: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'users'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          uid: doc.data().uid || doc.id,
          name: doc.data().name || '',
          email: doc.data().email || '',
          status: doc.data().status || 'offline',
          lastActive: doc.data().lastChanged || null,
          lastChanged: doc.data().lastChanged || null
        }));
        setUserData(data);

        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDoc = querySnapshot.docs.find(doc => doc.id === currentUser.uid);
          if (userDoc) {
            setUsername(userDoc.data().name || 'User');
          }
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const statusRef = ref(database, 'status');
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const onlineStatuses = snapshot.val() || {};
      setUserData(prevData => 
        prevData.map(user => {
          const userStatus = onlineStatuses[user.uid];
          const isOnline = userStatus?.online || false;
          const newStatus = isOnline ? 'online' : 'offline';
          const lastChanged = userStatus?.lastChanged || user.lastActive;

          if (user.status !== newStatus) {
            updateDoc(doc(db, 'users', user.id), { 
              status: newStatus,
              lastChanged: lastChanged
            }).catch(err => console.error(`Firestore update error:`, err));
          }

          return { 
            ...user, 
            status: newStatus,
            lastActive: lastChanged
          };
        })
      );
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const userStatusRef = ref(database, `status/${user.uid}`);
      const isOfflineForDatabase = {
        online: false,
        lastChanged: new Date().toISOString(),
      };

      const setOnlineStatus = async () => {
        await set(userStatusRef, { 
          online: true,
          lastChanged: new Date().toISOString() 
        });
        
        onDisconnect(userStatusRef)
          .update(isOfflineForDatabase)
          .catch((error) => {
            console.error('Error setting disconnect handler:', error);
          });

        await updateDoc(doc(db, 'users', user.uid), {
          status: 'online',
          lastChanged: new Date().toISOString()
        });
      };

      setOnlineStatus();

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          setOnlineStatus();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    });

    return () => unsubscribeAuth();
  }, []);

  const tableColumns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { 
      Header: 'Status', 
      accessor: 'status',
      Cell: ({ value }: { value: string }) => (
        <div className="flex items-center">
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
            value === 'online' ? 'bg-green-500' : 'bg-gray-400'
          }`}></span>
          {value}
        </div>
      )
    },
    {
      Header: 'Last Active',
      accessor: 'lastActive',
      Cell: ({ value }: { value: string }) => (
        <span>{value ? new Date(value).toLocaleString() : 'Never'}</span>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold">
            Hello, {username || 'User'}! 👋
          </h1>
          <p className="text-sm mt-2">
            Welcome back to your dashboard. Here's an overview of your activity.
          </p>
        </div>

        {!loading && !error && <AnalyticsCards userData={userData} />}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            {!loading && !error && <AnalyticsChart userData={userData} />}
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            {loading ? (
              <p>Loading user data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <DataTable 
                data={userData} 
                columns={tableColumns} 
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}