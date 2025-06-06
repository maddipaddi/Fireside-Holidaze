import { Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Venues from "./pages/Venues";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Login from "../src/pages/Login/index";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Profile from "../src/pages/Profile/index";
import UpdateVenue from "./pages/UpdateVenue";
import SingleVenue from "./pages/SingleVenues";
import SearchResults from "./pages/SearchResults";
import DynamicFavicon from "./components/DynamicFavicon";

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
      <DynamicFavicon />
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
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
