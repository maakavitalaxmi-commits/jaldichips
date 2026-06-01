import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaPlusCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaRegClock,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaEnvelope,
  FaChartBar,
} from "react-icons/fa";

const AdminLayout = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'admin');

  const menuItems = [
    { path: "/admin/dashboard", icon: <FaBoxOpen />, label: "Dashboard" },
    { path: "/admin/add-product", icon: <FaPlusCircle />, label: "Add Product" },
    { path: "/admin/live-products", icon: <FaEdit />, label: "Live Products" },
    { path: "/admin/contact-enquiries", icon: <FaRegClock />, label: "Contact Enquiries" },
    { path: "/admin/contactus-enquiries", icon: <FaEnvelope />, label: "Contact Us Enquiries" },
  ];

  // Add Analytics only for Super Admin
  if (userRole === 'super-admin') {
    menuItems.push({ path: "/admin/analytics", icon: <FaChartBar />, label: "Analytics" });
  }

  const handleNavigateHome = () => {
    setIsMobileSidebarOpen(false);
    navigate("/");
  };

  const handleLogout = () => {
    setIsMobileSidebarOpen(false);
    onLogout?.();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidthClass = isDesktopSidebarCollapsed ? "lg:w-24" : "lg:w-72";
  const contentShiftClass = isDesktopSidebarCollapsed ? "lg:ml-24" : "lg:ml-72";
  const itemPaddingClass = isDesktopSidebarCollapsed
    ? "lg:px-0 lg:justify-center"
    : "lg:px-5";

  return (
    <div className="min-h-screen bg-slate-100 font-sans overflow-x-clip">
      <div
        className={`fixed inset-0 bg-slate-900/45 backdrop-blur-[1px] z-30 transition-opacity lg:hidden ${
          isMobileSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />

      <aside
        className={`w-72 ${sidebarWidthClass} bg-slate-800 text-white fixed inset-y-0 left-0 flex flex-col shadow-2xl z-40 transition-all duration-300 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 mb-1 border-b border-slate-700/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={handleNavigateHome}>
              <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center text-black font-black text-lg shadow-lg shadow-amber-400/20 transition-transform group-hover:rotate-6">
                MK
              </div>
              <div className={`${isDesktopSidebarCollapsed ? "lg:hidden" : ""}`}>
                <h1 className="text-base font-extrabold tracking-tight leading-none text-white">Admin Console</h1>
                <span className="text-[9px] text-emerald-300 font-bold uppercase tracking-[0.14em]">
                  Maa Kavita Lakxmi
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-700"
                onClick={() => setIsDesktopSidebarCollapsed((prev) => !prev)}
                title={isDesktopSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isDesktopSidebarCollapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
              </button>
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700"
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 py-3.5 rounded-2xl text-sm font-extrabold tracking-wide transition-all duration-200 ${itemPaddingClass} ${
                  isActive
                    ? "bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/20"
                    : "text-slate-200 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className={`${isDesktopSidebarCollapsed ? "lg:hidden" : ""}`}>{item.label}</span>
            </NavLink>
          ))}

        </nav>

        <div className="p-4 mt-auto border-t border-slate-700/80">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 ${
              isDesktopSidebarCollapsed ? "lg:px-0" : ""
            }`}
          >
            <FaSignOutAlt />
            <span className={`${isDesktopSidebarCollapsed ? "lg:hidden" : ""}`}>LOGOUT</span>
          </button>
        </div>
      </aside>

      <div className={`min-w-0 transition-all duration-300 ${contentShiftClass}`}>
        <header className="h-16 sm:h-[68px] bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-3 sm:px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <FaBars />
            </button>
            <button
              type="button"
              className="hidden lg:flex h-9 w-9 rounded-lg border border-slate-200 items-center justify-center text-slate-700 hover:bg-slate-50"
              onClick={() => setIsDesktopSidebarCollapsed((prev) => !prev)}
            >
              {isDesktopSidebarCollapsed ? <FaChevronRight size={13} /> : <FaChevronLeft size={13} />}
            </button>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.12em]">System Online</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-400 uppercase tracking-tighter leading-none">Status</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
                <FaRegClock className="text-slate-400" /> Operational
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
              <FaBoxOpen />
            </div>
          </div>
        </header>

        <main className="px-3 py-4 sm:px-6 lg:px-10 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;