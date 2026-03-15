import api from './api';

export const fetchNotifications = () => api.get('/notifications').then(res => res.data.data);
export const markNotificationRead = id => api.patch(`/notifications/${id}/read`).then(res => res.data.data);
