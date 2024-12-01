import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(user));
        message.success("Login berhasil!");
        navigate("/customer");
      } else {
        message.error("Email atau kata sandi salah!");
      }
    } catch (error) {
      message.error("Gagal terhubung ke server!");
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/customer");
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Selamat Datang!</h2>
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          className="login-form"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Harap masukkan email Anda!" },
              { type: "email", message: "Harap masukkan email yang valid!" },
            ]}
          >
            <Input className="login-input" />
          </Form.Item>
          <Form.Item
            label="Kata Sandi"
            name="password"
            rules={[{ required: true, message: "Harap masukkan kata sandi Anda!" }]}
          >
            <Input.Password className="login-input" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="link"
              className="login-link"
              onClick={() => navigate("/register")}
            >
              Belum punya akun? Daftar di sini!
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
