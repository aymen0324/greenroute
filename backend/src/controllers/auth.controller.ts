import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logger } from '../config/logger-simple';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

// Mock user database - replace with real database implementation
const users: any[] = [];

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'user' | 'admin' | 'driver';
}

interface LoginRequest {
  email: string;
  password: string;
}

export class AuthController {
  // Register new user
  static async register(req: Request<{}, {}, RegisterRequest>, res: Response) {
    try {
      const { name, email, password, phone, role = 'user' } = req.body;

      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and password are required'
        });
      }

      // Check if user already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newUser = {
        id: userId,
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      };

      users.push(newUser);

      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
      const token = jwt.sign(
        { 
          userId: newUser.id, 
          email: newUser.email, 
          role: newUser.role 
        },
        jwtSecret,
        { expiresIn: '7d' }
      );

      logger.info(`New user registered: ${email}`);

      // Return user data (excluding password)
      const { password: _, ...userWithoutPassword } = newUser;
      
      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: userWithoutPassword,
          token
        }
      });

    } catch (error) {
      logger.error('Registration error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during registration'
      });
    }
  }

  // Login user
  static async login(req: Request<{}, {}, LoginRequest>, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // Find user
      const user = users.find(u => u.email === email.toLowerCase());
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Account is deactivated. Please contact support.'
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        jwtSecret,
        { expiresIn: '7d' }
      );

      // Update last login
      user.lastLogin = new Date();

      logger.info(`User logged in: ${email}`);

      // Return user data (excluding password)
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: userWithoutPassword,
          token
        }
      });

    } catch (error) {
      logger.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during login'
      });
    }
  }

  // Get user profile
  static async getProfile(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedRequest;
      const userId = authReq.user?.userId;
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const user = users.find(u => u.id === userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Return user data (excluding password)
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(200).json({
        success: true,
        data: userWithoutPassword
      });

    } catch (error) {
      logger.error('Get profile error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update user profile
  static async updateProfile(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedRequest;
      const userId = authReq.user?.userId;
      const { name, phone } = req.body;
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Update user data
      if (name) users[userIndex].name = name;
      if (phone !== undefined) users[userIndex].phone = phone;
      users[userIndex].updatedAt = new Date();

      logger.info(`User profile updated: ${users[userIndex].email}`);

      // Return updated user data (excluding password)
      const { password: _, ...userWithoutPassword } = users[userIndex];
      
      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: userWithoutPassword
      });

    } catch (error) {
      logger.error('Update profile error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Change password
  static async changePassword(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedRequest;
      const userId = authReq.user?.userId;
      const { currentPassword, newPassword } = req.body;
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password and new password are required'
        });
      }

      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const user = users[userIndex];

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }

      // Hash new password
      const saltRounds = 12;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      users[userIndex].password = hashedNewPassword;
      users[userIndex].updatedAt = new Date();

      logger.info(`Password changed for user: ${user.email}`);

      return res.status(200).json({
        success: true,
        message: 'Password changed successfully'
      });

    } catch (error) {
      logger.error('Change password error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}
