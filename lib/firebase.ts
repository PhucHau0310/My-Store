// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY_FIREBASE,
    authDomain: 'my-store-5f3f0.firebaseapp.com',
    projectId: 'my-store-5f3f0',
    storageBucket: 'my-store-5f3f0.appspot.com',
    messagingSenderId: '874789931397',
    appId: '1:874789931397:web:9949dee371681109cf1cec',
    measurementId: 'G-SHEZZ8ZNME',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app);
