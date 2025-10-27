import { z } from 'zod';

/**
 * @summary
 * Zod validation utilities for common field types
 *
 * @module utils/zodValidation
 */

/**
 * String field with maximum length
 */
export const zString = (maxLength?: number) => {
  let schema = z.string().min(1, 'Field is required');
  if (maxLength) {
    schema = schema.max(maxLength, `Maximum length is ${maxLength}`);
  }
  return schema;
};

/**
 * Nullable string field with maximum length
 */
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength, `Maximum length is ${maxLength}`);
  }
  return schema.nullable();
};

/**
 * Name field (1-200 characters)
 */
export const zName = z.string().min(1, 'Name is required').max(200, 'Name too long');

/**
 * Description field (nullable, max 500 characters)
 */
export const zNullableDescription = z.string().max(500, 'Description too long').nullable();

/**
 * Foreign key field (positive integer)
 */
export const zFK = z.number().int().positive('Invalid ID');

/**
 * Nullable foreign key field
 */
export const zNullableFK = z.number().int().positive('Invalid ID').nullable();

/**
 * Bit field (0 or 1)
 */
export const zBit = z.number().int().min(0).max(1);

/**
 * Date string field (ISO 8601 format)
 */
export const zDateString = z.string().datetime();

/**
 * Email field
 */
export const zEmail = z.string().email('Invalid email format');

/**
 * Phone field (nullable)
 */
export const zNullablePhone = z.string().max(20, 'Phone number too long').nullable();

/**
 * Decimal field (for prices, amounts)
 */
export const zDecimal = z.number().nonnegative('Value must be non-negative');

/**
 * Nullable decimal field
 */
export const zNullableDecimal = z.number().nonnegative('Value must be non-negative').nullable();
