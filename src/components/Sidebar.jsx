import React from 'react';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'grid', roles: ['admin', 'asset-manager', 'department-head', 'employee'] },
  { label: 'Organization Setup', path: '/organization', icon: 'building', roles: ['admin'] },
  { label: 'Assets', path: '/assets', icon: 'box', roles: ['admin', 'asset-manager', 'department-head', 'employee'] },
  { label: 'Allocations & Transfers', path: '/allocations', icon: 'swap', roles: ['admin', 'asset-manager', 'department-head'] },
  { label: 'Resource Booking', path: '/bookings', icon: 'calendar', roles: ['admin', 'asset-manager', 'department-head', 'employee'] },
  { label: 'Maintenance', path: '/maintenance', icon: 'wrench', roles: ['admin', 'asset-manager', 'department-head', 'employee'] },
  { label: 'Audits', path: '/audits', icon: 'check', roles: ['admin', 'asset-manager'] },
  { label: 'Reports & Analytics', path: '/reports', icon: 'chart', roles: ['admin', 'asset-manager', 'department-head'] },
  { label: 'Employees', path: '/employees', icon: 'users', roles: ['admin'] },
  { label: 'Notifications', path: '/notifications', icon: 'bell', roles: ['admin', 'asset-manager', 'department-head', 'employee'] },
];

const ICONS = {
  grid: 'M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z',
  building: 'M4 21V4h9v6h7v11H4zm2-2h5V6H6v13zm9 0h4v-7h-4v7zM8 8h2v2H8V8zm0 4h2v2H8v-2zm0 4h2v2H8v-2z',
  box: 'M21 8l-9-5-9 5v8l9 5 9-5V8zM12 5.2L18.5 9 12 12.8 5.5 9 12 5.2zM5 10.6l6 3.4v6.8l-6-3.4v-6.8zm8 10.2v-6.8l6-3.4v6.8l-6 3.4z',
  swap: 'M7 7h11l-3-3 1.4-1.4L21.8 7l-5.4 4.4L15 10l3-3H7V7zm10 10H6l3 3-1.4 1.4L2.2 17l5.4-4.4L9 14l-3 3h11v0z',
  calendar: 'M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm12 6v12H5V8h14z',
  wrench: 'M22 19l-7.6-7.6a5.5 5.5 0 00-7-7L11 8 8 11 4.4 7.4a5.5 5.5 0 007 7L19 22l3-3z',
  check: 'M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z',
  chart: 'M4 20V10h3v10H4zm7 0V4h3v16h-3zm7 0v-7h3v7h-3z',
  users: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h9.5v-2.5c0-.9.31-2.6 2.13-3.9A11.5 11.5 0 008 13zm8 0c-.29 0-.62.02-.97.05 1.72 1.28 2.47 3 2.47 3.95V19H23v-2.5c0-2.33-4.67-3.5-7-3.5z',
  bell: 'M12 22a2.5 2.5 0 002.45-2h-4.9A2.5 2.5 0 0012 22zm7-6v-5a7 7 0 10-14 0v5l-2 2v1h18v-1l-2-2z',
};

export default function Sidebar({ activePath = '/dashboard', onNavigate = () => {}, role = 'admin' }) {
  const items = NAV_ITEMS.filter((item) => item.roles.includes(role));

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoTag}>AF</span>
        <span className={styles.logoText}>AssetFlow</span>
      </div>

      <nav className={styles.nav}>
        {items.map((item) => {
          const isActive = item.path === activePath;
          return (
            <button
              key={item.path}
              type="button"
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              onClick={() => onNavigate(item.path)}
            >
              <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
                <path d={ICONS[item.icon]} fill="currentColor" />
              </svg>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.footerCard}>
          <p className={styles.footerTitle}>Need help?</p>
          <p className={styles.footerText}>Check the setup guide or contact your admin.</p>
        </div>
      </div>
    </aside>
  );
}