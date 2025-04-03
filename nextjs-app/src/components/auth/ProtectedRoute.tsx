import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/');
            }
        });

        return () => unsubscribe();
    }, [router]);

    return <>{children}</>;
};

export default ProtectedRoute;