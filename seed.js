const { db, Person, Dish } = require('./db');

const peeps = ['Mark', 'Ryan', 'Eliot', 'Russell'];

const dishes = ['datTurkey', 'cranberry sauce', 'stuffing', 'pie'];

const doSeed = async () => {
  const peepsProms = peeps.map(peep => Person.create({ name: peep }));
  const dishProms = dishes.map(dish => Dish.create({ name: dish }));

  const [mark, ryan, eliot, russell] = await Promise.all(peepsProms);
  const [turk, sauce, stuff, pie] = await Promise.all(dishProms);

  await turk.update({ personId: mark.id });
  await sauce.update({ personId: ryan.id });
  await stuff.update({ personId: eliot.id });
};

module.exports = { doSeed };
