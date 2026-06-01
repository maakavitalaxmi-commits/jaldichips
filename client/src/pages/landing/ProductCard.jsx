import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Loader2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../config/api/apiconfig";


const ProductCard = ({ product, onOpen, origin }) => {
  const navigate = useNavigate();
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [formError, setFormError] = useState("");

  const handleBuyNow = (e) => {
    e.stopPropagation();
    setShowBuyNowModal(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.mobile.trim()) {
      setFormError("All fields are required.");
      return;
    }
    setFormError("");
    setShowBuyNowModal(false);
    navigate("/cart", { state: { directProduct: product, userInfo: form } });
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
        onClick={() => onOpen && onOpen(product, origin)}
      >
        <div className="h-72 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-5 flex flex-col gap-3 flex-1">
          <h3
            className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 cursor-pointer"
            onClick={() => onOpen && onOpen(product, origin)}
          >
            {product.title}
          </h3>

          <div className="flex items-baseline justify-between">
            <p className="text-lg font-bold text-gray-900">₹ {product.price}</p>
            <div className="flex items-center gap-2">
              {product.likeCount > 0 && (
                <div className="flex items-center gap-1 text-gray-500">
                  <Heart className="w-3.5 h-3.5 fill-gray-500" />
                  <span className="text-xs font-semibold">{product.likeCount}</span>
                </div>
              )}
              <span className="text-xs font-bold text-gray-800">{product.quantity}</span>
            </div>
          </div>

          <button
            onClick={handleBuyNow}
            className="mt-2 w-full inline-flex items-center justify-center bg-[#0b3b2a] text-white text-sm font-semibold py-2.5 rounded-full hover:bg-green-800 transition-colors"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Now
          </button>
        </div>
      </motion.div>

{showBuyNowModal && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full relative overflow-hidden">

      {/* Close Button */}
      <button
        className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl z-10"
        onClick={() => setShowBuyNowModal(false)}
      >
        ×
      </button>

      <div className="flex flex-col md:flex-row">

        {/* 🔥 LEFT SIDE - PRODUCT DETAILS */}
        <div className="md:w-1/2 bg-gray-50 p-6 flex flex-col items-center justify-center border-r">
          
          <img
            src={product.image}
            alt={product.title}
            className="w-40 h-40 object-cover rounded-xl mb-4 shadow"
          />

          <h3 className="text-lg font-semibold text-gray-900 text-center line-clamp-2">
            {product.title}
          </h3>

          <p className="text-xl font-bold text-green-700 mt-2">
            ₹ {product.price}
          </p>

          <span className="text-sm text-gray-500 mt-1">
            {product.quantity}
          </span>

        </div>

        {/* 🔥 RIGHT SIDE - FORM */}
        <div className="md:w-1/2 p-6">

          <h3 className="text-lg font-bold mb-4 text-gray-900">
            Enter your details
          </h3>

          <form onSubmit={handleFormSubmit} className="space-y-3">

            <div>
              <label className="block text-xs font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-green-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-green-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-green-500 outline-none"
                required
              />
            </div>

            {formError && (
              <div className="text-red-500 text-xs">{formError}</div>
            )}

            <button
              type="submit"
              className="w-full bg-[#0b3b2a] text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition-colors"
            >
              Continue to Cart
            </button>

          </form>
        </div>

      </div>
    </div>
  </div>
)}
    </>
  );
};

export default ProductCard;
