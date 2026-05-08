import { Route, Routes } from "react-router-dom";
import "./styles/main.scss";
import Layout from "./components/Layout";
import Home from "./pages/Home/index";
import Venues from "./pages/Venues/index";
import VenueDetails from "./pages/VenueDetails";
import LoginPage from "./pages/Login";
import Profile from "./pages/Profile";
import EditVenue from "./pages/EditVenue";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/venues/edit/:id" element={<EditVenue />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
