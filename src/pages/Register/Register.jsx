import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error("Kata sandi tidak sama!");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;

      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        message.error("Email sudah terdaftar!");
        return;
      }

      await axios.post("http://localhost:3001/users", {
        email,
        password,
      });

      message.success("Pendaftaran berhasil!");
      navigate("/"); // Redirect ke halaman login
    } catch (error) {
      message.error("Terjadi kesalahan saat mendaftar!");
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/customer");
    }
  }, [navigate]);

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Daftar Akun</h2>
        <Form
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          className="register-form"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Harap masukkan email Anda!" },
              { type: "email", message: "Harap masukkan email yang valid!" },
            ]}
          >
            <Input className="register-input" />
          </Form.Item>
          <Form.Item
            label="Kata Sandi"
            name="password"
            rules={[{ required: true, message: "Harap masukkan kata sandi Anda!" }]}
          >
            <Input.Password className="register-input" />
          </Form.Item>
          <Form.Item
            label="Konfirmasi Kata Sandi"
            name="confirmPassword"
            rules={[
              { required: true, message: "Harap konfirmasi kata sandi Anda!" },
            ]}
          >
            <Input.Password className="register-input" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-button">
              Daftar
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="link"
              className="register-link"
              onClick={() => navigate("/")}
            >
              Kembali ke Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
