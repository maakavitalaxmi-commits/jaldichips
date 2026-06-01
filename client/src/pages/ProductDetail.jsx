import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, Star, Plus, Minus, Building2, CalendarDays, Users, CircleDollarSign, IdCard, FileText, Truck, ShieldCheck, ThumbsUp, Share2, Loader2 } from "lucide-react";
import API from "../config/api/apiconfig";
import { submitQuote } from "../utils/orderApi";
import { submitContactEnquiry } from "../utils/contactApi";
import { trackView, trackShare, toggleLike, getLikeStatus } from "../config/api/analyticsApi";

// Assets
import bananaChilli from "../assets/banana/bananaChilli.jpeg";
import bananaChips from "../assets/banana/bananaChips.jpeg";
import bananaPowder from "../assets/banana/bananaPowder.jpeg";
import bananaSalti from "../assets/banana/bananaSalti.jpeg";
import chilliBana from "../assets/banana/chilliBana.jpeg";
import bananach5 from "../assets/banana/bananach5.jpeg";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [loadingId, setLoadingId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: "", mobile: "", email: "", message: "" });
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Track view
        trackView(id);

        const { data } = await API.get(`/products`);
        // Find the specific product from the list (since there might not be a single product GET endpoint yet)
        const products = Array.isArray(data) ? data : data.products || [];
        const found = products.find(p => p._id === id);
        
        if (found) {
          setProductData(found);
          setLikeCount(found.likeCount || 0);
        }

        // Check like status if user is logged in
        const token = localStorage.getItem("token");
        if (token) {
          const { data: likeData } = await getLikeStatus(id);
          setIsLiked(likeData.isLiked);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && id.length > 10) { // Check if it's a real MongoDB ID
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/sign-in");
      return;
    }

    try {
      const { data } = await toggleLike(id);
      setIsLiked(data.isLiked);
      setLikeCount(prev => data.isLiked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleShare = async (platform) => {
    try {
      await trackShare(id, platform);
      // Implementation of actual sharing logic (e.g., navigator.share or opening a link)
      if (platform === 'copy-link') {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error tracking share:", error);
    }
  };

  const products = [
    {
      id: "p3",
      title: "Pure Banana Powder",
      subtitle: "Nutrient Powerhouse",
      price: 500,
      mrp: 680,
      quantity: "1 Kg",
      image: bananaPowder,
      tag: "Superfood",
      rating: 5.0,
      reviews: "950",
      features: ["Gluten Free", "Immunity Booster", "100% Natural"],
      color: "emerald",
      badgeColor: "bg-emerald-600"
    },
    {
      id: "p4",
      title: "Himalayan Salted Delite",
      subtitle: "Extra Crispy",
      price: 81,
      mrp: 130,
      quantity: "100 g",
      image: bananaSalti,
      tag: "Gourmet",
      rating: 4.7,
      reviews: "1.1k",
      features: ["Light & Airy", "Low Sodium", "Himalayan Salt"],
      color: "sky",
      badgeColor: "bg-sky-600"
    },
    {
      id: "p5",
      title: "Peri Peri Spiced Chips",
      subtitle: "Global Fusion",
      price: 81,
      mrp: 120,
      quantity: "100 g",
      image: bananaChilli,
      tag: "New Arrival",
      rating: 4.9,
      reviews: "560",
      features: ["Zesty Flavor", "Global Fusion", "Limited"],
      color: "orange",
      badgeColor: "bg-orange-600"
    },
        {
      id: "p1",
      title: "Signature Banana Chips",
      subtitle: "Spicy & Crunchy",
      price: 290,
      mrp: 350,
      quantity: "1 Kg",
      image: chilliBana,
      tag: "Best Seller",
      rating: 4.9,
      reviews: "2.1k",
      features: ["Farm Fresh", "No Preservatives", "Zero Trans Fat"],
      color: "rose",
      badgeColor: "bg-rose-600"
    },
    {
      id: "p2",
      title: "Classic Golden Chips",
      subtitle: "Traditional Taste",
      price: 81,
      mrp: 120,
      quantity: "100 g",
      image: bananaChips,
      tag: "Traditional",
      rating: 4.8,
      reviews: "1.8k",
      features: ["100% Coconut Oil", "Sea Salted", "Hand-picked"],
      color: "amber",
      badgeColor: "bg-amber-600"
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const detailMap = {
    c1: {
      title: "Chana Jar Garam",
      price: 220,
      unit: "Kg",
      image: bananaChips,
      specs: {
        brand: "Sonal Foods",
        packagingSize: "200 gm",
        shelfLife: "6 Months",
        origin: "Made in India",
        ingredients: "Chana, Oil, Salt, Spices",
        vegetarian: "Yes",
      },
    },
    c2: {
      title: "Dal Muth Namkeens",
      price: 220,
      unit: "Kg",
      image: bananaPowder,
      specs: {
        brand: "Sonal Foods",
        packagingSize: "200 gm",
        shelfLife: "6 Months",
        origin: "Made in India",
        ingredients: "Dal, Oil, Salt, Spices",
        vegetarian: "Yes",
      },
    },
    c3: {
      title: "Namkeen Nadiyadi Bhoosa",
      price: 220,
      unit: "Kg",
      image: bananach5,
      specs: {
        brand: "Sonal Foods",
        packagingSize: "200 gm",
        shelfLife: "6 Months",
        origin: "Made in India",
        ingredients: "Gram Flour, Oil, Salt, Spices",
        vegetarian: "Yes",
      },
    },
    c4: {
      title: "Salted Snacks Masala Chana Mari",
      price: 230,
      unit: "Kg",
      image: bananaSalti,
      specs: {
        brand: "Sonal Foods",
        packagingSize: "200 gm",
        shelfLife: "6 Months",
        origin: "Made in India",
        ingredients: "Chana, Masala, Oil, Salt",
        vegetarian: "Yes",
      },
    },
    h1: {
      title: "Masala Salted Wheat Puff",
      price: 180,
      unit: "Kg",
      image: bananaSalti,
      specs: {
        brand: "Sonal Foods",
        packagingSize: "200 gm",
        shelfLife: "6 Months",
        origin: "Made in India",
        ingredients: "Wheat, Oil, Salt, Spices",
        vegetarian: "Yes",
      },
    },
    w1: {
      title: "Dabeli Sing Namkeen",
      price: 230,
      unit: "Kg",
      image: bananaChilli,
      specs: {
        brand: "Sonal Foods",
        packagingSize: "200 gm",
        shelfLife: "6 Months",
        origin: "Made in India",
        ingredients: "Peanuts, Oil, Salt, Spices",
        vegetarian: "Yes",
      },
    },
    w2: {
      title: "SP. Marvadi Sev Namkeen",
      price: 230,
      unit: "Kilogram",
      image: bananach5,
      specs: {
        brand: "Sonal Foods",
        packagingSize: "1 kg",
        shelfLife: "6 Months",
        origin: "Made in India",
        ingredients: "Besan, Oil, Salt, Spices",
        vegetarian: "Yes",
      },
    },
  };

  const detailProduct = productData ? {
    id: productData._id,
    title: productData.name,
    price: productData.price,
    unit: productData.weight || "100 g",
    image: normalizeProductImage(productData.image),
    specs: {
      brand: productData.brand || "jaldichips",
      packagingSize: productData.weight || "100 g",
      shelfLife: productData.shelfLife || "4 Months",
      origin: "Made in India",
      ingredients: productData.ingredients || "G9 Banana + Rice Oil + flavour",
      vegetarian: "Yes",
    },
  } : (id ? (detailMap[id] || {
    title: id,
    price: 220,
    unit: "Kg",
    image: bananaChips,
    specs: {
      brand: "Sonal Foods",
      packagingSize: "200 gm",
      shelfLife: "6 Months",
      origin: "Made in India",
      ingredients: "Maida, Ghee, Oil, Salt",
      vegetarian: "Yes",
    },
  }) : null);

  function normalizeProductImage(imagePath) {
    if (!imagePath) return bananaChips;
    if (/^https?:\/\//i.test(imagePath)) return imagePath;
    const baseApi = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const origin = baseApi.replace(/\/api\/?$/, "");
    return `${origin}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  }

  const handleAction = async (product, redirectToCart = false) => {
    const token = localStorage.getItem("token");
    if (!token) { 
      navigate("/auth/sign-in"); 
      return; 
    }
    
    setLoadingId(product.id);
    try {
      await API.post("/cart/add", {
        productId: product.id, 
        name: product.title,
        price: product.price, 
        image: product.image, 
        quantity: quantity
      }, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      if (redirectToCart) {
        navigate('/cart');
      } else {
        alert(`Added to cart!`);
      }
    } catch { 
      alert("Error!"); 
    } finally { 
      setLoadingId(null); 
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  useEffect(() => {
    if (id) return; // single detail page, ignore header search
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) setSearchTerm(q);
  }, [location.search, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F0E6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
          <p className="text-sm font-bold text-gray-500">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  if (detailProduct) {
    return (
      <div className="min-h-screen bg-[#F4F0E6] pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-xl font-bold text-gray-900 mb-4">{detailProduct.title}</h1>
          <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl border border-[#E2D5C0] p-6">
            <div>
              <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-center">
                <img src={detailProduct.image} alt={detailProduct.title} className="w-full h-auto object-contain" />
              </div>
              <button
                onClick={() => setShowQuoteModal(true)}
                className="mt-4 w-full rounded-xl border border-[#0b3b2a] text-[#0b3b2a] py-2 text-sm font-bold"
              >
                Get Best Quote
              </button>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3 pt-8">
                <p className="text-xl font-black text-gray-900">₹ {detailProduct.price} / {detailProduct.unit}</p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-600' : ''}`} />
                    <span className="text-sm font-bold">{likeCount}</span>
                  </button>
                  <button 
                    onClick={() => handleShare('copy-link')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-bold">Share</span>
                  </button>
                </div>
              </div>
              <div className="text-xs text-gray-700 space-y-4">
                <p><span className="font-bold">Brand</span>: {detailProduct.specs.brand}</p>
                <p><span className="font-bold">Packaging Size</span>: {detailProduct.specs.packagingSize}</p>
                <p><span className="font-bold">Shelf Life</span>: {detailProduct.specs.shelfLife}</p>
                <p><span className="font-bold">Country of Origin</span>: {detailProduct.specs.origin}</p>
                <p><span className="font-bold">Ingredients</span>: {detailProduct.specs.ingredients}</p>
                <p><span className="font-bold">100% Vegetarian</span>: {detailProduct.specs.vegetarian}</p>
              </div>
              <button
                onClick={() => setShowQuoteModal(true)}
                className="mt-6 w-full inline-flex items-center justify-center rounded-xl bg-green-700 text-white text-sm font-bold px-6 py-3"
              >
                Yes! I am interested
              </button>
            </div>
          </div>
          {showQuoteModal && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
              <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex">
                  <div className="hidden md:block w-1/3 bg-gray-50 p-4">
                    <div className="rounded-xl overflow-hidden border border-gray-100">
                      <img src={detailProduct.image} alt={detailProduct.title} className="w-full h-auto object-contain" />
                    </div>
                    <p className="mt-3 text-xs text-gray-600">
                      {detailProduct.title}
                      <br />₹ {detailProduct.price} / {detailProduct.unit}
                    </p>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-bold text-gray-900">Get Best Quote and quick callback</h3>
                      <button onClick={() => setShowQuoteModal(false)} className="text-gray-500 hover:text-gray-900">✕</button>
                    </div>
                    <form
                      className="mt-4 grid gap-3"
                      onSubmit={async (e) => {
                          e.preventDefault();
                          try {
                            await submitQuote({
                              source: "home",
                              sourceLabel: "Home Page",
                              product: {
                                id: detailProduct.id || id,
                                title: detailProduct.title,
                                price: detailProduct.price,
                                quantity: detailProduct.unit,
                                image: detailProduct.image,
                              },
                              customer: {
                                name: quoteForm.name,
                                phone: quoteForm.mobile,
                                email: quoteForm.email,
                              },
                              message: quoteForm.message,
                              page: "product",
                              section: "Product Detail",
                            });
                            
                            // Also submit as a contact enquiry so it shows up in "Contact Enquiries" admin page
                            await submitContactEnquiry({
                              name: quoteForm.name,
                              phone: quoteForm.mobile,
                              email: quoteForm.email,
                              message: `[Product: ${detailProduct.title}] ${quoteForm.message}`,
                              source: "order",
                            });

                            alert("Your order is confirmed.");
                            setShowQuoteModal(false);
                            setQuoteForm({ name: "", mobile: "", email: "", message: "" });
                          } catch (error) {
                            alert(error.message || "Could not submit your order.");
                          }
                      }}
                    >
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-700">Name</label>
                          <input
                            type="text"
                            required
                            value={quoteForm.name}
                            onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-700">Mobile Number</label>
                          <input
                            type="tel"
                            required
                            value={quoteForm.mobile}
                            onChange={(e) => setQuoteForm({ ...quoteForm, mobile: e.target.value })}
                            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-700">Email (optional)</label>
                        <input
                          type="email"
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-700">Message (optional)</label>
                        <textarea
                          rows={3}
                          value={quoteForm.message}
                          onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 resize-none"
                          placeholder="Share any specific requirements"
                        />
                      </div>
                      <button
                        type="submit"
                        className="mt-2 w-full inline-flex items-center justify-center rounded-xl bg-[#0b3b2a] text-white text-sm font-bold px-6 py-3"
                      >
                        Submit Now
                      </button>
                      <p className="mt-2 text-[11px] text-gray-500">We will contact you on the provided number/email.</p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Welcome to</p>
              <h3 className="mt-1 text-2xl font-black text-gray-900">Sonal Foods</h3>
              <p className="mt-3 text-sm text-gray-600">
                We are a leading manufacturer, exporter and supplier of a wide range of farsan and namkeens. Our offered readymade snacks have gained high appreciation for their longer shelf life, freshness and exceptional taste.
              </p>
              <p className="mt-2 text-xs font-bold text-gray-500">Read More...</p>
              <p className="mt-4 text-xs font-black text-gray-600 uppercase tracking-widest">Get in touch with us for best deals</p>
              <button className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#0b3b2a] text-white text-sm font-bold px-6 py-3">
                Contact Us
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: <Building2 className="w-5 h-5"/>, label: "Nature of Business", value: "Trader • Wholesaler/Distributor" },
                { icon: <Users className="w-5 h-5"/>, label: "Total Number of Employees", value: "11 to 25 People" },
                { icon: <CalendarDays className="w-5 h-5"/>, label: "GST Registration Date", value: "01-07-2017" },
                { icon: <FileText className="w-5 h-5"/>, label: "Legal Status of Firm", value: "Proprietorship" },
                { icon: <CircleDollarSign className="w-5 h-5"/>, label: "Annual Turnover", value: "5 – 25 Cr" },
                { icon: <Truck className="w-5 h-5"/>, label: "Import Export Code", value: "ABPYBZ867R" },
                { icon: <IdCard className="w-5 h-5"/>, label: "GST No.", value: "27ABPYBZ867R1Z2" },
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
          </div>
          <div className="mt-10 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Ratings & Reviews</h3>
              <button className="text-xs font-black text-gray-500 uppercase tracking-widest hover:text-gray-900">View All</button>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  <p className="text-2xl font-black text-gray-900">4.6/5</p>
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Average Rating</p>
                <div className="mt-4 space-y-2">
                  {[{s:5,p:70},{s:4,p:20},{s:3,p:6},{s:2,p:3},{s:1,p:1}].map(d => (
                    <div key={d.s} className="flex items-center gap-2">
                      <div className="flex items-center gap-1 w-16">
                        {Array.from({ length: d.s }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600" style={{ width: `${d.p}%` }} />
                      </div>
                      <span className="w-12 text-right text-xs text-gray-500">{d.p}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[{l:"Response",v:92},{l:"Quality",v:95},{l:"Delivery",v:90}].map(g => (
                  <div key={g.l} className="flex flex-col items-center gap-2">
                    <div
                      className="w-20 h-20 rounded-full grid place-items-center"
                      style={{ background: `conic-gradient(#059669 ${g.v * 3.6}deg, #e5e7eb 0deg)` }}
                    >
                      <div className="w-14 h-14 rounded-full bg-white grid place-items-center text-sm font-bold text-gray-900">
                        {g.v}%
                      </div>
                    </div>
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest">{g.l}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[{n:"Ravi Kumar",c:"Mumbai",t:"Authentic taste and fast dispatch. Great wholesale partner.",s:5},{n:"Anita Sharma",c:"Delhi",t:"Packaging and consistency are reliable. Customers love it.",s:5},{n:"Faiz Ahmed",c:"Kochi",t:"Freshness and crispiness are top-notch. Recommended.",s:4}].map((r, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-900">{r.n}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: r.s }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{r.c}</p>
                    <p className="mt-2 text-sm text-gray-700">{r.t}</p>
                  </div>
                ))}
                <button className="w-full inline-flex items-center justify-center rounded-xl bg-[#0b3b2a] text-white text-xs font-black px-4 py-2">
                  <ThumbsUp className="w-4 h-4 mr-2" /> View More Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F0E6] pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-700">
            Showing {filteredProducts.length} products
          </p>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products"
            className="w-40 sm:w-60 px-3 py-2 text-sm rounded-full border border-[#D8C7AA] bg-[#FBF6EC] focus:outline-none focus:ring-2 focus:ring-[#184328]/40"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-[#E2D5C0] shadow-sm overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-68 w-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 shadow-sm hover:shadow-md transition"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites[product.id]
                        ? "fill-rose-500 text-rose-500"
                        : "text-gray-400 hover:text-rose-400"
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-sm font-semibold text-gray-900 leading-snug">
                  {product.title}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {product.subtitle}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.mrp}
                  </span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-900">
                    ₹{product.quantity}
                  </span>
                    
                  </div>
                </div>

                <div className="mt-1 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-700">
                    {product.rating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center border border-gray-200 rounded-full">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-l-full text-xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r-full text-xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div> */}

                <button
                  onClick={() => handleAction(product, false)}
                  disabled={loadingId === product.id}
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#0b3b2a] text-white text-xs font-medium py-2.5 hover:bg-[#12321E] transition disabled:opacity-60"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
