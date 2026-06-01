const express = require("express");

const { auth, optionalAuth, allowRoles } = require("../../middlewares/auth");
const listProducts = require("../../api/products/listProducts");
const { addProduct, uploadSingleImage } = require("../../api/products/addProduct");
const deleteProduct = require("../../api/products/deleteProduct");
const updateProduct = require("../../api/products/updateProduct");
const toggleLike = require("../../api/products/toggleLike");
const trackView = require("../../api/products/trackView");
const trackShare = require("../../api/products/trackShare");
const getLikeStatus = require("../../api/products/getLikeStatus");

const router = express.Router();

const isDev = process.env.NODE_ENV !== "production";
const adminOpenAccess = process.env.ADMIN_OPEN_ACCESS === "true" || isDev;

router.get("/", listProducts);
router.post("/:id/view", optionalAuth, trackView);
router.post("/:id/share", optionalAuth, trackShare);
router.post("/:id/like", auth, toggleLike);
router.get("/:id/like-status", auth, getLikeStatus);

if (adminOpenAccess) {
  router.post("/add", uploadSingleImage, addProduct);
  router.put("/:id", uploadSingleImage, updateProduct);
  router.delete("/:id", deleteProduct);
} else {
  router.post("/add", auth, allowRoles("admin"), uploadSingleImage, addProduct);
  router.put("/:id", auth, allowRoles("admin"), uploadSingleImage, updateProduct);
  router.delete("/:id", auth, allowRoles("admin"), deleteProduct);
}

module.exports = router;
