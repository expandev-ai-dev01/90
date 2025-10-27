/**
 * @utility isValidEmail
 * @summary Validates if a string is a valid email address
 * @domain core
 * @category validation
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
