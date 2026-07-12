import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AssetCard from "./AssetCard";
import AddAssetModal from "./AddAssetModal";
import AllocateAssetModal from "./AllocateAssetModal";
import styles from "./DashboardPage.module.css";
import TransferAssetModal from "./TransferAssetModal";
import AssetDetailsModal from "./AssetDetailsModal";

export default function AssetsPage({
  onNavigate = () => {},
}) {
  const [showModal, setShowModal] = useState(false);
  const [allocateModal, setAllocateModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
const [showDetailsModal, setShowDetailsModal] = useState(false);

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

  const employees = [
    { id: 1, name: "Tamanna  Sharma" },
    { id: 2, name: "Varun Yadav" },
    { id: 3, name: "Tarun Kumar" },
    { id: 4, name: "Karan Verma" },
  ];

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
  const transferAsset = (employee) => {
  setAssets((prev) =>
    prev.map((asset) =>
      asset.tag === selectedAsset.tag
        ? {
            ...asset,
            holder: employee,
            status: "Allocated",
          }
        : asset
    )
  );

  setShowTransferModal(false);
  setSelectedAsset(null);
};

  const allocateAsset = (employeeName) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.tag === selectedAsset.tag
          ? {
              ...asset,
              status: "Allocated",
              holder: employeeName,
            }
          : asset
      )
    );

    setAllocateModal(false);
    setSelectedAsset(null);
  };

  return (
    <div className={styles.shell}>
      <Sidebar
        activePath="/assets"
        onNavigate={onNavigate}
      />

      <div className={styles.main}>
        <Navbar title="Assets" />

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
    onView={(asset) => {
        setSelectedAsset(asset);
        setShowDetailsModal(true);
    }}
    onAllocate={(asset) => {
        setSelectedAsset(asset);
        setAllocateModal(true);
    }}
    onTransfer={(asset) => {
        setSelectedAsset(asset);
        setShowTransferModal(true);
    }}
/>

            ))
              }
          </div>
        </div>
      </div>

      <AddAssetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={addAsset}
      />
      <TransferAssetModal
  isOpen={showTransferModal}
  asset={selectedAsset}
  employees={[
    "Aditya Bhardwaj",
    "Tamanna Sharma",
    "Varun Yadav",
    "Tarun Kumar",
  ]}
  onClose={() => {
    setShowTransferModal(false);
    setSelectedAsset(null);
  }}
  onTransfer={transferAsset}
/>

      <AllocateAssetModal
        isOpen={allocateModal}
        asset={selectedAsset}
        employees={employees}
        onClose={() => setAllocateModal(false)}
        onAllocate={allocateAsset}
      />
      <AssetDetailsModal
    isOpen={showDetailsModal}
    asset={selectedAsset}
    onClose={() => {
        setShowDetailsModal(false);
        setSelectedAsset(null);
    }}
/>
    </div>
    
  );
}