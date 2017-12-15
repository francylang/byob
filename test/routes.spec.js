/* eslint-disable */
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server.js');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API routes', () => {

  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch((error) => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch((error) => {
        throw error;
      });
  });

  describe('POST /api/v1/user/authenticate', () => {

  })

  describe('GET /api/v1/games', () => {
    it('should return all games', () => {
      return chai.request(server)
        .get('/api/v1/games')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(20);
          response.body[0].should.have.property('game_title');
          response.body.includes('Mega Man X')
          response.body[0].should.have.property('game_image');
          response.body.includes('https://www.speedrun.com/themes/smo/cover-256.png')
          response.body[0].should.have.property('created_at');
          response.body[0].should.have.property('updated_at');
      });
    });

    it('should return a 404 if the path is incorrect', (done) => {
      chai.request(server)
        .get('/api/v1/wrongo')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/vi/records', () => {
    it('should return all of the game records', (done) => {
      chai.request(server)
        .get('/api/v1/records')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(5292);
          response.body[0].should.have.property('handle');
          response.body.includes('infinitemystery')
          response.body[0].should.have.property('rank');
          response.body.includes('1st')
          response.body[0].should.have.property('time');
          response.body.includes('3h 23m 33s')
          response.body[0].should.have.property('game_id');
          response.body.includes('10')
          response.body[0].should.have.property('created_at');
          response.body[0].should.have.property('updated_at');
        });
        done();
    });

    it('should return a 404 if the path is incorrect', (done) => {
      chai.request(server)
        .get('/api/v1/wrongo')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/v1/records/:id', () => {
    it('should retrieve a record based on the id', (done) => {
      chai.request(server)
        .get('/api/v1/records/:id')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('handle');
          response.body.includes({ handle: 'Dezanig' });
          response.body[0].should.have.property('rank');
          response.body.includes({ rank: '7th' });
          response.body[0].should.have.property('time');
          response.body.includes({ time: '1h 41m 41s' });
          response.body[0].should.have.property('game_id')
          response.body.includes({ game_id: 2 });
          response.body[0].should.have.property('created_at');
          response.body.includes({ created_at: '2017-12-12T22:08:49.706Z' });
          response.body[0].should.have.property('updated_at');
          response.body.includes({ created_at: '2017-12-12T22:08:49.706Z' });
        })
        done();
      })
    })

  describe('GET /api/v1/games/:id', () => {
    it('should retrieve a game based on the id', (done) => {
      chai.request(server)
        .get('/api/v1/games/:id')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('game_title')
          response.body[0].should.have.property('game_image')
          response.body[0].should.have.property('created_at');
          response.body[0].should.have.property('updated_at');
        })
        done();
      })
    });
});
