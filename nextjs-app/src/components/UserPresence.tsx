import { useEffect } from 'react';
import { auth, database, db } from '../../firebaseConfig';
import { ref, set, onDisconnect } from 'firebase/database';
import { doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function UserPresence() {
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

      const handleWindowFocus = () => setOnlineStatus();

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleWindowFocus);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('focus', handleWindowFocus);
      };
    });

    return () => unsubscribeAuth();
  }, []);

  return null;
}