const Like = require("../../models/Like");

const getLikeStatus = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const userId = req.user._id;

    const existingLike = await Like.findOne({ user: userId, product: productId });

    res.status(200).json({ 
      success: true, 
      isLiked: !!existingLike 
    });
  } catch (error) {
    console.error("Error getting like status:", error);
    res.status(500).json({ success: false, message: "Error getting like status" });
  }
};

module.exports = getLikeStatus;
