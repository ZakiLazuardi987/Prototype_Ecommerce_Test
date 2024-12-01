import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Input,
  Select,
  Button,
  Form,
  message,
  Card,
  Row,
  Col,
} from "antd";
import axios from "axios";
import "./Transaction.css";

function Transactions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPackage } = location.state || {};
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bankTransfer");

  const handleSubmit = () => {
    if (!customerName || !customerEmail) {
      message.error("Mohon lengkapi semua kolom.");
      return;
    }

    const newTransaction = {
      package: selectedPackage.name,
      price: selectedPackage.price,
      customerName,
      customerEmail,
      paymentMethod,
      paymentDate: new Date().toISOString().split("T")[0],
    };

    axios
      .post("http://localhost:3000/transactions", newTransaction)
      .then(() => {
        message.success(`${selectedPackage.name} berhasil dibeli!`);
        setCustomerName("");
        setCustomerEmail("");
        setPaymentMethod("bankTransfer");

        setTimeout(() => {
          navigate("/customer");
        }, 2000);
      })
      .catch((error) => {
        message.error("Gagal memproses transaksi.");
        console.error(error);
      });
  };

  const handleBack = () => {
    navigate("/customer");
  };

  const handleLogout = () => {
    // Menghapus status login dari localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    // Arahkan pengguna kembali ke halaman login
    navigate("/");
  };

  return (
    <div className="transaction-container">
      {/* Tombol Logout */}
      <Button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1,
          backgroundColor: "#f5222d",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Logout
      </Button>
      
      <Typography.Title level={2} className="title">
        Konfirmasi Pembelian Anda
      </Typography.Title>
      <Row gutter={[24, 24]} justify="center">
        {/* Detail Paket */}
        <Col xs={24} md={12}>
          <Card className="package-card">
            <Typography.Title level={3} className="package-name">
              {selectedPackage.name}
            </Typography.Title>
            <Typography.Text strong className="package-price">
              Rp {selectedPackage.price.toLocaleString()}
            </Typography.Text>
            <Typography.Paragraph className="package-description">
              {selectedPackage.description}
            </Typography.Paragraph>
          </Card>
        </Col>
        {/* Form Transaksi */}
        <Col xs={24} md={12}>
          <Card className="form-card">
            <Form layout="vertical">
              <Form.Item label="Nama Pelanggan" required>
                <Input
                  placeholder="Masukkan nama Anda"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="form-input"
                />
              </Form.Item>
              <Form.Item label="Email Pelanggan" required>
                <Input
                  placeholder="Masukkan email Anda"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="form-input"
                />
              </Form.Item>
              <Form.Item label="Metode Pembayaran" required>
                <Select
                  value={paymentMethod}
                  onChange={(value) => setPaymentMethod(value)}
                  className="form-select"
                >
                  <Select.Option value="bankTransfer">Transfer Bank</Select.Option>
                  <Select.Option value="creditCard">Kartu Kredit</Select.Option>
                  <Select.Option value="eWallet">
                    Dompet Digital (contoh: GoPay, OVO)
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  onClick={handleSubmit}
                  className="confirm-button"
                >
                  Konfirmasi Pembelian
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  onClick={handleBack}
                  className="back-button"
                >
                  Kembali ke Halaman Customer
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Transactions;
