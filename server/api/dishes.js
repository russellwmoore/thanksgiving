const router = require("express").Router();
const { Dish, Person } = require("../../db");

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#router

/*
@Route: GET to /api/dishes
@Desc: Get all the dishes from the db
@Access: Public
*/
// We'll use async await on these routes instead of promises just to see how they look. We'll need to use a `try/catch` block instead of .catch implementation of promises.

router.get("/", async (req, res, next) => {
  try {
    const dishes = await Dish.findAll();
    res.send(dishes);
  } catch (error) {
    next(error);
  }
});

/*
@Route: GET to /api/dishes/:id
@Desc: Get dishes with :id from the db
@Access: Public
*/

router.get("/:id", async (req, res, next) => {
  try {
    const dish = await Dish.findByPk(req.params.id);
    if (!dish) {
      res
        .status(400)
        .send({ message: `Dish with id ${req.params.id} does not exist` });
    } else {
      res.send(dish);
    }
  } catch (error) {
    next(error);
  }
});

/*
@Route: POST to /api/dishes
@Desc: Add a new dish to the db
@Access: Public
*/

router.post("/", async (req, res, next) => {
  const newDish = {
    name: req.body.name,
    description: req.body.description
  };
  try {
    const createdDish = await Dish.create(newDish);
    res.status(201).send(createdDish);
  } catch (error) {
    next(error);
  }
});

/*
@Route: PUT to /api/dishes/:id
@Desc: Modifies a dish in the db
@Access: Public
*/

router.put("/:id", async (req, res, next) => {
  // Using the instance update method here.
  try {
    const dishToBeEdited = await Dish.findByPk(req.params.id);
    if (!dishToBeEdited) {
      res
        .status(400)
        .send({ message: `Dish with id ${req.params.id} does not exist` });
    } else {
      const updated = await dishToBeEdited.update(req.body);
      res.status(200).send(updated);
    }
  } catch (error) {
    next(error);
  }
  // We can also do this with the class update method
  // try {
  //   const [numberOfRows, actualRows] = await Dish.update(req.body, {
  //     where: {
  //       id: req.params.id
  //     },
  //     returning: true,
  //     plain: true
  //   });
  //   res.status(200).send(actualRows);
  // } catch (error) {
  //   next(error);
  // }
});

/*
@Route: DELETE to /api/dishes/:id
@Desc: Destroys a dish in the db
@Access: Public
*/

router.delete("/:id", async (req, res, next) => {
  try {
    const dishToDestroy = await Dish.findByPk(req.params.id);
    if (!dishToDestroy) {
      res.status(400).send({ message: "No dish to delete" });
    } else {
      await dishToDestroy.destroy();
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }

  // try {
  //   const amountOfRowsDeleted = await Dish.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   });
  //   if (amountOfRowsDeleted !== 0) {
  //     res.sendStatus(204);
  //   } else {
  //     res.status(400).send({ message: 'No dish to delete' });
  //   }
  // } catch (error) {
  //   next(error);
  // }
});

module.exports = router;
