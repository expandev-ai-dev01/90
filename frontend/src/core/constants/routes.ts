/**
 * @constants routes
 * @summary Application route constants
 * @domain core
 * @category navigation
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  CLIENTS: '/dashboard/clients',
  APPOINTMENTS: '/dashboard/appointments',
  SERVICES: '/dashboard/services',
  PROFESSIONALS: '/dashboard/professionals',
  PAYMENTS: '/dashboard/payments',
  REPORTS: '/dashboard/reports',
  SETTINGS: '/dashboard/settings',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];
