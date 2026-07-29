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
import AdminHomePage from "./Pages/Admin/AdminHomePage";
import AdminMaincategoryPage from "./Pages/Admin/Maincategory/AdminMaincategoryPage";
import AdminCreateMaincategoryPage from "./Pages/Admin/Maincategory/AdminCreateMaincategoryPage";
import AdminUpdateMaincategoryPage from "./Pages/Admin/Maincategory/AdminUpdateMaincategoryPage";

import AdminSubcategoryPage from "./Pages/Admin/Subcategory/AdminSubcategoryPage";
import AdminCreateSubcategoryPage from "./Pages/Admin/Subcategory/AdminCreateSubcategoryPage";
import AdminUpdateSubcategoryPage from "./Pages/Admin/Subcategory/AdminUpdateSubcategoryPage";

import AdminBrandPage from "./Pages/Admin/Brand/AdminBrandPage";
import AdminCreateBrandPage from "./Pages/Admin/Brand/AdminCreateBrandPage";
import AdminUpdateBrandPage from "./Pages/Admin/Brand/AdminUpdateBrandPage";

import AdminProductPage from "./Pages/Admin/Product/AdminProductPage";
import AdminCreateProductPage from "./Pages/Admin/Product/AdminCreateProductPage";
import AdminUpdateProductPage from "./Pages/Admin/Product/AdminUpdateProductPage";

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

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/maincategory" element={<AdminMaincategoryPage />} />
        <Route path="/admin/maincategory/create" element={<AdminCreateMaincategoryPage />} />
        <Route path="/admin/maincategory/update/:id" element={<AdminUpdateMaincategoryPage />} />

        <Route path="/admin/subcategory" element={<AdminSubcategoryPage />} />
        <Route path="/admin/subcategory/create" element={<AdminCreateSubcategoryPage />} />
        <Route path="/admin/subcategory/update/:id" element={<AdminUpdateSubcategoryPage />} />

        <Route path="/admin/brand" element={<AdminBrandPage />} />
        <Route path="/admin/brand/create" element={<AdminCreateBrandPage />} />
        <Route path="/admin/brand/update/:id" element={<AdminUpdateBrandPage />} />

        <Route path="/admin/product" element={<AdminProductPage />} />
        <Route path="/admin/product/create" element={<AdminCreateProductPage />} />
        <Route path="/admin/product/update/:id" element={<AdminUpdateProductPage />} />
        {/* Error page route */}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
