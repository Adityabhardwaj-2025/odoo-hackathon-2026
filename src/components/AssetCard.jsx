import React from 'react';
import StatusBadge from './StatusBadge';
import styles from './AssetCard.module.css';

export default function AssetCard({
  asset = {
    tag: 'AF-0114',
    name: 'Dell Latitude 5420',
    category: 'Electronics',
    status: 'Allocated',
    location: 'Bengaluru HQ · 3rd Floor',
    holder: 'Aditya Bhardwaj',
    imageUrl: '',
    bookable: false,
  },
  onView = () => {},
  onAllocate = () => {},
  onTransfer = () => {},
}) {
  const isAllocated = (asset.status || '').toLowerCase() === 'allocated';

  return (
    <div className={styles.card}>
      <div className={styles.thumb}>
        {asset.imageUrl ? (
          <img src={asset.imageUrl} alt={asset.name} />
        ) : (
          <span className={styles.thumbFallback}>{asset.category?.[0] || '?'}</span>
        )}
        {asset.bookable && <span className={styles.bookableFlag}>Bookable</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.tagRow}>
          <span className={styles.tag}>{asset.tag}</span>
          <StatusBadge status={asset.status} />
        </div>

        <h3 className={styles.name}>{asset.name}</h3>
        <p className={styles.meta}>{asset.category} · {asset.location}</p>

        {isAllocated && asset.holder && (
          <p className={styles.holder}>Held by <strong>{asset.holder}</strong></p>
        )}

        <div className={styles.actions}>
          <button type="button" className={styles.secondaryBtn} onClick={() => onView(asset)}>
            View details
          </button>
          {isAllocated ? (
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => onTransfer(asset)}
            >
              Request transfer
            </button>
          ) : (
            <button type="button" className={styles.primaryBtn} onClick={() => onAllocate(asset)}>
              Allocate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}