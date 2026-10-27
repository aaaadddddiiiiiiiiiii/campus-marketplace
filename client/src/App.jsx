import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListingDetail from "./pages/ListingDetail";
import ListingForm from "./pages/ListingForm";
import MyListings from "./pages/MyListings";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/sell" element={<ProtectedRoute><ListingForm /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><ListingForm /></ProtectedRoute>} />
        <Route path="/my-listings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
