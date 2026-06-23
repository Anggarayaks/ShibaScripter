import { Icon } from '../utils/icons';
import { useEffect } from 'react';

export const MonetagBanner = ({ placement = 'banner' }) => {
  useEffect(() => {
    // Trigger Monetag script untuk memproses iklan
    if (window.mntag && window.mntag.showads) {
      window.mntag.showads();
    } else if (window.mntag) {
      window.mntag.mount();
    }
  }, [placement]);

  return (
    <div className="monetag-ad-container">
      <div className="ads-label">📢 Iklan Bersponsor Monetag</div>
      <div
        id={`monetag-ad-${placement}`}
        className="monetag-ad"
        data-placement={placement}
        style={{ minHeight: '250px', width: '100%' }}
      />
    </div>
  );
};

export const MonetagSidebar = () => {
  useEffect(() => {
    // Trigger Monetag script untuk memproses iklan
    if (window.mntag && window.mntag.showads) {
      window.mntag.showads();
    } else if (window.mntag) {
      window.mntag.mount();
    }
  }, []);

  return (
    <div className="bg-[#161B22] border border-[#30363D] p-4 rounded-lg">
      <div className="ads-label">📢 Iklan Samping</div>
      <div
        id="monetag-ad-sidebar"
        className="monetag-ad"
        data-placement="sidebar"
        style={{ height: '300px', width: '100%' }}
      />
    </div>
  );
};
