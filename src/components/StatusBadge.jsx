import React from 'react';
import styles from './StatusBadge.module.css';


const STATUS_MAP = {
  available: 'available',
  active: 'available',
  allocated: 'allocated',
  reserved: 'reserved',
  'under maintenance': 'maintenance',
  maintenance: 'maintenance',
  lost: 'lost',
  retired: 'retired',
  disposed: 'disposed',
  inactive: 'retired',
};

export default function StatusBadge({ status }) {
  const key = STATUS_MAP[(status || '').toLowerCase()] || 'retired';
  return (
    <span className={`${styles.badge} ${styles[key]}`}>
      <span className={styles.dot} />
      {status}
    </span>
  );
}