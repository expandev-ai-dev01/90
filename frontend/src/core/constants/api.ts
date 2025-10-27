/**
 * @constants api
 * @summary API endpoint constants
 * @domain core
 * @category api
 */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/security/login',
    LOGOUT: '/security/logout',
    REFRESH: '/security/refresh',
  },
  CLIENTS: '/client',
  APPOINTMENTS: '/appointment',
  SERVICES: '/service',
  PROFESSIONALS: '/professional',
  PAYMENTS: '/payment',
} as const;
