import React from "react";

export default function AssetDetailsModal({
  isOpen,
  asset,
  onClose,
}) {
  if (!isOpen || !asset) return null;

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
      <div
        style={{
          background: "#fff",
          width: 500,
          maxWidth: "90%",
          borderRadius: 12,
          padding: 24,
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Asset Details</h2>

        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td><b>Asset Tag</b></td>
              <td>{asset.tag}</td>
            </tr>

            <tr>
              <td><b>Name</b></td>
              <td>{asset.name}</td>
            </tr>

            <tr>
              <td><b>Category</b></td>
              <td>{asset.category}</td>
            </tr>

            <tr>
              <td><b>Status</b></td>
              <td>{asset.status}</td>
            </tr>

            <tr>
              <td><b>Location</b></td>
              <td>{asset.location}</td>
            </tr>

            <tr>
              <td><b>Holder</b></td>
              <td>{asset.holder || "Not Allocated"}</td>
            </tr>

            <tr>
              <td><b>Bookable</b></td>
              <td>{asset.bookable ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>

        <div
          style={{
            marginTop: 25,
            textAlign: "right",
          }}
        >
          <button onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}