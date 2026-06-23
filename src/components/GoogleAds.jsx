import { useEffect } from 'react';

export const GoogleAdBanner = ({ placement = 'banner' }) => {
  useEffect(() => {
    // Push iklan Google AdSense
    if (window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.warn('Google AdSense error:', e);
      }
    }
  }, [placement]);

  return (
    <div className="google-ad-container my-6">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-3953419818034992"
        data-ad-slot="3643390207"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export const GoogleAdSidebar = () => {
  useEffect(() => {
    // Push iklan Google AdSense
    if (window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.warn('Google AdSense error:', e);
      }
    }
  }, []);

  return (
    <div className="google-ad-sidebar">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3953419818034992"
        data-ad-slot="3312217710"
        data-ad-format="vertical"
        data-full-width-responsive="true"
      />
    </div>
  );
};
