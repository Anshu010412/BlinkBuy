import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import FeaturePage from "./Pages/FeaturePage";
import ShopPage from "./Pages/ShopPage";
import ProductPage from "./Pages/ProductPage";
import TestimonialPage from "./Pages/TestimonialPage";
import ErrorPage from "./Pages/ErrorPage";
import ContactPage from "./Pages/ContactPage";
import RefundPolicy from "./Policy/RefundPolicy";
import DataPolicy from "./Policy/DataPolicy";
import PrivacyPolicy from "./Policy/PrivacyPolicy";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* navbar routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/feature" element={<FeaturePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* policy routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/data-policy" element={<DataPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* Error page route */}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
