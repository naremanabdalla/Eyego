import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.css';
import { useAuth } from '../hooks/useAuth';
import { db } from '../../firebaseConfig';
import { useEffect } from 'react';
import UserPresence from '../components/UserPresence';


function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        console.log('Firestore initialized:', db);
      }, []);
    return (
        <Provider store={store}>
              <UserPresence />
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;