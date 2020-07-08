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
  const subscribedStock = req.body.subscribedStock;

  const newUser = new User({ username, password, subscribedStock });

  newUser.save()
    .then(() => res.json({ username, subscribedStock }))
    .catch(err => res.json(err));
});

router.route('/signin').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.find()
    .then(users => {
      return users.filter(user => {
        return user.username === username && user.password === password;
      })
    })
    .then(filteredUser => res.json({
      username: filteredUser[0].username,
      subscribedStock: filteredUser[0].subscribedStock
    }))
    .catch(err => res.json({ error: true, message: "Incorrect username or password!" }));
});

router.route('/subscribe').post((req, res) => {
  const username = req.body.username;
  const subscribedStock = req.body.subscribedStock;

  User.updateOne({ username }, { subscribedStock })
    .then(() => res.json({ subscribedStock }))
    .catch(err => res.json(err));

  // var query = {'username': req.user.username};

  // req.newData.username = req.user.subscribedStock;
  
  // MyModel.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
  //     if (err) return res.send(500, {error: err});
  //     return res.json( { subscribedStock: req.user.subscribedStock });
  // });
});

module.exports = router;