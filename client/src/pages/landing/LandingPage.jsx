import React, { useState } from "react";
import ContactForm from "../ContactForm";
import HeroPage from "./HeroPage";
import FeaturedSection from "./FeaturedSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import BestSellersSection from "./BestSellersSection";
import TestimonialsSection from "./TestimonialsSection";
import QuoteModal from "./QuoteModal";
import { bestSellers, featuredProducts, getProductDetails } from "./data";

const normalizeProductImage = (imagePath) => {
  if (!imagePath) return "";
  if (/^https?:\/\//i.test(imagePath)) return imagePath;

  const baseApi = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const origin = baseApi.replace(/\/api\/?$/, "");
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${origin}${cleanPath}`;
};

const mapLiveProduct = (product, index) => ({
  id: product._id || `live-${index}`,
  title: product.name || "Untitled Product",
  price: String(product.price ?? "0"),
  image: normalizeProductImage(product.image),
  quantity: product.weight || "100 g",
  likeCount: product.likeCount || 0,
});

const LandingPage = ({ products = [] }) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteForm, setQuoteForm] = useState({ name: "", mobile: "", email: "", message: "" });
  const [quoteSource, setQuoteSource] = useState("featured");
  const [quoteSectionLabel, setQuoteSectionLabel] = useState("Featured Products");

  const homeProducts = Array.isArray(products)
    ? products.filter((product) => (product?.showOnPage || "home") === "home")
    : [];

  const liveFeaturedProducts = Array.isArray(homeProducts)
    ? homeProducts.slice(0, 8).map(mapLiveProduct)
    : [];

  const finalFeaturedProducts = liveFeaturedProducts.length > 0
    ? liveFeaturedProducts
    : featuredProducts;

  const handleOpenModal = (product, origin) => {
    const source = origin || "featured";
    const sectionLabelMap = {
      featured: "Featured Products",
      bestseller: "Best Sellers",
    };
    setSelectedProduct(product);
    setQuoteSource(source);
    setQuoteSectionLabel(sectionLabelMap[source] || "Featured Products");
    setShowQuoteModal(true);
  };

  return (
    <div className="font-sans overflow-hidden bg-[#f3f2ee]">
      <HeroPage />
      <FeaturedSection items={finalFeaturedProducts} />
      <WhyChooseUsSection />
      <BestSellersSection items={bestSellers} />
      <TestimonialsSection />
      <QuoteModal
        open={showQuoteModal}
        product={selectedProduct}
        source={quoteSource}
        sourceLabel={quoteSectionLabel}
        quoteForm={quoteForm}
        setQuoteForm={setQuoteForm}
        onClose={() => setShowQuoteModal(false)}
        getProductDetails={getProductDetails}
      />
      <ContactForm />
    </div>
  );
};

export default LandingPage;
