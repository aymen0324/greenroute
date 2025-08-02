import { Router } from 'express';
import {
  getAllRoutes,
  createRoute,
  getRoute,
  updateRoute,
  deleteRoute,
  AuthRequest
} from '../controllers/routes.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateRoute } from '../middleware/validation.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/routes - Get all routes for authenticated user
router.get('/', (req, res, next) => getAllRoutes(req as AuthRequest, res, next));

// POST /api/routes - Create new route
router.post('/', validateRoute, (req, res, next) => createRoute(req as AuthRequest, res, next));

// GET /api/routes/:id - Get specific route
router.get('/:id', (req, res, next) => getRoute(req as AuthRequest, res, next));

// PUT /api/routes/:id - Update route
router.put('/:id', validateRoute, (req, res, next) => updateRoute(req as AuthRequest, res, next));

// DELETE /api/routes/:id - Delete route
router.delete('/:id', (req, res, next) => deleteRoute(req as AuthRequest, res, next));

export default router;
