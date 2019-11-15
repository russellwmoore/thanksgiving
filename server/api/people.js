const router = require("express").Router();
const { Person, Dish } = require("../../db");

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#routers

// It's helpful to have a little description of each route
// Especially when your APIs get more complicated in the future

/* 
@Route: GET to /api/people
@Desc: Get all the users from the db
@Access: Public
*/
router.get("/", (req, res, next) => {
  const whereObj = {};
  const includeArr = [];
  if (req.query.is_attending) {
    whereObj.isAttending = req.query.is_attending === "true" ? true : false;
  }
  if (req.query.include_dishes && req.query.include_dishes === "true") {
    includeArr.push({ model: Dish });
  }
  Person.findAll({ where: whereObj, include: includeArr }).then(people => {
    res.send(people);
  });
});

/* 
@Route: POST to /api/people
@Desc: Add a new user to the db
@Access: Public
*/
router.post("/", (req, res, next) => {
  const userInfo = req.body;
  const errors = {};
  // basic validation can be handled on the front end
  // but its always neccessary to have checks on the backend as well because the frontend is very insecure.
  if (!userInfo.name) {
    errors.name = "Name not found";
    return res.status(400).send(errors);
  }
  Person.create(userInfo)
    .then(createdPerson => {
      res.status(201).send(createdPerson);
    })
    .catch(next);
});

/* 
@Route: PUT to /api/people/:id
@Desc: Modify a users data based on their id
@Access: Public
*/
router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  const updateObj = req.body;
  const errors = {};
  if (isNaN(id)) {
    errors.id = "Invalid type for person id.";
    // we return res on error so that nothing below this line runs
    return res.status(400).send(errors);
  }
  // note: Sequelize automagically coerces strings to numbers when needed but it's still good practice to make sure all your values are of the correct type.
  id = parseInt(id);
  Person.findOne({ where: { id } })
    .then(person => {
      // sequelize will return null if there is no matching entries in the table.
      if (!person) {
        errors.id = "Person not found.";
        // if we have a validation error we want to go straight to the catch block
        return Promise.reject();
      }
      return person.update(updateObj);
    })
    .then(() => {
      res.status(200).send({ message: "Person successfully updated." });
    })
    .catch(err => {
      // sequelize error
      if (err) {
        next(err);
      } else {
        // validation errors
        res.status(400).send(errors);
      }
    });
});

/* 
@Route: DELETE to /api/people/:id
@Desc: Delete a users data based on their id
@Access: Public
*/
router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  const errors = {};
  // the validatin logic is almost exactly the same as the PUT routes
  if (isNaN(id)) {
    errors.id = "Invalid type for person id.";
    return res.status(400).send(errors);
  }
  id = parseInt(id);
  Person.destroy({ where: { id } })
    .then(wasDeleted => {
      // the destroy method returns a 1 on success and 0 if nothing was deleted
      if (!wasDeleted) {
        errors.id = "Person not found.";
        return res.status(400).send(errors);
      }
      res.status(200).send({ message: "Person successfully removed." });
    })
    .catch(next);
});

module.exports = router;
