import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  List,
  message,
  Spin,
  Typography,
  Select,
  Tabs,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Customer.css"; // Impor file CSS
import History from "../History/History";

function Customer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [sortOrder, setSortOrder] = useState("az");
  const [activeTab, setActiveTab] = useState("quota");

  // Mengambil data paket internet dari server
  useEffect(() => {
    if (activeTab === "quota" || activeTab === "wifi") {
      setLoading(true);
      axios
        .get("http://localhost:3001/customers")
        .then((response) => {
          setPackages(response.data);
          setLoading(false);
        })
        .catch(() => {
          message.error("Gagal memuat paket.");
          setLoading(false);
        });
    }
  }, [activeTab]);

  // Fungsi untuk mendapatkan daftar paket yang telah diurutkan
  const getSortedItems = () => {
    const filteredItems = packages.filter((pkg) => pkg.category === activeTab);
    const sortedItems = [...filteredItems];
    sortedItems.sort((a, b) => {
      const aLowerCaseName = a.name.toLowerCase();
      const bLowerCaseName = b.name.toLowerCase();

      if (sortOrder === "az") {
        return aLowerCaseName > bLowerCaseName
          ? 1
          : aLowerCaseName === bLowerCaseName
          ? 0
          : -1;
      } else if (sortOrder === "za") {
        return aLowerCaseName < bLowerCaseName
          ? 1
          : aLowerCaseName === bLowerCaseName
          ? 0
          : -1;
      } else if (sortOrder === "lowHigh") {
        return a.price - b.price;
      } else if (sortOrder === "highLow") {
        return b.price - a.price;
      }
      return 0;
    });
    return sortedItems;
  };

  // Fungsi untuk menangani pembelian paket
  const handleBuyPackage = (pkg) => {
    // Navigasi ke halaman transaksi dengan membawa data paket yang dipilih
    navigate("/transaction", { state: { selectedPackage: pkg } });
  };

  // Fungsi untuk logout
  const handleLogout = () => {
    // Menghapus status login dari localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    // Arahkan pengguna kembali ke halaman login
    navigate("/");
  };

  return (
    <div className="customer-container">
      {/* Tombol Logout */}
      <Button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1,
          backgroundColor: "#f5222d", // Warna merah
          color: "white", // Teks berwarna putih
          border: "none", // Menghilangkan border default
          borderRadius: "5px", // Menambahkan border radius agar lebih estetis
        }}
      >
        Logout
      </Button>

      <Typography.Title level={3} className="customer-title">
        Paket Internet
      </Typography.Title>

      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        style={{ marginBottom: "30px" }}
      >
        {/* Tab Kuota Internet */}
        <Tabs.TabPane tab="Kuota Internet" key="quota">
          <div className="sort-section">
            <Typography.Text>Urut Berdasarkan: </Typography.Text>
            <Select
              onChange={(value) => setSortOrder(value)}
              defaultValue={"az"}
              style={{ width: 200 }}
              options={[
                { label: "Abjad a-z", value: "az" },
                { label: "Abjad z-a", value: "za" },
                { label: "Harga Terendah ke Tertinggi", value: "lowHigh" },
                { label: "Harga Tertinggi ke Terendah", value: "highLow" },
              ]}
            />
          </div>

          <Spin spinning={loading}>
            <List
              grid={{ column: 3, gutter: 24 }}
              dataSource={getSortedItems()}
              renderItem={(pkg) => (
                <List.Item>
                  <Card hoverable size="small" className="package-card">
                    {/* Label Keterangan Paket */}
                    <div className="package-category-label quota">
                      Kuota Internet
                    </div>

                    <Typography.Title level={5} className="package-title">
                      {pkg.name}
                    </Typography.Title>
                    <Typography.Text strong className="package-price">
                      Rp {pkg.price.toLocaleString()}
                    </Typography.Text>

                    <Typography.Paragraph
                      ellipsis={{ rows: 2 }}
                      className="package-description"
                    >
                      {pkg.description}
                    </Typography.Paragraph>
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => handleBuyPackage(pkg)}
                      block
                      className="buy-button"
                    >
                      Beli Paket
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </Spin>
        </Tabs.TabPane>

        {/* Tab Paket WiFi */}
        <Tabs.TabPane tab="Paket WiFi" key="wifi">
          <Spin spinning={loading}>
            <List
              grid={{ column: 3, gutter: 24 }}
              dataSource={getSortedItems()}
              renderItem={(pkg) => (
                <List.Item>
                  <Card hoverable size="small" className="package-card">
                    {/* Label Keterangan Paket */}
                    <div className="package-category-label wifi">
                      Paket WiFi
                    </div>

                    <Typography.Title level={5} className="package-title">
                      {pkg.name}
                    </Typography.Title>
                    <Typography.Text strong className="package-price">
                      Rp {pkg.price.toLocaleString()}
                    </Typography.Text>

                    <Typography.Paragraph
                      ellipsis={{ rows: 2 }}
                      className="package-description"
                    >
                      {pkg.description}
                    </Typography.Paragraph>
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => handleBuyPackage(pkg)}
                      block
                      className="buy-button"
                    >
                      Beli Paket
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </Spin>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Riwayat Pembelian" key="history">
          <History />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Customer;
