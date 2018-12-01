const request = require('supertest'); //allow testing w/ good syntax
const app     = require('../../app')

///GET work
test('GET / should return 200', async () => {
    const response = await request(app).get('/v1/exams');
    expect(response.statusCode).toBe(200);
});

describe('CRUD on /v1/exams', () => {
  const Exam = require('../models/exam');  
  test('POST v1/exams ', async () => {
    const response = await request(app).post('/v1/exams/')
                                        .send({
                                          name: 'Analisi 1',
                                          profName: 'Barozzi',
                                          courseName: 'Ingegneria dell informazione ',
                                          deadline: 121218,
                                          examType: 'Oral'
                                        });
    expect(response.status).toBe(201);
  });
});