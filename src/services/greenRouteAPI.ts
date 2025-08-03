import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Commented out for public site - no authentication required
    // if (error.response?.status === 401) {
    //   localStorage.removeItem('authToken');
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'driver';
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: string;
  name: string;
  startLocationLat: number;
  startLocationLng: number;
  startLocationAddress: string;
  endLocationLat: number;
  endLocationLng: number;
  endLocationAddress: string;
  waypointsData?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  estimatedDuration: number;
  actualDuration?: number;
  distance: number;
  fuelConsumption?: number;
  carbonFootprint?: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  manufacturer: string;
  model: string;
  year: number;
  fuelType: 'GASOLINE' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
  capacity: number;
  currentLocationLat?: number;
  currentLocationLng?: number;
  status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'OFFLINE';
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  id: string;
  routeId?: string;
  vehicleId?: string;
  metricType: 'FUEL_CONSUMPTION' | 'CARBON_FOOTPRINT' | 'DISTANCE' | 'TIME' | 'EFFICIENCY';
  value: number;
  unit: string;
  date: string;
  createdAt: string;
}

export interface Delivery {
  id: string;
  routeId: string;
  vehicleId?: string;
  driverId?: string;
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  pickupTime?: string;
  deliveryTime?: string;
  actualDistance?: number;
  fuelConsumption?: number;
  carbonFootprint?: number;
  createdAt: string;
  updatedAt: string;
}

// Auth API
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: 'user' | 'admin' | 'driver';
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success) {
      localStorage.setItem('authToken', response.data.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (profileData: { name?: string; phone?: string }) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  changePassword: async (passwordData: { currentPassword: string; newPassword: string }) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  },
};

// Routes API
export const routesAPI = {
  getAll: async () => {
    const response = await api.get('/routes');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/routes/${id}`);
    return response.data;
  },

  create: async (routeData: {
    name: string;
    startLocationLat: number;
    startLocationLng: number;
    startLocationAddress: string;
    endLocationLat: number;
    endLocationLng: number;
    endLocationAddress: string;
    waypointsData?: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    estimatedDuration: number;
    distance: number;
  }) => {
    const response = await api.post('/routes', routeData);
    return response.data;
  },

  update: async (id: string, routeData: Partial<Route>) => {
    const response = await api.put(`/routes/${id}`, routeData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/routes/${id}`);
    return response.data;
  },

  optimize: async (routeId: string) => {
    const response = await api.post(`/routes/${routeId}/optimize`);
    return response.data;
  },
};

// Vehicles API
export const vehiclesAPI = {
  getAll: async () => {
    const response = await api.get('/vehicles');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  create: async (vehicleData: {
    licensePlate: string;
    manufacturer: string;
    model: string;
    year: number;
    fuelType: 'GASOLINE' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
    capacity: number;
  }) => {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
  },

  update: async (id: string, vehicleData: Partial<Vehicle>) => {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  },

  updateLocation: async (id: string, location: { lat: number; lng: number }) => {
    const response = await api.put(`/vehicles/${id}/location`, location);
    return response.data;
  },
};

// Analytics API
export const analyticsAPI = {
  getDashboard: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  getRouteAnalytics: async (routeId: string) => {
    const response = await api.get(`/analytics/routes/${routeId}`);
    return response.data;
  },

  getVehicleAnalytics: async (vehicleId: string) => {
    const response = await api.get(`/analytics/vehicles/${vehicleId}`);
    return response.data;
  },

  getCarbonFootprint: async () => {
    const response = await api.get('/analytics/carbon-footprint');
    return response.data;
  },

  getEfficiencyMetrics: async () => {
    const response = await api.get('/analytics/efficiency');
    return response.data;
  },

  create: async (analyticsData: {
    routeId?: string;
    vehicleId?: string;
    metricType: 'FUEL_CONSUMPTION' | 'CARBON_FOOTPRINT' | 'DISTANCE' | 'TIME' | 'EFFICIENCY';
    value: number;
    unit: string;
  }) => {
    const response = await api.post('/analytics', analyticsData);
    return response.data;
  },

  getAll: async (filters?: {
    routeId?: string;
    vehicleId?: string;
    metricType?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await api.get('/analytics', { params: filters });
    return response.data;
  },

  getSummary: async (period: 'week' | 'month' | 'year' = 'month') => {
    const response = await api.get('/analytics/summary', { params: { period } });
    return response.data;
  },
};

// Deliveries API
export const deliveriesAPI = {
  getAll: async () => {
    const response = await api.get('/deliveries');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/deliveries/${id}`);
    return response.data;
  },

  create: async (deliveryData: {
    routeId: string;
    vehicleId?: string;
    driverId?: string;
  }) => {
    const response = await api.post('/deliveries', deliveryData);
    return response.data;
  },

  update: async (id: string, deliveryData: Partial<Delivery>) => {
    const response = await api.put(`/deliveries/${id}`, deliveryData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/deliveries/${id}`);
    return response.data;
  },
};

// Real-time updates (WebSocket)
export const realTimeAPI = {
  connect: (onMessage: (data: any) => void) => {
    const ws = new WebSocket('ws://localhost:3001');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return ws;
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api; 