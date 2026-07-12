import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AssetCard from "./AssetCard";
import AddAssetModal from "./AddAssetModal";
import styles from "./DashboardPage.module.css";

export default function AssetsPage({
  onNavigate = () => {},
}) {
  const [showModal, setShowModal] = useState(false);

  const [assets, setAssets] = useState([
    {
      tag: "AF-0001",
      name: "Dell Latitude 5420",
      category: "Electronics",
      status: "Available",
      location: "Bengaluru HQ",
      holder: "",
      imageUrl: "",
      bookable: false,
    },
    {
      tag: "AF-0002",
      name: "Conference Room A",
      category: "Room",
      status: "Allocated",
      location: "Delhi Office",
      holder: "Aditya",
      imageUrl: "",
      bookable: true,
    },
  ]);

  const addAsset = (asset) => {
    setAssets((prev) => [
      ...prev,
      {
        ...asset,
        tag: `AF-${String(prev.length + 1).padStart(4, "0")}`,
        status: "Available",
      },
    ]);

    setShowModal(false);
  };

  return (
    <div className={styles.shell}>
      <Sidebar
        activePath="/assets"
        onNavigate={onNavigate}
      />

      <div className={styles.main}>
        <Navbar
          title="Assets"
        />

        <div className={styles.content}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => setShowModal(true)}
          >
            + Register Asset
          </button>

          <div className={styles.kpiGrid}>
            {assets.map((asset) => (
              <AssetCard
                key={asset.tag}
                asset={asset}
              />
            ))}
          </div>
        </div>
      </div>

      <AddAssetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={addAsset}
      />
    </div>
  );
}