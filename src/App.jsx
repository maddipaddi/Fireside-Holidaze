import React from "react";
import "./index.css";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" index element={<Home/>}/>
        <Route path="/Listings" index element={<Listings/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
