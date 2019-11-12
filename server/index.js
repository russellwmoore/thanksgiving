const express = require("express");
const app = express();
const PORT = 3000;
const chalk = require("chalk");

const { db, Person, Dish } = require("../db");
const { doSeed } = require("../seed");

app.use(express.json());

app.use((req, res, next) => {
  console.log(
    chalk.cyan(req.method),
    chalk.bgWhite.blue(req.url),
    "body",
    req.body
  );
  next();
});

app.get("/api/people", (req, res, next) => {
  Person.findAll({ include: [{ model: Dish }] })
    .then(people => res.send(people))
    .catch(next);
});

app.get("/api/people/attending", (req, res, next) => {
  Person.findAll({ where: { isAttending: true } })
    .then(people => res.send(people))
    .catch(next);
});

// get all dishes that are going to be at thanksgiving
app.get("/api/people/dishes", async (req, res, next) => {
  try {
    const dishes = await Dish.findAll({
      include: [{ model: Person, where: { isAttending: true } }]
    });
    res.send(dishes);
  } catch (e) {
    next(e);
  }
});

app.get("/api/people/:id", (req, res, next) => {
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

app.put("/api/people/:id", (req, res, next) => {
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

app.delete("/api/people/:id", (req, res, next) => {
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

app.post("/api/people", (req, res, next) => {
  Person.create(req.body)
    .then(person => res.send(person))
    .catch(next);
});

app.get("/api/dishes", (req, res, next) => {
  Dish.findAll({ include: [{ model: Person }] })
    .then(dish => res.send(dish))
    .catch(next);
});

app.get("/api/dishes/:id", (req, res, next) => {
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

app.put("/api/dishes/:id", (req, res, next) => {
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

app.post("/api/dishes", (req, res, next) => {
  Dish.create(req.body)
    .then(dish => res.send(dish))
    .catchs(next);
});

app.delete("/api/dishes/:id", (req, res, next) => {
  Dish.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(rows => res.send(`deleted ${req.params.id}, ${rows}`))
    .catch(next);
});

app.use((err, req, res, next) => {
  if (err.status !== 500) {
    res.send({ message: "Oops! There's an error on the server", error: err });
  } else {
    res.send(err);
  }
});

db.sync({ force: true }).then(() => {
  doSeed().then(() => {
    app.listen(PORT, () => {
      console.log("listenin");
    });
  });
});
