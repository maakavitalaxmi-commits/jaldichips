const Product = require("../../models/Product");
const Share = require("../../models/Share");

const trackShare = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { platform } = req.body;
    const userId = req.user ? req.user._id : null;

    // Track the share
    await Share.create({ user: userId, product: productId, platform });
    
    // Increment the count on the product
    await Product.findByIdAndUpdate(productId, { $inc: { shareCount: 1 } });

    res.status(200).json({ success: true, message: "Share tracked" });
  } catch (error) {
    console.error("Error tracking share:", error);
    res.status(500).json({ success: false, message: "Error tracking share" });
  }
};

module.exports = trackShare;
