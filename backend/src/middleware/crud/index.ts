/**
 * @summary
 * CRUD middleware utilities for standardized API responses
 *
 * @module middleware/crud
 */

/**
 * @interface SuccessResponse
 * @description Standard success response structure
 *
 * @property {boolean} success - Success flag (always true)
 * @property {T} data - Response data
 * @property {object} [metadata] - Optional metadata
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    timestamp: string;
    [key: string]: any;
  };
}

/**
 * @interface ErrorResponse
 * @description Standard error response structure
 *
 * @property {boolean} success - Success flag (always false)
 * @property {object} error - Error details
 * @property {string} error.message - Error message
 * @property {any} [error.details] - Additional error details
 */
export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * @summary
 * Creates a standardized success response
 *
 * @function successResponse
 * @module middleware/crud
 *
 * @param {T} data - Response data
 * @param {object} [metadata] - Optional metadata
 *
 * @returns {SuccessResponse<T>} Standardized success response
 *
 * @example
 * res.json(successResponse({ id: 1, name: 'John' }));
 */
export function successResponse<T>(data: T, metadata?: any): SuccessResponse<T> {
  return {
    success: true,
    data,
    metadata: {
      timestamp: new Date().toISOString(),
      ...metadata,
    },
  };
}

/**
 * @summary
 * Creates a standardized error response
 *
 * @function errorResponse
 * @module middleware/crud
 *
 * @param {string} message - Error message
 * @param {any} [details] - Additional error details
 *
 * @returns {ErrorResponse} Standardized error response
 *
 * @example
 * res.status(400).json(errorResponse('Invalid input'));
 */
export function errorResponse(message: string, details?: any): ErrorResponse {
  return {
    success: false,
    error: {
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary
 * Standard general error for unhandled exceptions
 */
export const StatusGeneralError = {
  statusCode: 500,
  message: 'Internal Server Error',
};
