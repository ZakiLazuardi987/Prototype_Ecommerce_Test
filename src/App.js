import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Customer from "./pages/Customer/Customer";
import Transaction from "./pages/Transaction/Transaction";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  // // Effect untuk memeriksa status login saat halaman dimuat
  // useEffect(() => {
  //   const loggedInStatus = localStorage.getItem("isLoggedIn");
  //   setIsLoggedIn(loggedInStatus === "true");
  // }, []);

  return (
    <div>
      {/* Router untuk navigasi antar halaman */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </div>
  );
}

export default App;
