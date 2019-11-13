const router = require("express").Router();
const { Person, Dish } = require("../../db");

router.get("/", (req, res, next) => {
  console.log("hello");
  const { is_attending } = req.query;
  whereObj = {};
  if (is_attending) {
    is_attending === "true"
      ? (whereObj.isAttending = true)
      : (whereObj.isAttending = false);
  }
  Person.findAll({ where: whereObj, include: [{ model: Dish }] })
    .then(people => res.send(people))
    .catch(next);
});

router.get("/dishes", async (req, res, next) => {
  try {
    const dishes = await Dish.findAll({
      include: [{ model: Person, where: { isAttending: true } }]
    });
    res.send(dishes);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", (req, res, next) => {
  Person.findByPk(req.params.id)
    .then(person => {
      if (!person) {
        next("No person exists");
      } else {
        res.send(person);
      }
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  Person.findByPk(req.params.id)
    .then(person => {
      if (!person) {
        next("no such person to edit!");
      } else {
        person.update(req.body).then(updated => res.send(updated));
      }
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Person.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(rows => {
      if (rows) {
        res.send(`deleted ${req.params.id}, ${rows}`);
      } else {
        next("No one to  delete!");
      }
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Person.create(req.body)
    .then(person => res.send(person))
    .catch(next);
});

module.exports = router;
