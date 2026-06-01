const Product = require("../../models/Product");
const View = require("../../models/View");

const trackView = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const userId = req.user ? req.user._id : null;
    const ipAddress = req.ip;

    // Track the view
    await View.create({ user: userId, product: productId, ipAddress });
    
    // Increment the count on the product
    await Product.findByIdAndUpdate(productId, { $inc: { viewCount: 1 } });

    res.status(200).json({ success: true, message: "View tracked" });
  } catch (error) {
    console.error("Error tracking view:", error);
    res.status(500).json({ success: false, message: "Error tracking view" });
  }
};

module.exports = trackView;
