import React, { useState } from 'react';
import styles from './AddAssetModal.module.css';

const CONDITIONS = ['New', 'Good', 'Fair', 'Needs Repair', 'Damaged'];

export default function AddAssetModal({
  isOpen = true,
  onClose = () => {},
  onSubmit = () => {},
  categories = ['Electronics', 'Furniture', 'Vehicles', 'Office Equipment'],
  locations = ['Bengaluru HQ', 'Delhi Office', 'Mumbai Branch'],
}) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    serialNumber: '',
    acquisitionDate: '',
    acquisitionCost: '',
    condition: '',
    location: '',
    bookable: false,
    photo: null,
  });

  if (!isOpen) return null;

  const update = (field) => (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((f) => ({ ...f, photo: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Register new asset</h2>
            <p className={styles.subtitle}>Asset tag is generated automatically on save.</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <label className={styles.field}>
              <span>Asset name</span>
              <input
                type="text"
                required
                placeholder="Dell Latitude 5420"
                value={form.name}
                onChange={update('name')}
              />
            </label>

            <label className={styles.field}>
              <span>Asset tag</span>
              <input type="text" value="Auto-generated (e.g. AF-0114)" disabled />
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Category</span>
              <select required value={form.category} onChange={update('category')}>
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span>Serial number</span>
              <input
                type="text"
                required
                placeholder="SN-88213X"
                value={form.serialNumber}
                onChange={update('serialNumber')}
              />
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Acquisition date</span>
              <input
                type="date"
                required
                value={form.acquisitionDate}
                onChange={update('acquisitionDate')}
              />
            </label>

            <label className={styles.field}>
              <span>Acquisition cost</span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="₹ 65,000"
                value={form.acquisitionCost}
                onChange={update('acquisitionCost')}
              />
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Condition</span>
              <select required value={form.condition} onChange={update('condition')}>
                <option value="">Select condition</option>
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span>Location</span>
              <select required value={form.location} onChange={update('location')}>
                <option value="">Select location</option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className={styles.field}>
            <span>Photo / document</span>
            <input type="file" accept="image/*,.pdf" onChange={handlePhoto} />
          </label>

          <label className={styles.checkboxField}>
            <input type="checkbox" checked={form.bookable} onChange={update('bookable')} />
            <span>This is a shared/bookable resource (rooms, vehicles, equipment)</span>
          </label>

          <div className={styles.footer}>
            <button type="button" className={styles.secondaryBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.primaryBtn}>
              Register asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}