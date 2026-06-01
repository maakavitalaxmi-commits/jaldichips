import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Loader2, Heart, X, User, Mail, Phone } from "lucide-react";
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

      <AnimatePresence>
        {showBuyNowModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBuyNowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl max-w-3xl w-full relative overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition-colors z-20"
                onClick={() => setShowBuyNowModal(false)}
              >
                <X className="w-5 h-5" />
              </button>

              {/* LEFT SIDE - PRODUCT INFO */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col border-r border-gray-100">
                <div className="aspect-[4/3] bg-[#F8F9FA] rounded-2xl p-6 mb-6 flex items-center justify-center shadow-sm">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] leading-tight mb-1">
                      {product.title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[#0b3b2a]">₹ {product.price}</span>
                      <span className="text-base text-gray-400 font-medium">/ {product.quantity}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-gray-50">
                    <p className="text-sm text-gray-500 font-medium">
                      Sold By - <span className="text-gray-900 font-bold">{product.brand || "jaldichips"}</span>
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                      <DetailRow label="Ingredients" value={product.ingredients || "Banana, Oil, Salt"} />
                      <DetailRow label="Flavour" value={product.category || "Original"} />
                      <DetailRow label="Packaging Size" value={product.quantity} />
                      <DetailRow label="Packaging Type" value="Packet" />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - CHECKOUT FORM */}
              <div className="md:w-1/2 p-6 md:p-8 bg-white relative">
                {/* Green accent line */}
                <div className="absolute left-0 top-8 bottom-8 w-1 bg-[#0b3b2a] rounded-full hidden md:block" />
                
                <div className="h-full flex flex-col pl-2 md:pl-4">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Enter your details
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Quick process to confirm your order.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 flex-1">
                    <InputField
                      label="Name"
                      icon={<User className="w-4 h-4" />}
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleFormChange}
                      placeholder="Your full name"
                    />

                    <InputField
                      label="Email"
                      icon={<Mail className="w-4 h-4" />}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="your@email.com"
                    />

                    <InputField
                      label="Mobile"
                      icon={<Phone className="w-4 h-4" />}
                      name="mobile"
                      type="tel"
                      value={form.mobile}
                      onChange={handleFormChange}
                      placeholder="+91 XXXXX XXXXX"
                    />

                    {formError && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-500 text-[10px] font-bold flex items-center gap-1"
                      >
                        <span className="w-1 h-1 rounded-full bg-red-500" />
                        {formError}
                      </motion.p>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#0b3b2a] text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-[#082d20] transition-all shadow-lg shadow-[#0b3b2a]/20 flex items-center justify-center gap-2 group"
                      >
                        Continue to Cart
                        <ShoppingCart className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-500 font-bold">{label}:</span>
    <span className="text-gray-900 font-bold text-right">{value}</span>
  </div>
);

const InputField = ({ label, icon, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0b3b2a] transition-colors">
        {icon}
      </div>
      <input
        {...props}
        required
        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-[#0b3b2a]/30 focus:ring-4 focus:ring-[#0b3b2a]/5 outline-none font-semibold text-gray-900 transition-all placeholder:text-gray-300"
      />
    </div>
  </div>
);

export default ProductCard;
