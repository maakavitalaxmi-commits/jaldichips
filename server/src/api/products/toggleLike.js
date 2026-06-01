const Product = require("../../models/Product");
const Like = require("../../models/Like");

const toggleLike = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const userId = req.user._id;

    const existingLike = await Like.findOne({ user: userId, product: productId });

    if (existingLike) {
      // Unlike
      await Like.deleteOne({ _id: existingLike._id });
      await Product.findByIdAndUpdate(productId, { $inc: { likeCount: -1 } });
      return res.status(200).json({ success: true, message: "Product unliked", isLiked: false });
    } else {
      // Like
      await Like.create({ user: userId, product: productId });
      await Product.findByIdAndUpdate(productId, { $inc: { likeCount: 1 } });
      return res.status(200).json({ success: true, message: "Product liked", isLiked: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ success: false, message: "Error toggling like" });
  }
};

module.exports = toggleLike;
