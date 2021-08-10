const { Breed, conn } = require('../../src/db.js');
const { expect } = require('chai');

const dog = {
  name: 'Bull Dog',
  weight: 15,
  temperament: ['Active'],
};

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Breed.sync({ force: true }),
    );
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Breed.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Breed.create({ name: 'Pug' });
      });
      it('Should not create with empty spaces', (done) => {
        Breed.create(dog)
        .then(() => done(new Error('Empty data')))
        .catch(() => done())
      }
      )
    });
  });
});
