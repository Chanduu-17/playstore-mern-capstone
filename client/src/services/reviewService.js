import api from './api';

export const fetchReviews = appId => api.get(`/reviews/${appId}`).then(res => res.data.data);
export const fetchOwnerReviews = () => api.get('/reviews/owner').then(res => res.data.data);
export const addReview = (appId, payload) => api.post(`/reviews/${appId}`, payload).then(res => res.data.data);
