import api from './api';

export const fetchApps = params => api.get('/apps', { params }).then(res => res.data.data);
export const fetchAppById = id => api.get(`/apps/${id}`).then(res => res.data.data);
export const createApp = payload => api.post('/apps', payload).then(res => res.data.data);
export const updateApp = (id, payload) => api.put(`/apps/${id}`, payload).then(res => res.data.data);
export const deleteApp = id => api.delete(`/apps/${id}`).then(res => res.data);
export const toggleVisibility = (id, visible) => api.patch(`/apps/${id}/visibility`, { visible }).then(res => res.data.data);
export const downloadApp = id => api.post(`/apps/${id}/download`).then(res => res.data);
export const announceUpdate = (id, message) => api.post(`/apps/${id}/announce-update`, { message }).then(res => res.data);
