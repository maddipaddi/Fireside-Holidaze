import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Venues from "./pages/Venues";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Profile from "./pages/Profile";
import UpdateVenue from "./pages/UpdateVenue";
import SingleVenue from "./pages/SingleVenues";
import SearchResults from "./pages/SearchResults";

/**
 * The main application component that defines the routing structure for the app using React Router.
 *
 * @component
 * @returns {JSX.Element} The rendered application with nested routes.
 *
 * @example
 * <App />
 *
 * Routes:
 * - "/" (Layout)
 *   - index: <Home />
 *   - "/Venues": <Venues />
 *   - "/categories/:type": <Categories />
 *   - "/About": <About />
 *   - "/Login": <Login />
 *   - "/Register": <Register />
 *   - "/venue/:id": <SingleVenue />
 *   - "/Profile": <Profile />
 *   - "/venue/edit/:id": <UpdateVenue />
 *   - "/Terms": <Terms />
 *   - "/Privacy": <Privacy />
 *   - "/search": <SearchResults />
 */

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Venues" element={<Venues />} />
          <Route path="/categories/:type" element={<Categories />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/venue/:id" element={<SingleVenue />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/venue/edit/:id" element={<UpdateVenue />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
