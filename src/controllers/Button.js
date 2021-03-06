const models = require('../models');

const Button = models.Button;

const index = (req, res) => {
  if (!req.session.account) {
    return res.render('index', {
      account: req.session.account,
      csrfToken: req.csrfToken(),
    });
  }
  return Button.ButtonModel.findByOwner(req.session.account._id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occured' });
    }
    if (doc) {
      return res.render('index', {
        account: req.session.account,
        csrfToken: req.csrfToken(),
        makePage: false,
      });
    }
    return res.render('index', {
      account: req.session.account,
      csrfToken: req.csrfToken(),
      makePage: true,
    });
  });
};

const button = (req, res) => {
  Button.ButtonModel.findByOwner(req.session.account._id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occured' });
    }
    if (doc) {
      return res.render('button', {
        account: req.session.account,
        csrfToken: req.csrfToken(),
        makePage: false,
      });
    }
    return res.render('button', {
      account: req.session.account,
      csrfToken: req.csrfToken(),
      makePage: true,
    });
  });
};

const viewButton = (req, res) => {
  Button.ButtonModel.findByOwner(req.session.account._id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occured' });
    }
    if (doc) {
      return res.render('viewButton', {
        account: req.session.account,
        csrfToken: req.csrfToken(),
        button: doc,
        makePage: false,

      });
    }
    return res.render('viewButton', {
      account: req.session.account,
      csrfToken: req.csrfToken(),
      makePage: true,
    });
  });
};
const viewOthersButton = (req, res) => {
  const url = req.url;
  const realUrl = url.split('/', 3);
  Button.ButtonModel.findByName(realUrl[2], (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occured' });
    }
    if (doc) {
      return res.render('viewButton', {
        account: req.session.account,
        csrfToken: req.csrfToken(),
        button: doc,
        hideDelete: true,
      });
    }
    return res.render('viewButton', {
      account: req.session.account,
      csrfToken: req.csrfToken(),
      noButton: true,
    });
  });
};
const removeButton = (req, res) => {
  Button.ButtonModel.removeByOwner(req.session.account._id, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occured' });
    }
    return res.redirect('redirect');
  });
};
const pressButton = (req, res) => {
  Button.ButtonModel.findByName(req.body.name, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occured' });
    }
    if (!doc) {
      return res.json({ redirect: req.get('referer') });
    }
    const butt = doc;
    butt.presses++;
    if (butt.presses >= doc.goal) {
      butt.goalMet = true;
    }
    butt.save((er) => {
      if (er) {
        console.log(er);
        return res.status(400).json({ error: 'an error occured' });
      }
      return res.json({ redirect: req.get('referer') });
    });
    return null;
  });
};
const makeButton = (req, res) => {
  if (!req.body.name || !req.body.buttonText) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const buttonData = {
    name: req.body.name,
    presses: 0,
    innerText: req.body.buttonText,
    fillColor: req.body.fillColor,
    textColor: req.body.textColor,
    borderColor: req.body.borderColor,
    owner: req.session.account._id,
    goal: req.body.goal,
    reward: req.body.reward,
    goalMet: false,
  };

  const newButton = new Button.ButtonModel(buttonData);

  return newButton.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.json({ redirect: '/viewButton' });
  });
};

module.exports.makeButton = makeButton;
module.exports.button = button;
module.exports.home = index;
module.exports.viewButton = viewButton;
module.exports.removeButton = removeButton;
module.exports.pressButton = pressButton;
module.exports.viewOthersButton = viewOthersButton;
