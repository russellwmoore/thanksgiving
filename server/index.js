const { app } = require('./app');
const PORT = 3000;
const { db, Person, Dish } = require('../db');

async function syncAndSeedDatabase() {
  try {
    await db.sync({ force: true });
    const people = [
      { name: 'mark', isAttending: true },
      { name: 'russell', isAttending: false },
      { name: 'ryan', isAttending: true }
    ];

    const dishes = [
      {
        name: 'turkey',
        description: 'delicious briney turkey'
      },
      { name: 'pie', description: 'delicious pumpkiney pie' }
    ];
    const [mark, russell, ryan] = await Promise.all(
      people.map(person => Person.create(person))
    );

    const [turkey, pie] = await Promise.all(
      dishes.map(dish => Dish.create(dish))
    );

    await mark.setDish(turkey);
    await ryan.setDish(pie);
  } catch (e) {
    console.log(e);
  }

  console.log('done seeding and associating!');
}

syncAndSeedDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
