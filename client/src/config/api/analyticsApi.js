import API from "./apiconfig";

export const trackView = (productId) => API.post(`/products/${productId}/view`);

export const trackShare = (productId, platform) => API.post(`/products/${productId}/share`, { platform });

export const toggleLike = (productId) => API.post(`/products/${productId}/like`);

export const getLikeStatus = (productId) => API.get(`/products/${productId}/like-status`);

export const getDetailedAnalytics = () => API.get("/admin/analytics");
