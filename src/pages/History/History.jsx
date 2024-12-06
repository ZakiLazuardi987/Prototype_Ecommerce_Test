import React, { useEffect, useState } from "react";
import { Card, List, message, Spin, Typography } from "antd";
import axios from "axios";

function History() {
  const [transactions, setTransactions] = useState([]); // State untuk data transaksi
  const [loading, setLoading] = useState(false); // State untuk status loading

  // Mengambil data transaksi dari API
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/transactions")
      .then((response) => {
        console.log("Data transaksi diterima:", response.data); // Debugging
        setTransactions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Kesalahan memuat data:", error); // Debugging
        message.error("Gagal memuat data transaksi.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="history-container">
      <Typography.Title level={3} className="history-title">
        Riwayat Pembelian
      </Typography.Title>

      <Spin spinning={loading}>
        {/* Menampilkan daftar transaksi */}
        <List
          grid={{ column: 3, gutter: 24 }}
          dataSource={transactions} // Menggunakan state transactions sebagai sumber data
          renderItem={(transaction) => (
            <List.Item>
              <Card hoverable size="small" className="transaction-card">
                <Typography.Title level={5} className="transaction-title">
                  {transaction.package}
                </Typography.Title>
                <Typography.Text strong className="transaction-price">
                  Harga: Rp {transaction.price.toLocaleString()}
                </Typography.Text>
                <Typography.Paragraph className="transaction-customer">
                  Nama: {transaction.customerName}
                </Typography.Paragraph>
                <Typography.Paragraph className="transaction-email">
                  Email: {transaction.customerEmail}
                </Typography.Paragraph>
                <Typography.Paragraph className="transaction-method">
                  Metode: {transaction.paymentMethod}
                </Typography.Paragraph>
                <Typography.Paragraph className="transaction-date">
                  Tanggal: {transaction.paymentDate}
                </Typography.Paragraph>
              </Card>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
}

export default History;
