const app = require('../../app')
const request = require('supertest')

var idTest = 1234
describe('POST /tests', function () {
    var data = {
        "idTest":"1234",
        "nameTest": "fisica",
        "question": [{'idQuestion':'1','text':'condensatore'}]
    }
    it('respond with 200 created', function (done) {
        request(app)
            .post('/v1/tests')
            .send(data)
            .set('Accept', 'application/json')
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
describe('POST /tests', function () {
    var data = {
        "idTest":"1234",
        "nameTest": "fisica",
        "question": [{'idQuestion':'1','text':'condensatore'}],
        "question2": [{'idQuestion':'1','text':'condensatore'}]
    }
    it('respond with 200 created', function (done) {
        request(app)
            .post('/v1/tests')
            .send(data)
            .set('Accept', 'application/json')
            .expect(405)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('GET /tests', function () {
    it('respond with json containing a list of all tests', function (done) {
        request(app)
            .get('/v1/tests')
            .expect(200, done)
    });
});

describe('GET /tests?idTest=' + idTest, function () {
    it('respond with json containing a list of all matching tests', function (done) {
        request(app)
            .get('/v1/tests?idTest='+idTest)
            .expect(200, done)
    });
});

describe('UPDATE /tests', function () {
    var data = {
        "idTest":"1234",
        "nameTest": "analisi1",
        "question": [{'idQuestion':'1','text':'condensatore'}]
    }
    it('update the given test', function (done) {
        request(app)
            .put('/v1/tests')
            .send(data)
            .expect(201, done)
    });
});
describe('UPDATE /tests', function () {
    var data = {
        "idTest":"1234",
        "nameTest": "analisi1",
        "question": [{'idQuestion':'1','text':'condensatore'}],
        "question2": [{'idQuestion':'1','text':'condensatore'}]
    }
    it('update the given test', function (done) {
        request(app)
            .put('/v1/tests')
            .send(data)
            .expect(400, done)
    });
});

describe('DELETE /tests/4321', function () {
    it('respond with json containing the removed tests', function (done) {
        request(app)
            .delete('/v1/tests/4321')
            .expect(400, done)
    });
});
describe('DELETE /tests/' + idTest, function () {
    it('respond with json containing the removed tests', function (done) {
        request(app)
            .delete('/v1/tests/'+idTest)
            .expect(204, done)
    });
});