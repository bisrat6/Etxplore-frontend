import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  },
  signup: async (name: string, email: string, password: string, passwordConfirm: string) => {
    const response = await api.post('/users/signup', { 
      name, 
      email, 
      password, 
      passwordConfirm 
    });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Tours API
export const toursAPI = {
  getAll: async (filters?: { difficulty?: string; duration?: string; price?: string; sort?: string }) => {
    const params = new URLSearchParams();
    
    if (filters?.difficulty && filters.difficulty !== 'all') {
      params.append('difficulty', filters.difficulty);
    }
    if (filters?.duration) {
      params.append('duration[gte]', filters.duration);
    }
    if (filters?.price) {
      params.append('price[lte]', filters.price);
    }
    if (filters?.sort) {
      params.append('sort', filters.sort);
    }
    
    const url = params.toString() ? `/tours?${params.toString()}` : '/tours';
    const response = await api.get(url);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/tours/${id}`);
    return response.data;
  },
  create: async (tourData: any) => {
    const response = await api.post('/tours', tourData);
    return response.data;
  },
  update: async (id: string, tourData: any) => {
    const response = await api.patch(`/tours/${id}`, tourData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/tours/${id}`);
    return response.data;
  },
  getTopCheap: async () => {
    const response = await api.get('/tours/top-5-cheap');
    return response.data;
  },
  getTourStats: async () => {
    const response = await api.get('/tours/tour-stats');
    return response.data;
  },
  getMonthlyPlan: async (year: number) => {
    const response = await api.get(`/tours/monthly-plan/${year}`);
    return response.data;
  },
  getToursWithin: async (distance: number, latlng: string, unit: string = 'mi') => {
    const response = await api.get(`/tours/tours-within/${distance}/center/${latlng}/unit/${unit}`);
    return response.data;
  },
  getDistances: async (latlng: string, unit: string = 'mi') => {
    const response = await api.get(`/tours/distances/${latlng}/unit/${unit}`);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getAll: async (filters?: { role?: string }) => {
    const params = new URLSearchParams();
    if (filters?.role) {
      params.append('role', filters.role);
    }
    const url = params.toString() ? `/users?${params.toString()}` : '/users';
    const response = await api.get(url);
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  update: async (id: string, userData: any) => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
  updateMe: async (userData: { name?: string; email?: string }) => {
    const response = await api.patch('/users/updateMe', userData);
    return response.data;
  },
  deleteMe: async () => {
    const response = await api.delete('/users/deleteMe');
    return response.data;
  },
  updateMyPassword: async (passwordCurrent: string, password: string, passwordConfirm: string) => {
    const response = await api.patch('/users/updateMyPassword', {
      passwordCurrent,
      password,
      passwordConfirm
    });
    return response.data;
  },
  createUser: async (userData: { name: string; email: string; password: string; passwordConfirm: string; role?: string }) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
  forgotPassword: async (email: string) => {
    const response = await api.post('/users/forgotPassword', { email });
    return response.data;
  },
  resetPassword: async (token: string, password: string, passwordConfirm: string) => {
    const response = await api.patch(`/users/resetPassword/${token}`, {
      password,
      passwordConfirm
    });
    return response.data;
  },
};

// Reviews API
export const reviewsAPI = {
  getAll: async () => {
    const response = await api.get('/reviews');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  },
  create: async (reviewData: { review: string; rating: number; tour: string }) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },
  update: async (id: string, reviewData: { review?: string; rating?: number }) => {
    const response = await api.patch(`/reviews/${id}`, reviewData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },
  getReviewsForTour: async (tourId: string) => {
    const response = await api.get(`/tours/${tourId}/reviews`);
    return response.data;
  },
  createReviewForTour: async (tourId: string, reviewData: { review: string; rating: number }) => {
    const response = await api.post(`/tours/${tourId}/reviews`, reviewData);
    return response.data;
  },
};

// Bookings API - Note: Backend doesn't have booking endpoints yet
// These are placeholder implementations for future booking functionality
export const bookingsAPI = {
  getAll: async () => {
    // Placeholder - would need backend booking endpoints
    throw new Error('Booking functionality not yet implemented in backend');
  },
  getById: async (id: string) => {
    // Placeholder - would need backend booking endpoints
    throw new Error('Booking functionality not yet implemented in backend');
  },
  create: async (tourId: string) => {
    // Placeholder - would need backend booking endpoints
    throw new Error('Booking functionality not yet implemented in backend');
  },
  getMyBookings: async () => {
    // Placeholder - would need backend booking endpoints
    throw new Error('Booking functionality not yet implemented in backend');
  },
};

export default api;
