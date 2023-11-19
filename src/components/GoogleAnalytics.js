import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA4 from 'react-ga4';

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA4.initialize('G-SG9TGY3VR8');
  }, []);

  useEffect(() => {
    // Send pageview event on route change
    ReactGA4.send('pageview');
  }, [location.pathname]);

  return null;
};



export default GoogleAnalytics;
