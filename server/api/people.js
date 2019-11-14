const router = require('express').Router();
const { Person, Dish } = require('../../db');

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#routers

router.get('/', (req, res, next) => {
  const whereObj = {};
  const includeArr = [];
  if (req.query.is_attending) {
    whereObj.isAttending = req.query.is_attending === 'true' ? true : false;
  }
  if (req.query.include_dishes && req.query.include_dishes === 'true') {
    includeArr.push({ model: Dish });
  }
  Person.findAll({ where: whereObj, include: includeArr }).then(people => {
    res.send(people);
  });
});

module.exports = router;
