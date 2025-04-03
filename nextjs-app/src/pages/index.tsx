import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Login from '../components/auth/Login';
import Dashboard from './dashboard';

const Home: React.FC = () => {
    const { user } = useAuth();

    return user ? <Dashboard /> : <Login />;
};

export default Home;