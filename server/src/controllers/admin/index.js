const express = require("express");

const router = express.Router();

const { auth, allowRoles } = require("../../middlewares/auth");
const getDashboardStats = require("../../api/admin/getDashboardStats");
const listAllUsers = require("../../api/admin/listAllUsers");
const listOrders = require("../../api/admin/listOrders");
const getDetailedAnalytics = require("../../api/admin/getDetailedAnalytics");


const contactEnquiriesRoutes = require("./contactEnquiries");
const isDev = process.env.NODE_ENV !== "production";
const adminOpenAccess = process.env.ADMIN_OPEN_ACCESS === "true" || isDev;


if (adminOpenAccess) {
  router.get("/dashboard-stats", getDashboardStats);
  router.get("/users", listAllUsers);
  router.get("/orders", listOrders);
  router.get("/analytics", getDetailedAnalytics);
  router.use("/contact-enquiries", contactEnquiriesRoutes);
} else {
  router.get("/dashboard-stats", auth, allowRoles("admin", "super-admin"), getDashboardStats);
  router.get("/users", auth, allowRoles("admin", "super-admin"), listAllUsers);
  router.get("/orders", auth, allowRoles("admin", "super-admin"), listOrders);
  router.get("/analytics", auth, allowRoles("super-admin"), getDetailedAnalytics);
  router.use("/contact-enquiries", auth, allowRoles("admin", "super-admin"), contactEnquiriesRoutes);
}

module.exports = router;
