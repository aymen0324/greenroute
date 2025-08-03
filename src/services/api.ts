import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  subscriptionTier: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
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
  distanceKm?: number;
  estimatedDurationMinutes?: number;
  fuelConsumptionLiters?: number;
  co2EmissionsKg?: number;
  costEuros?: number;
  status: string;
  optimizationLevel?: number;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  manufacturer: string;
  year: number;
  fuelType?: string;
  status: string;
  currentLocationLat?: number;
  currentLocationLng?: number;
  totalKmDriven?: number;
}

export interface Delivery {
  id: string;
  trackingNumber: string;
  routeId: string;
  vehicleId?: string;
  driverId: string;
  pickupLocationLat: number;
  pickupLocationLng: number;
  pickupLocationAddress: string;
  deliveryLocationLat: number;
  deliveryLocationLng: number;
  deliveryLocationAddress: string;
  status: string;
  priority: string;
  scheduledPickup?: string;
  scheduledDelivery?: string;
  customerName?: string;
  customerEmail?: string;
}

export interface Analytics {
  id: string;
  routeId?: string;
  vehicleId?: string;
  metricType: string;
  value: number;
  unit: string;
  date: string;
}

// API Service Class
class ApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        // Commented out for public site - no authentication required
        // if (error.response?.status === 401) {
        //   this.logout();
        // }
        return Promise.reject(error);
      }
    );

    // Load token from localStorage
    this.token = localStorage.getItem('authToken');
  }

  // Authentication
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  logout() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await this.api.post('/api/auth/login', { email, password });
      const { user, token } = response.data.data;
      this.setToken(token);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(userData: { email: string; password: string; name: string }): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await this.api.post('/api/auth/register', userData);
      const { user, token } = response.data.data;
      this.setToken(token);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await this.api.get('/api/auth/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get user data');
    }
  }

  // Routes endpoints
  async getRoutes(): Promise<ApiResponse<Route[]>> {
    try {
      const response = await this.api.get('/api/routes');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch routes');
    }
  }

  async createRoute(routeData: Partial<Route>): Promise<ApiResponse<Route>> {
    try {
      const response = await this.api.post('/api/routes', routeData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create route');
    }
  }

  async updateRoute(id: string, routeData: Partial<Route>): Promise<ApiResponse<Route>> {
    try {
      const response = await this.api.put(`/api/routes/${id}`, routeData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update route');
    }
  }

  async deleteRoute(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await this.api.delete(`/api/routes/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete route');
    }
  }

  // Vehicles endpoints
  async getVehicles(): Promise<ApiResponse<Vehicle[]>> {
    try {
      const response = await this.api.get('/api/vehicles');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch vehicles');
    }
  }

  async createVehicle(vehicleData: Partial<Vehicle>): Promise<ApiResponse<Vehicle>> {
    try {
      const response = await this.api.post('/api/vehicles', vehicleData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create vehicle');
    }
  }

  async updateVehicleLocation(id: string, location: { lat: number; lng: number }): Promise<ApiResponse<Vehicle>> {
    try {
      const response = await this.api.patch(`/api/vehicles/${id}/location`, location);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update vehicle location');
    }
  }

  // Deliveries endpoints
  async getDeliveries(): Promise<ApiResponse<Delivery[]>> {
    try {
      const response = await this.api.get('/api/deliveries');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch deliveries');
    }
  }

  async createDelivery(deliveryData: Partial<Delivery>): Promise<ApiResponse<Delivery>> {
    try {
      const response = await this.api.post('/api/deliveries', deliveryData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create delivery');
    }
  }

  async updateDeliveryStatus(id: string, status: string): Promise<ApiResponse<Delivery>> {
    try {
      const response = await this.api.patch(`/api/deliveries/${id}/status`, { status });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update delivery status');
    }
  }

  // Analytics endpoints
  async getAnalytics(filters?: { routeId?: string; vehicleId?: string; metricType?: string }): Promise<ApiResponse<Analytics[]>> {
    try {
      const params = new URLSearchParams();
      if (filters?.routeId) params.append('routeId', filters.routeId);
      if (filters?.vehicleId) params.append('vehicleId', filters.vehicleId);
      if (filters?.metricType) params.append('metricType', filters.metricType);

      const response = await this.api.get(`/api/analytics?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch analytics');
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    try {
      const response = await this.api.get('/health');
      return response.data;
    } catch (error: any) {
      throw new Error('Backend service unavailable');
    }
  }

  // Real-time socket connection helper
  getSocketUrl(): string {
    return import.meta.env.VITE_API_URL?.replace('http', 'ws') || 'ws://localhost:3001';
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
