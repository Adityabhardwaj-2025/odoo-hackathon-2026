import { useState } from "react";

export default function TransferAssetModal({
  isOpen,
  asset,
  employees = [],
  onClose,
  onTransfer,
}) {
  const [selected, setSelected] = useState("");

  if (!isOpen || !asset) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selected) return;

    onTransfer(selected);
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
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          width: "420px",
          boxShadow: "0 10px 30px rgba(0,0,0,.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Transfer Asset
        </h2>

        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {asset.name}
        </h3>

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            marginBottom: "25px",
          }}
        >
          <option value="">Select New Employee</option>

          {employees.map((employee) => (
            <option key={employee} value={employee}>
              {employee}
            </option>
          ))}
        </select>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button type="submit">
            Transfer
          </button>
        </div>
      </form>
    </div>
  );
}