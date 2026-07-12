import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StatusBadge from './StatusBadge';
import styles from './DashboardPage.module.css';

const DEFAULT_KPIS = [
  { label: 'Assets Available', value: 128, tone: 'available' },
  { label: 'Assets Allocated', value: 94, tone: 'allocated' },
  { label: 'Maintenance Today', value: 6, tone: 'maintenance' },
  { label: 'Active Bookings', value: 17, tone: 'reserved' },
  { label: 'Pending Transfers', value: 4, tone: 'allocated' },
  { label: 'Upcoming Returns', value: 9, tone: 'available' },
];

const DEFAULT_OVERDUE = [
  { id: 1, assetName: 'Dell Latitude 5420', assetTag: 'AF-0114', type: 'Return', dueDate: '2026-07-08', owner: 'Aditya Bhardwaj' },
  { id: 2, assetName: 'Conference Room B2', assetTag: 'AF-0230', type: 'Booking', dueDate: '2026-07-10', owner: 'Tamanna Sharma' },
  { id: 3, assetName: 'Projector – EPX210', assetTag: 'AF-0071', type: 'Maintenance', dueDate: '2026-07-09', owner: 'Tarun Kumar' },
];

export default function DashboardPage({
  user = { name: 'Aditya Bhardwaj', role: 'Asset Manager' },
  kpis = DEFAULT_KPIS,
  overdue = DEFAULT_OVERDUE,
  onQuickAction = () => {},
  onNavigate = () => {},
}) {
  return (
    <div className={styles.shell}>
      <Sidebar activePath="/dashboard" onNavigate={onNavigate} />

      <div className={styles.main}>
        <Navbar user={user} title="Dashboard" notificationCount={overdue.length} />

        <div className={styles.content}>
          <div className={styles.kpiGrid}>
            {kpis.map((kpi) => (
              <div key={kpi.label} className={styles.kpiCard}>
                <span className={`${styles.kpiDot} ${styles[kpi.tone] || ''}`} />
                <p className={styles.kpiValue}>{kpi.value}</p>
                <p className={styles.kpiLabel}>{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className={styles.quickActions}>
            <button
              type="button"
              className={styles.actionBtn}
              onClick={() => onQuickAction('register-asset')}
            >
              + Register Asset
            </button>
            <button
              type="button"
              className={styles.actionBtnSecondary}
              onClick={() => onQuickAction('book-resource')}
            >
              + Book Resource
            </button>
            <button
              type="button"
              className={styles.actionBtnSecondary}
              onClick={() => onQuickAction('raise-maintenance')}
            >
              + Raise Maintenance Request
            </button>
          </div>

          <div className={styles.overdueSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Overdue &amp; upcoming</h2>
              <span className={styles.overdueCount}>{overdue.length} need attention</span>
            </div>

            <div className={styles.overdueList}>
              {overdue.map((item) => (
                <div key={item.id} className={styles.overdueRow}>
                  <div className={styles.overdueInfo}>
                    <span className={styles.overdueTag}>{item.assetTag}</span>
                    <div>
                      <p className={styles.overdueName}>{item.assetName}</p>
                      <p className={styles.overdueMeta}>
                        {item.type} · {item.owner}
                      </p>
                    </div>
                  </div>
                  <div className={styles.overdueRight}>
                    <StatusBadge status="Lost" />
                    <span className={styles.overdueDate}>Due {item.dueDate}</span>
                  </div>
                </div>
              ))}

              {overdue.length === 0 && (
                <p className={styles.emptyState}>Nothing overdue — good shape.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}