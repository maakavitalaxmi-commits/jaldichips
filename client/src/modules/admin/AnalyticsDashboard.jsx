import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Eye, Heart, Share2, TrendingUp, Users, Package } from "lucide-react";
import { getDetailedAnalytics } from "../../config/api/analyticsApi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data: response } = await getDetailedAnalytics();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading analytics...</div>;
  if (!data) return <div className="p-10 text-center text-red-500">Failed to load analytics.</div>;

  const totalViews = data.products.reduce((acc, p) => acc + (p.viewCount || 0), 0);
  const totalLikes = data.products.reduce((acc, p) => acc + (p.likeCount || 0), 0);
  const totalShares = data.products.reduce((acc, p) => acc + (p.shareCount || 0), 0);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Super Admin Analytics</h1>
        <div className="text-sm text-gray-500">Real-time tracking of engagement</div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Eye className="text-blue-500" />} label="Total Views" value={totalViews} color="bg-blue-50" />
        <StatCard icon={<Heart className="text-red-500" />} label="Total Likes" value={totalLikes} color="bg-red-50" />
        <StatCard icon={<Share2 className="text-green-500" />} label="Total Shares" value={totalShares} color="bg-green-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* View Trends Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            View Trends (Last 7 Days)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.viewTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Share Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-500" />
            Share Sources
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.shareBreakdown}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {data.shareBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-500" />
            Product Engagement
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4 text-center">Views</th>
                <th className="px-6 py-4 text-center">Likes</th>
                <th className="px-6 py-4 text-center">Shares</th>
                <th className="px-6 py-4 text-right">Engagement Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.products.map((product) => {
                const engagement = product.viewCount > 0 
                  ? (((product.likeCount + product.shareCount) / product.viewCount) * 100).toFixed(1)
                  : 0;
                return (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{product.viewCount}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{product.likeCount}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{product.shareCount}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${Number(engagement) > 10 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {engagement}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Likes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Recent Likes Breakdown
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {data.recentLikes.map((like) => (
              <div key={like._id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 font-bold">
                    {like.user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{like.user.name}</p>
                    <p className="text-xs text-gray-500">{like.user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-700 font-medium">liked <span className="text-indigo-600">{like.product.name}</span></p>
                  <p className="text-xs text-gray-400">{new Date(like.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`p-6 rounded-2xl ${color} border border-opacity-50 flex items-center gap-4`}>
      <div className="p-3 bg-white rounded-xl shadow-sm">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}
