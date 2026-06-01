const Product = require("../../models/Product");
const Like = require("../../models/Like");
const View = require("../../models/View");
const Share = require("../../models/Share");

const getDetailedAnalytics = async (req, res) => {
  try {
    // 1. Get overall stats per product
    const products = await Product.find({}, "name viewCount likeCount shareCount category");

    // 2. Get recent likes with user details
    const recentLikes = await Like.find()
      .populate("user", "name email")
      .populate("product", "name")
      .sort({ createdAt: -1 })
      .limit(50);

    // 3. Get share breakdown by platform
    const shareBreakdown = await Share.aggregate([
      {
        $group: {
          _id: "$platform",
          count: { $sum: 1 }
        }
      }
    ]);

    // 4. Get view trends (last 7 days - simple count)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const viewTrends = await View.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        products,
        recentLikes,
        shareBreakdown,
        viewTrends
      }
    });
  } catch (error) {
    console.error("Error fetching detailed analytics:", error);
    res.status(500).json({ success: false, message: "Error fetching detailed analytics" });
  }
};

module.exports = getDetailedAnalytics;
