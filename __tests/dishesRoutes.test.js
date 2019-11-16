// tests for /api/dishes

// supertest is a module that allows us to test our express server
const request = require('supertest');
const { app } = require('./../server/app.js');
const { db, Dish, Person } = require('./../db/index.js');

let mark, russell, ryan, turkey, pie;
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

beforeEach(async done => {
  // wipe the db before each test block
  await db.sync({ force: true });

  //create all people in the database
  [mark, russell, ryan] = await Promise.all(
    people.map(person => Person.create(person))
  );

  //create all food in the database
  [turkey, pie] = await Promise.all(dishes.map(dish => Dish.create(dish)));

  // set associations with magic methods
  await mark.setDish(turkey);
  await ryan.setDish(pie);

  done();
});
afterAll(async done => {
  // close the db connection upon completion of all tests
  await db.close();
  done();
});
describe('/api/dishes routes', () => {
  // its up to you to create the test conditions for /api/dishes
  // add as many tests as you feel necessary to fully cover each routes functionality
  describe('GET to /api/dishes', () => {
    it('should return all dishes', () => {
      return request(app)
        .get('/api/dishes')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBe(2);
          expect.arrayContaining([expect.objectContaining(turkey, pie)]);
        });
    });
  });

  describe('GET to /api/dishes/:id', () => {
    it('GETs a dish by its id', () => {
      return request(app)
        .get(`/api/dishes/${turkey.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(typeof response.body).toBe('object');
          expect(response.body).toEqual(
            expect.objectContaining({
              name: 'turkey',
              description: 'delicious briney turkey',
              personId: mark.id
            })
          );
        });
    });

    it('sends a 400 status if a dish does not exist', () => {
      return request(app)
        .get(`/api/dishes/65432`)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body).toEqual(
            expect.objectContaining({
              message: `Dish with id 65432 does not exist`
            })
          );
        });
    });
  });

  describe('POST to /api/dishes/', () => {
    it('creates a dish', () => {
      return request(app)
        .post('/api/dishes')
        .send({
          name: 'stuffing',
          description: 'Grandmas recipe'
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(response => {
          expect(response.body).toEqual(
            expect.objectContaining({
              name: 'stuffing',
              description: 'Grandmas recipe'
            })
          );
        });
    });
    it('returns error if not given correct information', () => {
      return request(app)
        .post('/api/dishes')
        .send({
          nameOfFood: 'stuffing',
          description: 'Grandmas recipe'
        })
        .expect('Content-Type', /json/)
        .expect(400);
      //How does this test pass? I'm not explicitely sending a 400 status in the route? I next the error to a custom error handler at the bottom of app.js!
    });
  });

  describe('PUT to /api/dishes/:id', () => {
    it('modifies an existing dish in the application', () => {
      return request(app)
        .put(`/api/dishes/${turkey.id}`)
        .send({
          description: 'All new updated delicious description'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).toEqual(
            expect.objectContaining({
              name: 'turkey',
              description: 'All new updated delicious description'
            })
          );
        });
    });

    it('returns a 400 if you try to modify a dish that does not exist', () => {
      return request(app)
        .put('/api/dishes/16457')
        .send({
          description: 'All new updated delicious description'
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body instanceof Error);
        });
    });
  });

  describe('DELETE to /api/dishes/:id', () => {
    it('should remove a dish from the database', () => {
      return request(app)
        .delete(`/api/dishes/${pie.id}`)
        .expect(204);
      //notice a 204 status code has no content!
    });

    it('should return a 400 if given an invalid id', () => {
      return request(app)
        .delete('/api/dishes/2987')
        .expect(400)
        .expect('Content-Type', /json/);
    });
  });
});
