import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

initializeApp({
  apiKey: 'AIzaSyCBe1aMcQzZEsASF-588VaYuub90uIzNPU',
  authDomain: 'fir-auth-3e082.firebaseapp.com',
  projectId: 'fir-auth-3e082',
  storageBucket: 'fir-auth-3e082.appspot.com',
  messagingSenderId: '749021592402',
  appId: '1:749021592402:web:ccb2c6f713ed5b0808d88b',
  measurementId: 'G-1C7DJPNCW7',
});

if (import.meta.env.DEV)
  connectAuthEmulator(getAuth(), 'http://localhost:9099', { disableWarnings: true });
