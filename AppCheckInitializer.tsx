

import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/app-check';
import { APP_CHECK_SITE_KEY } from './config.ts';

const AppCheckInitializer = () => {
  useEffect(() => {
    // App Check can only be initialized in the browser.
    if (typeof window === 'undefined') {
      return;
    }

    // Validate that the site key is present and not a placeholder.
    if (!APP_CHECK_SITE_KEY || APP_CHECK_SITE_KEY.includes('YOUR_APP_CHECK_')) {
      console.warn('Firebase App Check not initialized because site key is missing or is a placeholder in config.ts.');
      return;
    }
    
    // For development on localhost, enable the debug token.
    if (window.location.hostname === 'localhost') {
      (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      console.warn(
        'Firebase App Check debug token enabled for localhost.\\n' +
        'Remember to add the debug token from your browser console to the Firebase console settings!'
      );
    }
    
    try {
      const appCheck = firebase.appCheck();
      appCheck.activate(APP_CHECK_SITE_KEY, true);
      console.log('Firebase App Check initialized successfully.');
    } catch (error) {
      console.error('Firebase App Check initialization failed:', error);
    }
  }, []);

  return null;
};

export default AppCheckInitializer;
