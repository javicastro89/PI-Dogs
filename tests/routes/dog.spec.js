/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'New Dog',
  weight: 15,
  height: 20,
  temperament: ['Active'],
  life_span: 12
};
const badDog = {
  name: ''
}

describe('Breeds routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Breed.sync({ force: true })
    .then(() => Breed.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
    it('Should get 200 for dog detail', () =>
       agent.get('/dogs/1').expect(200)
    )
    it('Should get 400 for post', () =>
      agent.post('/dog')
      .send(badDog)
      .expect(400)
    )
    it('Should get 200 for post', () =>
      agent.post('/dog')
      .send(dog)
      // .then(() => done())
      // .catch(() => done(new Error('It should create')))
      .expect(200)
    ) 
  });
});
