import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import styles from './EmployeeTable.module.css';

const ROLES = ['Employee', 'Department Head', 'Asset Manager', 'Admin'];

const SAMPLE = [
  { id: 1, name: 'Priya Sharma', email: 'priya.sharma@company.com', department: 'IT', role: 'Asset Manager', status: 'Active' },
  { id: 2, name: 'Raj Mehta', email: 'raj.mehta@company.com', department: 'Facilities', role: 'Employee', status: 'Active' },
  { id: 3, name: 'Anita Desai', email: 'anita.desai@company.com', department: 'HR', role: 'Department Head', status: 'Active' },
  { id: 4, name: 'Karan Verma', email: 'karan.verma@company.com', department: 'Finance', role: 'Employee', status: 'Inactive' },
];

export default function EmployeeTable({
  employees = SAMPLE,
  onPromote = () => {},
  onToggleStatus = () => {},
  onRowClick = () => {},
}) {
  const [query, setQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  const filtered = employees.filter((e) =>
    `${e.name} ${e.email} ${e.department}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <h3 className={styles.heading}>Employee directory</h3>
        <input
          type="text"
          className={styles.search}
          placeholder="Search by name, email, department…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp) => (
              <tr key={emp.id} onClick={() => onRowClick(emp)} className={styles.row}>
                <td>
                  <div className={styles.nameCell}>
                    <span className={styles.avatar}>
                      {emp.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                    {emp.name}
                  </div>
                </td>
                <td className={styles.muted}>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <span className={styles.rolePill}>{emp.role}</span>
                </td>
                <td>
                  <StatusBadge status={emp.status} />
                </td>
                <td
                  className={styles.actionsCell}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={styles.menuBtn}
                    onClick={() => setOpenMenuId(openMenuId === emp.id ? null : emp.id)}
                    aria-label="Row actions"
                  >
                    ⋮
                  </button>
                  {openMenuId === emp.id && (
                    <div className={styles.menu}>
                      <p className={styles.menuLabel}>Promote to</p>
                      {ROLES.filter((r) => r !== emp.role).map((r) => (
                        <button
                          key={r}
                          type="button"
                          className={styles.menuItem}
                          onClick={() => {
                            onPromote({ ...emp, role: r });
                            setOpenMenuId(null);
                          }}
                        >
                          {r}
                        </button>
                      ))}
                      <div className={styles.menuDivider} />
                      <button
                        type="button"
                        className={styles.menuItem}
                        onClick={() => {
                          onToggleStatus(emp);
                          setOpenMenuId(null);
                        }}
                      >
                        {emp.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  No employees match "{query}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}