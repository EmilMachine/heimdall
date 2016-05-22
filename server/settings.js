_.extend(LDAP_SETTINGS, {
  allowedGroups: [
    'risk',
    'risk.e',
    'product',
    'dispute.resolutions.mgmt',
    'management',
    'us.leadership',
    'workforce.management',
    'finance',
    'heimdall.debug',
    'users'
  ],
  
  roleMapping: {
    admin: ['risk.infrastructure'],
    fullAccess: ['management']
  },

  guestUser: {
    username: 'guest',
    password: 'guest',
    displayName: 'Guest User',
    groups: ['heimdall.debug'],
  }
});