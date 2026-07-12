import { useState } from "react";

export default function AllocateAssetModal({
  isOpen,
  asset,
  employees = [],
  onClose,
  onAllocate,
}) {
  const [selected, setSelected] = useState("");

  if (!isOpen || !asset) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selected) return;

    onAllocate(selected);
    setSelected("");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          width: "420px",
        }}
      >
        <h2>Allocate Asset</h2>

        <p>
          <strong>{asset.name}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "15px",
            }}
          >
            <option value="">Select Employee</option>

            {employees.map((emp) => (
              <option key={emp.id} value={emp.name}>
                {emp.name}
              </option>
            ))}
          </select>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              Allocate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}