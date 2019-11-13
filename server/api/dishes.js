const router = require("express").Router();
const { Dish, Person } = require("../../db");

router.get("/", (req, res, next) => {
  Dish.findAll({ include: [{ model: Person }] })
    .then(dish => res.send(dish))
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Dish.findByPk(req.params.id)
    .then(dish => {
      if (!dish) {
        next(`No dish with id : ${req.params.id}`);
      } else {
        res.send(dish);
      }
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  Dish.findByPk(req.params.id)
    .then(dish => {
      if (!dish) {
        next(`No dish with id : ${req.params.id}`);
      } else {
        dish.update(req.body).then(updated => {
          res.send(updated);
        });
      }
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Dish.create(req.body)
    .then(dish => res.send(dish))
    .catch(next);
});

router.delete("/:id", async (req, res, next) => {
  let dish = await Dish.findByPk(req.params.id);
  if (dish.personId === null) {
    await dish.destroy();
    res.send(`${dish.name} Detroyed`);
  } else {
    res.send("cannont destroy dish that is coming to tgives!");
  }
});

module.exports = router;
