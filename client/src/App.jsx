import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import API from './config/api/apiconfig'; // Use your custom axios instance

import ScrollToTop from './components/layout/ScrollToTop'

// Layouts
import PublicLayout from './components/layout/PublicLayout'
import UserLayout from './components/userlayout/UserLayout'

// Customer Pages
import Landing from './pages/Landing'
import ProductDetail from './pages/ProductDetail'
import ContactUs from './pages/ContactUs'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import BusinessToBusiness from './pages/BusinessToBusiness'
import SignIn from './modules/auth/SignIn'
import SignUp from './modules/auth/SignUp'
import Cart from './modules/users/Cart'
import OrderSuccess from './modules/users/OrderSuccess'
import Orders from './modules/users/Orders'

// Admin Pages
import AdminLayout from './components/adminlayout/AdminLayout'
import AdminLogin from './modules/admin/Login'
import Dashboard from './modules/admin/Dashboard'
import AddProduct from './modules/admin/AddProduct'
import ManageProducts from './modules/admin/ManageProducts'
import ContactEnquiriesPage from './modules/admin/ContactEnquiriesPage'
import ContactUsEnquiriesPage from './modules/admin/ContactUsEnquiriesPage'
import AnalyticsDashboard from './modules/admin/AnalyticsDashboard'

const App = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const adminOpen = true; // allow admin access without login
  const canAccessAdmin = adminOpen || isAdmin;

  // Fetch products for both Admin and Customer view
  const fetchProducts = async () => {
    try {
      // Use API instead of axios directly if you have an interceptor
      const { data } = await API.get('/products');
      const normalizedProducts = Array.isArray(data)
        ? data
        : Array.isArray(data?.products)
          ? data.products
          : [];
      setProducts(normalizedProducts);
    } catch (error) {
      console.error("Products load fail:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Admin Logout Logic
  const handleAdminLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <Routes>
        {/* ================= ADMIN SECTION (No Header/Footer) ================= */}
        {/* Admin Login Route */}
        <Route 
          path="/admin/login" 
          element={canAccessAdmin ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={() => setIsAdmin(true)} />} 
        />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={canAccessAdmin ? <AdminLayout onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />}
        >
          {/* Default admin path leads to dashboard */}
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard products={products} refreshProducts={fetchProducts} />} />
          <Route path="add-product" element={<AddProduct onAdd={fetchProducts} />} />
          <Route path="live-products" element={<ManageProducts products={products} refreshProducts={fetchProducts} />} />
          <Route path="contact-enquiries" element={<ContactEnquiriesPage />} />
          <Route path="contactus-enquiries" element={<ContactUsEnquiriesPage />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
        </Route>

        {/* ================= PUBLIC SECTION (With Header/Footer) ================= */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Landing products={products} />} />

          {/* Dynamic Product Routes */}
          <Route path="ProductDetail" element={<ProductDetail />} />
          <Route path="product/:id" element={<ProductDetail />} />

          {/* Information Pages */}
          <Route path="contactus" element={<ContactUs />} />
          <Route path="about" element={<About />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="b2b" element={<BusinessToBusiness products={products} />} />

          {/* 404 Catch-all */}
          <Route
            path="*"
            element={
              <div className="pt-40 pb-20 text-center">
                <h1 className="text-6xl font-black text-gray-200">404</h1>
                <p className="text-red-500 font-bold uppercase tracking-widest mt-2">Page Not Found</p>
              </div>
            }
          />
        </Route>

        {/* ================= USER SECTION (With Header/Footer) ================= */}
        <Route path="/" element={<UserLayout />}>
          <Route path="auth" element={<Navigate to="/auth/sign-in" replace />} />
          <Route path="auth/sign-in" element={<SignIn />} />
          <Route path="auth/sign-up" element={<SignUp />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
