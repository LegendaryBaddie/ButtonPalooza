const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/button', mid.requiresLogin, controllers.Button.button);
  app.post('/makeButton', mid.requiresLogin, controllers.Button.makeButton);
  app.get('/viewButton', mid.requiresLogin, controllers.Button.viewButton);
  app.get('/removeButton', mid.requiresLogin, controllers.Button.removeButton);
  app.post('pressButton', mid.requiresLogin, controllers.Button.pressButton);
  app.get('/redirect', controllers.Pages.redirect);
  app.get('/', mid.requiresSecure, controllers.Button.home);
};

module.exports = router;
