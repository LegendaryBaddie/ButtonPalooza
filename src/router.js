const controllers = require('./controllers');

const router = (app) => {
    //app.get('/signup', controllers.Account.signupPage);
    app.post('/signup', controllers.Account.signup);
    app.post('/login', controllers.Account.login);
    app.get('/logout', controllers.Account.logout);
    app.get('/user', controllers.Account.user);
    //app.get('/', controllers.index);
}

module.exports = router;