import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Truck, Users } from "lucide-react";
import { featuredProducts } from "./data";

const HeroPage = () => {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % featuredProducts.length);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  return (
    <section className="pt-32 pb-12 bg-[rgb(250,221,159)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full mt-2 bg-green-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-green-800">
              <Leaf className="w-4 h-4" />
              Premium Banana Products Manufacturer • Patna, Bihar
            </span>

            <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-gray-900">
              Khao Jaldi,
              <span className="text-green-700">
                Raho Healthy
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-700 leading-relaxed max-w-xl">
              India's trusted manufacturer of
              <span className="font-bold text-green-700">
                {" "}Premium Banana Chips & Banana Food Products
              </span>.
              Freshly prepared, hygienically packed and supplied across
              India for wholesalers, distributors and bulk buyers.
            </p>

            {/* Features */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-700" />
                FSSAI Certified Production
              </div>

              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-700" />
                Pan-India Delivery
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-700" />
                10,000+ Happy Customers
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition duration-300 shadow-lg">
                Get Wholesale Pricing
              </button>

              <button className="px-6 py-3 rounded-xl border-2 border-green-700 text-green-700 font-semibold hover:bg-green-50 transition duration-300">
                Explore Products
              </button>
            </div>
          </div>

          {/* Right Slider */}
          <div className="relative mt-4">
            <div className="relative overflow-hidden rounded-3xl h-[45vh] sm:h-[55vh] md:h-[65vh] shadow-2xl">

              <motion.div
                animate={{ x: `-${heroIndex * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex h-full w-full"
              >
                {featuredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="w-full flex-shrink-0 h-full"
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      
                      <motion.img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                        }}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Product Text */}
                      <div className="absolute bottom-8 left-8 text-white">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                          {product.title}
                        </h2>

                        <p className="mt-2 text-sm sm:text-base text-white/90">
                          Fresh • Crispy • Hygienically Packed
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {featuredProducts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === heroIndex
                        ? "w-8 bg-white"
                        : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroPage;