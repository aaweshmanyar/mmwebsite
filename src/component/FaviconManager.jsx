// src/component/FaviconManager.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { changeFavicon } from '../utils/changeFavicon';
import minaramasjid from '../../public/images/minara-masjid.png'


const FaviconManager = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === '/') {
      changeFavicon('minaramasjid.png');
    } else {
      changeFavicon('/favicon.ico');
    }
  }, [location.pathname]);

  return null; // no UI
};

export default FaviconManager;
