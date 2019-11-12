// tests for api/people

// need to add supertest to the dependencies
const request = require('supertest');
const { app } = require('./../server/app.js');
const { db, Dish, Person } = require('./../db/index.js');

beforeEach(async done => {
  // wipe the db before each test
  await db.sync({ force: true });
  done();
});
afterAll(async done => {
  // close the db connection
  await db.close();
  done();
});
describe('/api/people routes', () => {
  describe('GET to /api/people', () => {
    it('should retrieve all people if no params are given', () => {});
    it('should filter users by the isAttending filter', () => {});
  });
  describe('POST to /api/people', () => {
    it('should create a new person if all the required information is given', () => {});
    it('should return status code 400 if missing required information', () => {});
  });
  describe('PUT to /api/people/:id', () => {
    it('should update a persons information', () => {});
    it('should return a 400 if given an invalid id', () => {});
  });
  describe('DELETE to /api/people/:id', () => {
    it('should remove a person from the database');
    it('should return a 400 if given an invalid id', () => {});
  });
});
