const models = require('../models');

const Account = models.Account;

const signupPage = (req, res) => {
    res.render('signup');
}
const logout = (req,res) => {
    req.session.destroy();
    res.redirect('/');
};

const login = (request, response) => {
    const req = request;
    const res = response;

    const username = `${req.body.username}`;
    const password = `${req.body.pass}`;

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
  
    return Account.AccountModel.authenticate(username, password, (err, account) => {
        if (err || !account) {
         return res.status(400).json({ error: 'Wrong username or password' });
        }

    req.session.account = Account.AccountModel.toAPI(account);
    //redirect to current button creation/ownership page
    return res.json({ redirect: '/'});
  });
};
const signup = (request, response) => {
  const req = request;
  const res = response;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    newAccount.save((err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occured' });
      }

      req.session.account = Account.AccountModel.toAPI(newAccount);
      //redirect to current button creation/ownership page
      return res.json({ redirect: '/'});
    });
  });
};

const user = (req, res) =>{
  if(req.session && req.session.account)
  {
    return res.json({username: true, account: req.session.account});
  }
  return res.json({username: false});
}

module.exports.user = user;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
