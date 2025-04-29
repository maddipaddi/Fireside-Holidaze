import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Venues from "./pages/Venues";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Searchbar from "./components/layout/Searchbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Venues" element={<Venues />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
