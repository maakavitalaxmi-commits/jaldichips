import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart, Zap, Truck, Phone, Mail,
  CheckCircle2, Info, Package, Store,
  ArrowRight, ShieldCheck, Globe, Percent,
  MessageCircle, ExternalLink,
  Building2, CalendarDays, Users, CircleDollarSign, IdCard, FileText,
  Star, ThumbsUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

// Assets
import bananaChilli from "../assets/banana/bananaChilli.jpeg";
import bananaChips from "../assets/banana/bananaChips.jpeg";
import bananaPowder from "../assets/banana/bananaPowder.jpeg";
import bananaSalti from "../assets/banana/bananaSalti.jpeg";
import chilliBana from "../assets/banana/chilliBana.jpeg";
import bananach5 from "../assets/banana/bananach5.jpeg";
import upiqr from "../assets/banana/upi-qr.jpeg";
import ContactForm from "./ContactForm";
import { submitQuote } from "../utils/orderApi";
import { submitContactEnquiry } from "../utils/contactApi";
function BusinessToBusinessPageOld() {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const bulkProducts = [
    { id: "b1", title: "Signature Banana Chips", price: 400, retail: 450, minQty: 10, desc: "Hand-sliced premium Nendran bananas fried in cold-pressed coconut oil.", image: chilliBana, category: "chips" },
    { id: "b2", title: "Natural Banana Powder", price: 400, retail: 480, minQty: 10, desc: "Sun-dried raw banana flour, perfect for health supplements.", image: bananaPowder, category: "powder" },
    { id: "b3", title: "Banana Length Pepper", price: 400, retail: 440, minQty: 10, desc: "Long-cut style infused with black Malabar pepper.", image: bananach5, category: "chips" },
    { id: "b5", title: "Spicy Banana Chips", price: 400, retail: 460, minQty: 10, desc: "Infused with bird's eye chilli for an authentic kick.", image: bananaChilli, category: "chips" },
    { id: "b6", title: "Classic Banana Chips", price: 400, retail: 420, minQty: 10, desc: "Traditional sea-salt variant, the gold standard of snacks.", image: bananaChips, category: "chips" },
    { id: "b7", title: "Banana Salti Chips", price: 400, retail: 430, minQty: 10, desc: "Ultra-thin crisps seasoned with Himalayan pink salt.", image: bananaSalti, category: "chips" },
  ];

  // const handleBulkAction = async (product, quantity, redirectToCart = false) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     toast.error("Wholesale access requires an account.");
  //     navigate("/auth/sign-in");
  //     return;
  //   }

  //   setLoadingId(product.id);
  //   try {
  //     await API.post("/cart/add", {
  //       productId: product.id,
  //       name: product.title,
  //       price: product.price,
  //       image: product.image,
  //       quantity: quantity,
  //       isBulk: true
  //     }, { headers: { Authorization: `Bearer ${token}` } });

  //     if (redirectToCart) navigate('/cart');
  //     else toast.success(`Added ${quantity} units to your wholesale cart!`);
  //   } catch (err) {
  //     toast.error("Connection error. Please try again.");
  //   } finally {
  //     setLoadingId(null);
  //   }
  // };

  return (
    <div className="min-h-screen bg-[#FBFBFD] pt-84 pb-20 selection:bg-green-100 overflow-x-hidden">
      <Toaster position="bottom-right" />

      {/* --- FLOATING WHATSAPP WIDGET --- */}
      <motion.a
        href="https://wa.me/919876543210"
        target="_blank"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center gap-2 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold text-sm whitespace-nowrap">Chat with Manager</span>
        <MessageCircle size={28} />
      </motion.a>

      <div className="max-w-7xl mx-auto px-6">

        
      </div>
    </div>
  );
}


const initialFormState = {
  companyName: "",
  gstNumber: "",
  contactName: "",
  phoneNumber: "",
  email: "",
  quantity: "",
  message: "",
};

function QuoteProductCard({ product, details, onQuote }) {
  const navigate = useNavigate();
  const requestQuote = () => {
    if (onQuote) {
      onQuote(product);
      return;
    }
    const subject = encodeURIComponent(`Quote Request: ${product.title}`);
    const body = encodeURIComponent(`Product: ${product.title}\nPreferred quantity: ${product.minQty} kg+\nPlease share best wholesale pricing and dispatch timeline.`);
    window.location.href = `mailto:maakavitalaxmi@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4">
        <div
          className="h-40 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <h3
          className="mt-4 text-base font-bold text-gray-900 cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.title}
        </h3>
        <p className="text-sm font-semibold text-gray-800 mt-1">₹ {product.price} / {product.weight || "100 g"}</p>
        {details ? (
          <div className="mt-2 text-xs text-gray-600 space-y-1">
            {details.flavour && <p>Flavour: {details.flavour}</p>}
            {details.packagingType && <p>Packaging Type: {details.packagingType}</p>}
            {details.weight && <p>Weight: {details.weight}</p>}
            {details.shelfLife && <p>Shelf Life: {details.shelfLife}</p>}
            {details.brand && <p>Brand: {details.brand}</p>}
            {details.productType && <p>Product Type: {details.productType}</p>}
            {details.ingredients && <p>Ingredients: {details.ingredients}</p>}
            {details.origin && <p>Country of Origin: {details.origin}</p>}
            {details.vegetarian && <p>100% Vegetarian: {details.vegetarian}</p>}
          </div>
        ) : (
          <div className="mt-2 text-xs text-gray-600 space-y-1">
            <p>Brand: jaldichips</p>
            <p>Weight: {product.weight || "100 g"}</p>
            <p>Shelf Life: 4 Months</p>
            <p>Country of Origin: Made in India</p>
            <p>Ingredients: G9 Banana + Rice Oil + flavour - salty</p>
            <p>100% Vegetarian: Yes</p>
          </div>
        )}
        <button
          onClick={requestQuote}
          className="mt-4 w-full rounded-xl bg-[#0b3b2a] text-white text-sm font-bold py-2 hover:opacity-90 transition"
        >
          Get Quote
        </button>
      </div>
    </div>
  );
}

// function PromoRangeCard() {
//   return (
//     <div className="relative bg-[#0b3b2a] rounded-2xl overflow-hidden">
//       <img
//         src={bananaChips}
//         alt=""
//         className="absolute inset-0 w-full h-full object-cover opacity-30"
//       />
//       <div className="relative p-6 h-full flex flex-col justify-end">
//         <p className="text-white text-lg font-bold">
//           View Complete <br /> Range Of Products
//         </p>
//         <button className="mt-4 inline-flex items-center justify-center rounded-xl bg-white text-[#0b3b2a] text-sm font-bold px-4 py-2">
//           Explore
//         </button>
//       </div>
//     </div>
//   );
// }

function CategoryThumbs() {
  const cats = [
    { title:"Spicy Banana Chips", image:bananaChilli },
    { title:"Banana Length Pepper", image:bananach5 },
    { title:"Classic Banana Chips", image:bananaChips },
    { title:"Banana Powder", image:bananaPowder },
    { title:"Banana Salti Chips", image:bananaSalti },
    
  ];
  return (
    <div className="flex flex-wrap justify-between gap-6">
      {cats.map((c, i) => (
        <div key={i} className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 overflow-hidden shadow-md border border-emerald-100 mx-auto">
            <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
          </div>
          <p className="mt-2 text-xs font-semibold text-gray-700">{c.title}</p>
        </div>
      ))}
    </div>
  );
}

function WideQuoteCard({ product, details, onQuote }) {
  const requestQuote = () => {
    if (onQuote) {
      onQuote(product);
      return;
    }
    const subject = encodeURIComponent(`Quote Request: ${product.title}`);
    const body = encodeURIComponent(`Product: ${product.title}\nPlease share wholesale pricing, packaging, and dispatch timeline.`);
    window.location.href = `mailto:maakavitalaxmi@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="bg-gray-50 rounded-xl flex items-center justify-center p-6">
          <img src={product.image} alt={product.title} className="w-full h-48 object-contain" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
          <p className="mt-1 text-green-700 font-bold">₹ {product.price}<span className="text-xs text-gray-500">/Kg</span></p>
          <div className="mt-3 text-sm text-gray-700 space-y-1">
            {details.flavour && <p>Flavour: {details.flavour}</p>}
            {details.packaging && <p>Packaging Type: {details.packaging}</p>}
            {details.shelfLife && <p>Shelf Life: {details.shelfLife}</p>}
            {details.brand && <p>Brand: {details.brand}</p>}
            {details.ingredient && <p>Ingredient: {details.ingredient}</p>}
            {details.packagingSize && <p>Packaging Size: {details.packagingSize}</p>}
          </div>
          <button
            onClick={requestQuote}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#0b3b2a] text-white text-sm font-bold px-5 py-2"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  const rating = 4.5;
  const distribution = [
    { stars: 5, percent: 70 },
    { stars: 4, percent: 20 },
    { stars: 3, percent: 6 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 1 },
  ];
  const gauges = [
    { label: "Response", value: 92 },
    { label: "Quality", value: 95 },
    { label: "Delivery", value: 90 },
  ];
  const reviews = [
    { name: "Ravi Kumar", location: "Mumbai", text: "Authentic taste and fast dispatch. Great wholesale partner.", score: 5 },
    { name: "Anita Sharma", location: "Delhi", text: "Packaging and consistency are reliable. Customers love it.", score: 5 },
    { name: "Faiz Ahmed", location: "Kochi", text: "Freshness and crispiness are top-notch. Recommended.", score: 4 },
  ];
  return (
    <section className="mt-12">
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <p className="text-2xl font-black text-gray-900">{rating}/5</p>
            </div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Average Rating</p>
            <div className="mt-4 space-y-2">
              {distribution.map(d => (
                <div key={d.stars} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-16">
                    {Array.from({ length: d.stars }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600" style={{ width: `${d.percent}%` }} />
                  </div>
                  <span className="w-12 text-right text-xs text-gray-500">{d.percent}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {gauges.map(g => (
              <div key={g.label} className="flex flex-col items-center gap-2">
                <div
                  className="w-20 h-20 rounded-full grid place-items-center"
                  style={{
                    background: `conic-gradient(#059669 ${g.value * 3.6}deg, #e5e7eb 0deg)`,
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-white grid place-items-center text-sm font-bold text-gray-900">
                    {g.value}%
                  </div>
                </div>
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">{g.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {reviews.map((r, idx) => (
              <div key={idx} className="border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-gray-900">{r.name}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: r.score }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{r.location}</p>
                <p className="mt-2 text-sm text-gray-700">{r.text}</p>
              </div>
            ))}
            <button className="w-full inline-flex items-center justify-center rounded-xl bg-[#0b3b2a] text-white text-xs font-black px-4 py-2">
              <ThumbsUp className="w-4 h-4 mr-2" /> See More Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const normalizeB2BImage = (imagePath) => {
  if (!imagePath) return "";
  if (/^https?:\/\//i.test(imagePath)) return imagePath;

  const baseApi = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const origin = baseApi.replace(/\/api\/?$/, "");
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${origin}${cleanPath}`;
};

const normalizeCategoryKey = (value) => {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return "banana-food-products";

  if (raw.includes("spicy") || raw.includes("namkeen")) return "banana-food-products";
  if (raw.includes("halka") || raw.includes("snack")) return "banana-chips";
  return raw.replace(/\s+/g, "-");
};

const getCategoryLabel = (value) => {
  const key = normalizeCategoryKey(value);
  if (key === "banana-food-products") return "Banana Food Products";
  if (key === "banana-chips") return "Banana Chips";
  return String(value || "Other Category")
    .trim()
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
};

const mapB2BProduct = (product, idx) => ({
  id: product._id || `b2b-live-${idx}`,
  title: product.name || "Untitled Product",
  price: Number(product.price || 0),
  image: normalizeB2BImage(product.image),
  weight: product.weight || "100 g",
  showOnPage: product.showOnPage || "home",
  category: product.category || "Banana Food Products",
  categoryKey: normalizeCategoryKey(product.category),
  categoryLabel: getCategoryLabel(product.category),
  minQty: 10,
  details: {
    brand: product.brand || "jaldichips",
    weight: product.weight || "100 g",
    shelfLife: product.shelfLife || "4 Months",
    origin: "Made in India",
    ingredients: product.ingredients || "G9 Banana + Rice Oil + flavour - salty",
    vegetarian: "Yes",
  },
});

export default function BusinessToBusiness({ products = [] }) {
  const [form, setForm] = useState(initialFormState);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fallbackProducts = [
    { id:"c1", title:"Classic Banana Chips", price:220, image:bananaChips, weight:"100 g", minQty:10, category:"Banana Food Products", categoryKey:"banana-food-products", categoryLabel:"Banana Food Products", details:{ brand:"jaldichips", weight:"100 g", shelfLife:"4 Months", origin:"Made in India", ingredients:"G9 Banana + Rice Oil + flavour - salty", vegetarian:"Yes" } },
    { id:"c2", title:"Banana Powder", price:220, image:bananaPowder, weight:"1 kg", minQty:10, category:"Banana Food Products", categoryKey:"banana-food-products", categoryLabel:"Banana Food Products", details:{ brand:"jaldichips", weight:"1 kg", shelfLife:"4 Months", origin:"Made in India", ingredients:"G9 Banana + Rice Oil + flavour - salty", vegetarian:"Yes" } },
    { id:"c3", title:"Banana Length Pepper", price:220, image:bananach5, weight:"250 g", minQty:10, category:"Banana Food Products", categoryKey:"banana-food-products", categoryLabel:"Banana Food Products", details:{ brand:"jaldichips", weight:"250 g", shelfLife:"4 Months", origin:"Made in India", ingredients:"G9 Banana + Rice Oil + flavour - salty", vegetarian:"Yes" } },
    { id:"c4", title:"Banana Salti Chips", price:230, image:bananaSalti, weight:"100 g", minQty:10, category:"Banana Chips", categoryKey:"banana-chips", categoryLabel:"Banana Chips", details:{ brand:"jaldichips", weight:"100 g", shelfLife:"4 Months", origin:"Made in India", ingredients:"G9 Banana + Rice Oil + flavour - salty", vegetarian:"Yes" } },
    { id:"h1", title:"Spicy Banana Chips", price:100, image:bananaChilli, weight:"100 g", minQty:10, category:"Banana Chips", categoryKey:"banana-chips", categoryLabel:"Banana Chips", details:{ brand:"jaldichips", weight:"100 g", shelfLife:"4 Months", origin:"Made in India", ingredients:"G9 Banana + Rice Oil + flavour - salty", vegetarian:"Yes" } },
    { id:"h2", title:"Signature Banana Chips", price:200, image:chilliBana, weight:"5 pcs", minQty:10, category:"Banana Chips", categoryKey:"banana-chips", categoryLabel:"Banana Chips", details:{ brand:"jaldichips", weight:"5 pcs", shelfLife:"4 Months", origin:"Made in India", ingredients:"G9 Banana + Rice Oil + flavour - salty", vegetarian:"Yes" } },
  ];

  const b2bProducts = Array.isArray(products)
    ? products.filter((product) => (product?.showOnPage || "home") === "b2b")
    : [];

  const liveProducts = Array.isArray(b2bProducts) && b2bProducts.length > 0
    ? b2bProducts.map(mapB2BProduct)
    : fallbackProducts;

  const heroProducts = liveProducts.slice(0, 2);
  const spicyProducts = liveProducts.filter((p) => p.categoryKey === "banana-food-products");
  const snacksProducts = liveProducts.filter((p) => p.categoryKey === "banana-chips");
  const otherCategoryKeys = Array.from(
    new Set(
      liveProducts
        .filter((p) => !["banana-food-products", "banana-chips"].includes(p.categoryKey))
        .map((p) => p.categoryKey)
    )
  );

  const spicyProductsToShow = spicyProducts.length > 0 ? spicyProducts.slice(0, 8) : liveProducts.slice(0, 4);
  const snacksProductsToShow = snacksProducts.length > 0 ? snacksProducts.slice(0, 8) : liveProducts.slice(4, 8).length > 0 ? liveProducts.slice(4, 8) : liveProducts.slice(0, 4);

  const handleQuoteRequest = (product) => {
    setSelectedProduct(product);
    setForm((previous) => ({
      ...previous,
      quantity: previous.quantity || (product.minQty ? `${product.minQty} kg` : ""),
      message:
        previous.message ||
        `Interested in ${product.title}. Please share best wholesale pricing and dispatch timeline.`,
    }));
const formEl = document.getElementById("wholesale-form");

if (formEl) {
  const yOffset = -120; // adjust according to navbar height
  const y =
    formEl.getBoundingClientRect().top +
    window.pageYOffset +
    yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await submitQuote({
        source: "b2b",
        sourceLabel: "B2B Page",
        product: selectedProduct
          ? {
              id: selectedProduct.id,
              title: selectedProduct.title,
              price: selectedProduct.price,
              quantity: selectedProduct.minQty ? `${selectedProduct.minQty} kg` : "",
              image: selectedProduct.image,
            }
          : undefined,
        customer: {
          name: form.contactName,
          phone: form.phoneNumber,
          email: form.email,
        },
        company: {
          name: form.companyName,
          gstNumber: form.gstNumber,
        },
        quantity: form.quantity,
        message: form.message,
        page: "b2b",
        section: "B2B",
      });

      // Also submit as a contact enquiry so it shows up in "Contact Enquiries" admin page
      await submitContactEnquiry({
        name: form.contactName,
        phone: form.phoneNumber,
        email: form.email,
        message: `[B2B Partner Request] Company: ${form.companyName}. Message: ${form.message}`,
        source: "order",
      });
    } catch {
      toast.error("Could not submit enquiry. Please try again.");
      return;
    }
    toast.success("Your order is confirmed.");
    setForm(initialFormState);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] pt-34">
      <Toaster position="top-right" />

      <main className=" mx-auto px-4 sm:px-6 pb-4">
        <section className="mt-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <CategoryThumbs />
            <div className="mt-6 grid lg:grid-cols-2 gap-6">
              {heroProducts.map((product) => (
                <WideQuoteCard
                  key={product.id}
                  product={product}
                  details={product.details || { brand: "jaldichips", shelfLife: "4 Months", ingredient: "G9 Banana + Rice Oil + flavour - salty", packaging: product.weight || "100 g" }}
                  onQuote={handleQuoteRequest}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Welcome to</p>
            <h3 className="mt-1 text-2xl font-black text-gray-900">Maa Kavita Laxmi Pvt. Ltd.</h3>
            <p className="mt-3 text-sm text-gray-600">
              MAA Kavita Laxmi Pvt. Ltd. Is A Premium Banana Food Products Manufacturer In Patna, Bihar, Dedicated To Delivering Fresh, Crispy and Snacks. We Carefully Select Farm-Fresh Bananas And Process Them Using Hygienic Methods To Maintain Natural Taste And Quality. Our Banana Chips Are Made Without Artificial Flavors Or Taste Enhancers, Ensuring A Pure And Healthy Snacking Experience. From Slicing And Seasoning To Packaging, Every Step Follows Strict Quality Control And Modern Food Safety Standards. We Offer A Variety Of Flavors Including Salted, Masala, And Spicy Banana Chips For Customers Across India. Our Mission Is To Provide Delicious, High-Quality Banana Chips That Combine Traditional Taste With Trusted Manufacturing Excellence.
            </p>
            <p className="mt-4 text-xs font-black text-gray-600 uppercase tracking-widest">
              Get in touch with us for best deals
            </p>
            {/* <button className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#0b3b2a] text-white text-sm font-bold px-6 py-3">
              Contact Us
            </button> */}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Building2 className="w-5 h-5"/>, label: "Nature of Business", value: "Factory / Manufacturing,Wholesale Business,Retail Business,Distributor & Exporter" },
              { icon: <Users className="w-5 h-5"/>, label: "Total Number of Employees", value: "11 to 25 People" },
              // { icon: <CalendarDays className="w-5 h-5"/>, label: "GST Registration Date", value: "01-07-2017" },
              { icon: <FileText className="w-5 h-5"/>, label: "Legal Status of Firm", value: "Private Limited Company" },
              { icon: <CircleDollarSign className="w-5 h-5"/>, label: "Annual Turnover", value: "0-40 L" },
              // { icon: <Truck className="w-5 h-5"/>, label: "Import Export Code", value: "ABPYBZ867R" },
              { icon: <IdCard className="w-5 h-5"/>, label: "GST No.", value: "10AAOCM9571F1ZB" },
              { icon: <ShieldCheck className="w-5 h-5"/>, label: "Trustseal Verified", value: "Verified" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                  <p className="text-sm font-bold text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Our Products</h3>
            <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Live Inventory</span>
          </div>
          <h4 className="text-sm font-bold text-gray-900 mb-4">Banana Food Products</h4>
          <div className="grid md:grid-cols-4 gap-6">
            {spicyProductsToShow.map((p) => (
              <QuoteProductCard
                key={p.id}
                product={p}
                details={p.details || { brand: "jaldichips", weight: p.weight || "100 g", shelfLife: "4 Months", origin: "Made in India", ingredients: "G9 Banana + Rice Oil + flavour - salty", vegetarian: "Yes" }}
                onQuote={handleQuoteRequest}
              />
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-gray-900">Banana Chips</h4>
            <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Freshly Added</span>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {snacksProductsToShow.map((p) => (
              <QuoteProductCard
                key={p.id}
                product={p}
                details={p.details || { brand: "jaldichips", weight: p.weight || "100 g", shelfLife: "4 Months", origin: "Made in India", ingredients: "G9 Banana + Rice Oil + flavour - salty", vegetarian: "Yes" }}
                onQuote={handleQuoteRequest}
              />
            ))}
          </div>

          {otherCategoryKeys.map((categoryKey) => {
            const items = liveProducts.filter((p) => p.categoryKey === categoryKey).slice(0, 8);
            if (items.length === 0) return null;

            return (
              <div key={categoryKey} className="mt-10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-gray-900">{items[0].categoryLabel || getCategoryLabel(categoryKey)}</h4>
                  <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Dropdown Category</span>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                  {items.map((p) => (
                    <QuoteProductCard
                      key={p.id}
                      product={p}
                      details={p.details || { brand: "jaldichips", weight: p.weight || "100 g", shelfLife: "4 Months", origin: "Made in India", ingredients: "G9 Banana + Rice Oil + flavour - salty", vegetarian: "Yes" }}
                      onQuote={handleQuoteRequest}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* <ReviewsSection /> */}

        
        {/* PRICE LIST SECTION */}
        
        


        <section className="mt-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0b3b2a] text-center">
            Our B2B Clients
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-2xl mx-auto">
            Trusted by leading businesses across India and international markets.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Premium Retail Stores",
              "Modern Trade & Supermarkets",
              "Resellers & Kirana Stores",
              "Corporate Offices",
              "Cafes & Snack Counters",
              "Export Partners",
              "Online Marketplaces",
            ].map((label) => (
              <div
                key={label}
                className="rounded-full border border-[#DBCBB5] bg-white px-4 py-2 text-xs font-medium text-[#0b3b2a]"
              >
                {label}
              </div>
            ))}
          </div>
        </section>

        <section
          id="wholesale-form"
          className="mt-16"
        >
          <div className="bg-white rounded-3xl px-6 sm:px-8 py-8 shadow-sm border border-[#E5D7C3]">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#0b3b2a]">
              Become a Wholesaler/Distributor Partner
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-xl">
              Fill out the form below and our B2B team will get in touch with you
              within 24–48 working hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a]"
                  placeholder="Enter company name"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  GST Number
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  value={form.gstNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a]"
                  placeholder="Enter GST (optional)"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a]"
                  placeholder="Full name"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a]"
                  placeholder="WhatsApp / mobile number"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a]"
                  placeholder="Business email"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Required Quantity (Monthly)
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a]"
                  placeholder="Example: 50–100 kg per month"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Message / Requirements
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a] resize-none"
                  placeholder="Tell us about your requirements, product interest, and delivery location."
                />
              </div>

              <div className="sm:col-span-2 mt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#0b3b2a] text-white text-sm font-semibold px-6 py-3.5 hover:bg-[#0b3b2a] transition-colors"
                >
                  Submit Enquiry
                </button>
              </div>
            </form>
          </div>

          <div className="flex flex-row justify-between bg-[#F7F1E6] rounded-3xl px-6 mt-4 sm:px-8 py-8 border border-[#E5D7C3]">
            
            <div className="mt-6 space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-[#0b3b2a]">
              Direct Contact
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              For immediate assistance, reach out to our B2B team using the details below.
            </p>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0b3b2a] border border-[#DCCCB6]">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0b3b2a] uppercase tracking-[0.18em]">
                    Call / WhatsApp
                  </p>
                  <a
                    href="tel:+918492995999"
                    className="block mt-1 text-sm font-medium text-[#0b3b2a]"
                  >
                    +91-8492995999
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0b3b2a] uppercase tracking-[0.18em]">
                    Call / WhatsApp
                  </p>
                  <a
                    href="tel:+918492995999"
                    className="block mt-1 text-sm font-medium text-[#0b3b2a]"
                  >
                    +91-7366981951
                  </a>
                </div>

              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0b3b2a] border border-[#DCCCB6]">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0b3b2a] uppercase tracking-[0.18em]">
                    Email
                  </p>
                  <a
                    href="mailto:maakavitalaxmi@gmail.com"
                    className="block mt-1 text-sm font-medium text-[#0b3b2a]"
                  >
                    maakavitalaxmi@gmail.com
                  </a>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#E0D1BC]">
                <p className="text-xs font-semibold text-[#0b3b2a] uppercase tracking-[0.18em]">
                  Office Address
                </p>
                <p className="mt-1 text-xs text-gray-700 leading-relaxed">
                  Maa Kavita Lakxmi Pvt. Ltd.
                  <br />
                  GROUND FLOOR, Simli Sardra, Yadav Building, Simali Murarpur Tola, New Mamta Photostat, Malsalami, Patna, Patna, Bihar, 800008
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E0D1BC] text-center">

              <img
                src={upiqr}
                alt="UPI Payment QR"
                className="mx-auto w-48 sm:w-56 rounded-xl border border-[#DCCCB6] shadow-sm"
              />

              <p className="mt-2 text-xs text-gray-600">
                Scan to pay Maa Kavita Lakxmi Pvt. Ltd.
              </p>

            </div>
          </div>
        </section>
      </main>
        <ContactForm/>
    </div>
  );
}
