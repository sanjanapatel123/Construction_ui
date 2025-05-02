export const ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  SUPERVISOR: 'supervisor',
  WORKER: 'worker'
};

export const ROUTES_ACCESS = {
  [ROLES.SUPERADMIN]: ['/super-admin-dashboard',
    '/Plan-Package',
    '/Plan-request',
    '/user-info',
    '/super-admin-setting',

  ], // All routes
  [ROLES.ADMIN]: [
   
    '/safety-compliance-dashboard',
    '/user-management',
    '/settings',
    // Add all admin accessible routes except superadmin routes
  ],
  [ROLES.SUPERVISOR]: [
    '/dashboard',
    '/safety-compliance-dashboard',
    '/swms',
    '/inductions',
    '/incident-reports',
    // Add supervisor specific routes
  ],
  [ROLES.WORKER]: [
    '/dashboard',
    '/swms',
    '/incident-reports',
    '/toolbox',
    // Add worker specific routes
  ]
};