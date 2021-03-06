import { startCase } from "lodash";

_.defaults(Meteor.settings, { services: [] });
_.extend(LDAP_SETTINGS, Meteor.settings.ldap);

ServiceConfiguration.configurations.remove({});
Meteor.settings.services.forEach(config => {
  ServiceConfiguration.configurations.insert(config);
});

Accounts.config({
  forbidClientAccountCreation: true,
  restrictCreationByEmailDomain: Meteor.settings.restrictEmailDomain
});

// Ensure there's an admin account
Meteor.startup(function() {
  let adminUser = Accounts.findUserByUsername("admin");

  if (!adminUser) {
    adminUser = Accounts.createUser({
      username: "admin",
      password: "admin"
    });
  }

  Roles.addUsersToRoles(adminUser, "admin");
});

// Keep track of all LDAP groups
Accounts.onLogin(function() {
  var user = Meteor.user();
  var existingGroups = Groups.find().fetch();

  var newGroupNames = _.difference(
    user.groups,
    _.pluck(existingGroups, "name")
  );
  _.each(newGroupNames, function(groupName) {
    Groups.insert({ name: groupName });
  });
});

Accounts.onCreateUser(function(options, user) {
  if (user.services.google) {
    user.username = user.services.google.email;
    user.displayName = user.services.google.name;
  }
  if (user.services.github) {
    user.username = user.services.github.username;
  }
  if (user.services.facebook) {
    user.username = user.services.facebook.email;
    user.displayName = user.services.facebook.name;
  }

  return _.defaults(user, {
    profile: {},
    groups: Meteor.settings.defaultGroups || [],
    displayName: user.username
  });
});
