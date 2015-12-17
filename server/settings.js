_.extend(LDAP_SETTINGS, {
  allowedGroups: ['risk', 'risk.e', 'product', 'dispute.resolutions.mgmt'],
  
  roleMapping: {
    admin: ['risk.infrastructure']
  },

  guestUser: {
    username: 'guest',
    password: 'guest',
    displayName: 'Guest User',
    groups: ['heimdall.debug'],
  }
});