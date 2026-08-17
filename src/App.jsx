import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import FeaturePage from "./Pages/FeaturePage";
import ShopPage from "./Pages/ShopPage";
import FaqPage from "./Pages/FaqPage";
import ProductPage from "./Pages/ProductPage";
import TestimonialPage from "./Pages/TestimonialPage";
import ErrorPage from "./Pages/ErrorPage";
import ContactPage from "./Pages/ContactPage";
import RefundPolicy from "./Pages/Policy/RefundPolicy";
import TermsAndCondition from "./Pages/Policy/TermsAndCondition.jsx";
import PrivacyPolicy from "./Pages/Policy/PrivacyPolicy";
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

import AdminFeaturesPage from "./Pages/Admin/Features/AdminFeaturesPage.jsx";
import AdminCreateFeaturesPage from "./Pages/Admin/Features/AdminCreateFeaturesPage.jsx";
import AdminUpdateFeaturesPage from "./Pages/Admin/Features/AdminUpdateFeaturesPage.jsx";

import AdminFaqPage from "./Pages/Admin/Faq/AdminFaqPage.jsx";
import AdminCreateFaqPage from "./Pages/Admin/Faq/AdminCreateFaqPage.jsx";
import AdminUpdateFaqPage from "./Pages/Admin/Faq/AdminUpdateFaqPage.jsx";

import AdminSettingPage from "./Pages/Admin/Setting/AdminSettingPage.jsx";

import SignUpPage from './Pages/User/SignUpPage.jsx'
import LoginPage from './Pages/User/LoginPage.jsx'
import ProfilePage from "./Pages/User/ProfilePage.jsx";


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
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* policy routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/termcondition-policy" element={<TermsAndCondition />} />
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

        <Route path="/admin/features" element={<AdminFeaturesPage />} />
        <Route path="/admin/features/create" element={<AdminCreateFeaturesPage />} />
        <Route path="/admin/features/update/:id" element={<AdminUpdateFeaturesPage />} />

        <Route path="/admin/faq" element={<AdminFaqPage />} />
        <Route path="/admin/faq/create" element={<AdminCreateFaqPage />} />
        <Route path="/admin/faq/update/:id" element={<AdminUpdateFaqPage />} />

        <Route path="/admin/setting" element={<AdminSettingPage />} />

        {/*User Login,signup Route*/}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/*Buyer Routes */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Error page route */}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
