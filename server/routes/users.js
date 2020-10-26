const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res, next) => {
  const { username, password, subscribedStock } = req.body;
  const newUser = new User({ username, password, subscribedStock });

  newUser.save()
    .then(() => res.json({ username, subscribedStock }))
    .catch(err => res.json({ error: true, message: "This username already exists!" }));
});

router.route('/signin').post((req, res) => {
  const { username, password } = req.body;

  User.find()
    .then(users => {
      return users.find(user => {
        return user.username === username && user.password === password;
      })
    })
    .then(foundUser => res.json({
      username: foundUser.username,
      subscribedStock: foundUser.subscribedStock
    }))
    .catch(err => res.json({ error: true, message: "Incorrect username or password!" }));
});

router.route('/subscribe').post((req, res) => {
  const { username, subscribedStock } = req.body;

  User.updateOne({ username }, { subscribedStock })
    .then(() => res.json({ subscribedStock }))
    .catch(err => res.json(err));
});

module.exports = router;