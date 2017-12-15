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
          response.body.includes('2017-12-12T22:08:49.706Z');
          response.body[0].should.have.property('updated_at');
          response.body.includes('2017-12-12T22:08:49.706Z');
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
          response.body.includes('2017-12-12T22:08:49.706Z');
          response.body[0].should.have.property('updated_at');
          response.body.includes('2017-12-12T22:08:49.706Z');
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

    it('should return a 404 if the path is incorrect', () => {
      chai.request(server)
        .get('/api/v1/wrongo')
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('error');
          response.body.error.should.eql('Unable to locate record with id of wrongo');
        });
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
          response.body.includes({ game_title: 'Super Mario Bros.' });
          response.body.includes({ game_image: 'https://www.speedrun.com/themes/smb1/cover-256.png' });
          response.body.includes({ created_at: '2017-12-12T22:08:49.578Z' });
          response.body.includes({ created_at: '2017-12-12T22:08:49.578Z' });
        });
      done();
    });

    it('should return a 404 if the path is incorrect', (done) => {
      chai.request(server)
        .get('/api/v1/loser')
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('error');
          response.body.error.should.equal('Unable to locate record with id of loser')
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
          response.body.includes({ handle: 'LordOfSchnitzel' });
          response.body.includes({ rank: '26th' });
          response.body.includes({ time: '1h 27m 30s' });
          response.body.includes({ game_id: 2 });
          response.body.includes({ created_at: '2017-12-12T22:08:51.135Z' });
          response.body.includes({ created_at: '2017-12-12T22:08:51.135Z' });
        });
    });

    it('should return a 404 if the path is incorrect', () => {
      chai.request(server)
        .get('/api/v1/sawry')
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('error');
          response.body.error.should.equal('Unable to locate record with id of sawry');
        });
    });
  });

  describe('POST /api/v1/games/', () => {
    it('should be able to add a game to the database', (done) => {
      chai.request(server)
        .post('/api/v1/games')
        .send({
          game_title: 'Nickinator',
          game_image: 'https//:Nickinator.png',
        })
        .end((error, response) => {
          response.body.should.have.status(201);
          response.body.should.have.property('game_title');
          response.body.should.have.property('game_image');
          chai.request(server)
            .get('/api/v1/games/')
            .end((error, response) => {
              response.body.should.be.a('array');
              response.body.length.should.equal(21);
            });
        });
        done();
    });

    it('should not be able to add a new game if image property is missing', () => {
      chai.request(server)
        .post('/api/v1/games')
        .send({
          game_title: 'wow',
        })
        .end((error, response) => {
          response.should.have.status(422);
        });
    });

    it('should not be able to add a new game if title property is missing', () => {
      chai.request(server)
        .post('/api/v1/games')
        // .set('Authorization', token)
        .send({
          game_image: 'https://coolpicofgame.png',
        })
        .end((error, response) => {
          response.should.have.status(422);
          response.body.should.have.property('error');
          response.body.error.should.equal('You are missing the game_title property.')
        });
    });
  });

  describe('POST /api/v1/records/', () => {
    it('should be able to add a record to the database', () => {
      chai.request(server)
        .post('/api/v1/records')
        .send({
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

    it('should not be able to add a new record if a property is missing', (done) => {
      chai.request(server)
        .post('/api/v1/records')
        .send({
          handle: 'yolo',
          rank: '1st',
        })
        .end((error, response) => {
          response.should.have.status(422);
          response.body.should.have.property('error');
          response.body.error.should.equal('You are missing the time property.');
        });
      done();
    });
  });

describe('PATCH /api/v1/games/:id', () => {
    const updateGames = {
      game_title: 'WinnerWinner',
    };

    it('should be able to update the body of a game object', () => {
      chai.request(server)
        .patch('/api/v1/games/1')
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

    it('should throw an error if a game id is not provided', (done) => {
      chai.request(server)
        .post('/api/v1/records')
        .send({})
        .end((error, response) => {
          response.should.have.status(422);
          response.body.should.have.property('id');
          response.body.error.should.equal('No resource with an id of 2 was found.');
        });
      done();
    });
  });

  describe('PATCH /api/v1/records/:id', () => {
    const updateRecords = {
      rank: '3rd',
    };

    it('should be able to update the body of a record object', () => {
      chai.request(server)
        .patch('/api/v1/records/1')
        .send(updateRecords)
        .end((error, response) => {
          response.should.have.status(204);
          chai.request(server)
            .get('/api/v1/records/1')
            .end((error, response) => {
              response.body.should.be.a('array');
              response.body[1].should.have.property('body');
              response.body[1].body.should.equal(updateRecords.body);
            });
        });
    });

    it('should throw an error if a record id is not provided', () => {
      chai.request(server)
        .post('/api/v1/records')
        .send({})
        .end((error, response) => {
          response.should.have.status(422);
          response.body.should.have.property('id');
          response.body.error.should.equal('No resource with an id of 2 was found.');
        });
    });
  });

  describe('DELETE /api/v1/games/:id/', () => {

    it('should delete a specific game from the games database', () => {
      chai.request(server)
        .delete('/api/v1/games/1')
        .end((error, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');
          chai.request(server)
            .get('/api/v1/games/1')
            .end((error, response) => {
              response.should.have.status(200);
            });
        });
    });
  });

  describe('DELETE /api/v1/records/:id/', () => {

    it('should delete a specific game from the records database', (done) => {
      chai.request(server)
        .delete('/api/v1/records/1')
        .end((error, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');
          chai.request(server)
            .get('/api/v1/records')
            .end((error, response) => {
              response.should.have.status(200);
              response.body.should.be.a('array');
            });
        });
      done();
    });
  });
});
