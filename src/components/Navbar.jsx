import React, { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({
  user = { name: 'Aditya Bhardwaj ', role: 'Asset Manager' },
  notificationCount = 0,
  onSearch = () => {},
  onLogout = () => {},
  onOpenNotifications = () => {},
  title = 'Dashboard',
}) {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const submitSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.center}>
        <form className={styles.searchForm} onSubmit={submitSearch}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1114 9.5 4.5 4.5 0 019.5 14z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search assets, tags, employees…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div className={styles.right}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onOpenNotifications}
          aria-label="Notifications"
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M12 22a2.5 2.5 0 002.45-2h-4.9A2.5 2.5 0 0012 22zm7-6v-5a7 7 0 10-14 0v5l-2 2v1h18v-1l-2-2z"
            />
          </svg>
          {notificationCount > 0 && (
            <span className={styles.badge}>{notificationCount > 9 ? '9+' : notificationCount}</span>
          )}
        </button>

        <div className={styles.profile}>
          <button
            type="button"
            className={styles.profileBtn}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={styles.avatar}>{initials}</span>
            <span className={styles.profileText}>
              <span className={styles.profileName}>{user.name}</span>
              <span className={styles.profileRole}>{user.role}</span>
            </span>
          </button>

          {menuOpen && (
            <div className={styles.menu}>
              <button type="button" className={styles.menuItem}>
                My profile
              </button>
              <button type="button" className={styles.menuItem} onClick={onLogout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}