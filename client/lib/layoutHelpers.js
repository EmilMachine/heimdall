render = function(templateName) {
  return function() {
    BlazeLayout.render('layout', {main: templateName});
  }
}

loadHandler = function(TemplateClass) {
  TemplateClass.onCreated(function() {
    this.autorun( () => Session.set('isLoading', this.subscriptionsReady() === false) );
  });

  TemplateClass.onDestroyed(function() {
    Session.set('isLoading', false);
  });
}