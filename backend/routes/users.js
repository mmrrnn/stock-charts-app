const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const subscribedStockCharts = req.body.subscribedStockCharts;

  const newUser = new User({ username, password, subscribedStockCharts });
  
  newUser.save()
    .then(() => res.json({ username, subscribedStockCharts }))
    .catch(err => res.status(500).json({ error: true, message: "This username already exists!" }));
});

module.exports = router;