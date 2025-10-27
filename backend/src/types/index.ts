/**
 * @summary
 * Global TypeScript type definitions
 *
 * @module types
 */

/**
 * @interface PaginationParams
 * @description Standard pagination parameters
 *
 * @property {number} [page] - Page number (default: 1)
 * @property {number} [pageSize] - Items per page (default: 50)
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

/**
 * @interface PaginatedResponse
 * @description Standard paginated response structure
 *
 * @property {T[]} data - Array of items
 * @property {number} total - Total number of items
 * @property {number} page - Current page number
 * @property {number} pageSize - Items per page
 * @property {boolean} hasNext - Whether there is a next page
 * @property {boolean} hasPrevious - Whether there is a previous page
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * @interface BaseEntity
 * @description Base entity structure with common fields
 *
 * @property {number} id - Unique identifier
 * @property {Date} dateCreated - Creation timestamp
 * @property {Date} dateModified - Last modification timestamp
 * @property {boolean} deleted - Soft delete flag
 */
export interface BaseEntity {
  id: number;
  dateCreated: Date;
  dateModified: Date;
  deleted: boolean;
}
