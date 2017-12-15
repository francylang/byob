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
  let token;

  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch((error) => {
        throw error;
      });
    chai.request(server)
      .post('/api/v1/authenticate')
      .send({ email: 'francy@turing.io', appName: 'SpeedRun' })
      .end((error, response) => token = response.body.token);
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch((error) => {
        throw error;
      });
  });

  describe('POST /api/v1/user/authenticate', () => {

  });

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
          response.body.includes('Mega Man X');
          response.body[0].should.have.property('game_image');
          response.body.includes('https://www.speedrun.com/themes/smo/cover-256.png');
          response.body[0].should.have.property('created_at');
          response.body[0].should.have.property('updated_at');
          // done();
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
          response.body.includes('infinitemystery');
          response.body[0].should.have.property('rank');
          response.body.includes('1st');
          response.body[0].should.have.property('time');
          response.body.includes('3h 23m 33s');
          response.body[0].should.have.property('game_id');
          response.body.includes('10');
          response.body[0].should.have.property('created_at');
          response.body[0].should.have.property('updated_at');
          done();
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

  describe('GET /api/v1/records/:id', () => {
    it('should retrieve a record based on the id', (done) => {
      chai.request(server)
        .get('/api/v1/records/7')
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
          response.body[0].should.have.property('game_id');
          response.body.includes({ game_id: 2 });
          response.body[0].should.have.property('created_at');
          response.body.includes({ created_at: '2017-12-12T22:08:49.706Z' });
          response.body[0].should.have.property('updated_at');
          response.body.includes({ created_at: '2017-12-12T22:08:49.706Z' });
        });
      done();
    });
  });

  describe('GET /api/v1/games/:id', () => {
    it('should retrieve a game based on the id', (done) => {
      chai.request(server)
        .get('/api/v1/games/7')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('game_title');
          response.body.includes({ game_title: 'Super Mario Bros.' });
          response.body[0].should.have.property('game_image');
          response.body.includes({ game_image: 'https://www.speedrun.com/themes/smb1/cover-256.png' });
          response.body[0].should.have.property('created_at');
          response.body.includes({ created_at: '2017-12-12T22:08:49.578Z' });
          response.body[0].should.have.property('updated_at');
          response.body.includes({ created_at: '2017-12-12T22:08:49.578Z' });
        });
      done();
    });
  });

  describe('GET /api/v1/games/:id/records', () => {
    it('should retrieve all records associated with a specific game', () => {
      chai.request(server)
        .get('/api/v1/games/10/records')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          // response.body.length.should.equal();
          response.body[0].should.have.property('handle');
          response.body.includes({ handle: 'LordOfSchnitzel' });
          response.body[0].should.have.property('rank');
          response.body.includes({ rank: '26th' });
          response.body[0].should.have.property('time');
          response.body.includes({ time: '1h 27m 30s' });
          response.body[0].should.have.property('game_id');
          response.body.includes({ game_id: 2 });
          response.body[0].should.have.property('created_at');
          response.body.includes({ created_at: '2017-12-12T22:08:51.135Z' });
          response.body[0].should.have.property('updated_at');
          response.body.includes({ created_at: '2017-12-12T22:08:51.135Z' });
        });
    });
  });

  describe('POST /api/v1/games/', () => {
    it('should be able to add a game to the database', () => {
      chai.request(server)
        .post('/api/v1/games')
        .send({
          // id: 21,
          game_title: 'Nickinator',
          game_image: 'https//:Nickinator.png',
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.have.property('game_title');
          response.body.should.have.property('game_image');
          chai.request(server)
            .get('/api/v1/games/')
            .end((error, response) => {
              response.body.should.be.a('array');
              response.body.length.should.equal(21);
            });
        });
    });

    it('should not be able to add a new game if a property is missing', () => {
      chai.request(server)
        .post('/api/v1/records')
        // .set('Authorization', token)
        .send({
          game_title: 'wow',
        })
        .end((error, response) => {
          response.should.have.status(422);
        });
    });
  });

  describe('POST /api/v1/records/', () => {
    it('should be able to add a record to the database', () => {
      chai.request(server)
        .post('/api/v1/records')
        .send({
          // id: 21,
          handle: 'Nickinator',
          rank: '1st',
          time: '00h 01m 01s',
          game_id: '22',
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.have.property('handle');
          response.body.should.have.property('rank');
          response.body.should.have.property('time');
          response.body.should.have.property('game_id');
          chai.request(server)
            .get('/api/v1/games/')
            .end((error, response) => {
              response.body.should.be.a('array');
              response.body.length.should.equal(4);
            });
        });
    });
  });

describe('PATCH /api/v1/games/:id', () => {
    const updateGames = {
      game_title: 'WinnerWinner',
    };

    it('should be able to update the body of a game object', () => {
      chai.request(server)
        .patch('/api/v1/games/1')
      // .set('Authorization', token)
        .send(updateGames)
        .end((error, response) => {
          response.should.have.status(204);
          chai.request(server)
            .get('/api/v1/games/1')
            .end((error, response) => {
              response.body.should.be.a('array');
              response.body[1].should.have.property('body');
              response.body[1].body.should.equal(updateGames.body);
          });
       });
    });
  });

  describe('PATCH /api/v1/records/:id', () => {
      const updateRecords = {
        rank: '3rd'
      };

      it.skip('should be able to update the body of a record object', (done) => {
        chai.request(server)
          .patch('/api/v1/records/1')
          // .set('Authorization', token)
          .send(updateGames)
          .end((error, response) => {
            response.should.have.status(204);
            chai.request(server)
              .get('/api/v1/records/1')
              .end((error, response) => {
                response.body.should.be.a('array');
                response.body[1].should.have.property('body');
                response.body[1].body.should.equal(updateRecords.body);
              });
              done();
          });
        });
    });

  describe('DELETE /api/v1/games/:id/', () => {

    it('should delete a specific game from the games database', (done) => {
      chai.request(server)
        .delete('/api/v1/games/1')
        // .set('Authorization', token)
        .end((error, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');
            chai.request(server)
              .get('/api/v1/games/1')
              .end((error, response) => {
                response.should.have.status(404);
              });
          });
        done();
      });
    });
});
