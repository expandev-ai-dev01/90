import { Request, Response } from 'express';
import { errorResponse } from '@/middleware/crud';

/**
 * @summary
 * 404 Not Found middleware
 *
 * @function notFoundMiddleware
 * @module middleware/notFound
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 *
 * @returns {void}
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json(
    errorResponse('Route not found', {
      path: req.path,
      method: req.method,
    })
  );
}
