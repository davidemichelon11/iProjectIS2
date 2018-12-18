const request = require('supertest'); //allow testing w/ good syntax
const app     = require('../../app')



describe('CRUD on /v1/exams', () => {
  ///GET work
  test('GET / should return 200', async () => {
    const response = await request(app).get('/v1/exams');
    expect(response.statusCode).toBe(200);
  });

  test('POST v1/professors ', async () => {
    const response = await request(app).post('/v1/professors/')
                                        .send({
                                            name: 'Mario Rossi',
                                            email: 'mr@mail.com',
                                            password: '1234'
                                        });    
    expect(response.status).toBe(201);
  });
var token
  test('POST on autentication / should return 201', async () => {
    const response = await request(app).post('/v1/autentication')
    .send({
      name:'Mario Rossi'
    });
    expect(response.statusCode).toBe(201);
    token = response.body.token
  });

  const Exam = require('../models/exam');  
  test('POST, DELETE and PUT on v1/exams ', async () => {
    const response = await request(app).post('/v1/exams/')
                                        .send({
                                          name: 'Analisi 1',
                                          profName: 'Barozzi',
                                          courseName: 'Ingegneria dell informazione ',
                                          deadline: 121218,
                                          examType: 'Oral',
                                          token: token
                                        });
    expect(response.status).toBe(201);

    answer = await request(app).get('/v1/exams');
    answer = JSON.stringify(answer)
    answer = JSON.parse(answer)
    answer = JSON.parse(answer.text)
    var url = '/v1/exams/' + answer[0].id

    const PUTresp = await request(app).put(url)
                                        .send({
                                          name:'Base di dati',
                                          token: token
                                        })
    expect(PUTresp.status).toBe(200)

    const resp = await request(app).delete(url)
                                        .send({
                                          token: token
                                        })
    expect(resp.status).toBe(204);

  });
  test('DELETE v1/exams should return 404', async()=>{
    var url = '/v1/exams/'+123432;
    const resp = await request(app).delete(url)
    .send({
      token: token
    })
    expect(resp.status).toBe(404);
  })
  test('POST v1/exams should return 403 ', async () => {
    const response = await request(app).post('/v1/exams')
                                        .send({
                                            name: 'Analisi',
                                          token: token});    
    expect(response.status).toBe(403);
  });
  test('POST v1/exams wrong token, should return 403 ', async () => {
    const response = await request(app).post('/v1/exams')
                                        .send({
                                            name: 'Analisi',
                                            token: 'akjdns' });    
    expect(response.status).toBe(403);
  });
  test('POST v1/exams token not provided, should return 401 ', async () => {
    const response = await request(app).post('/v1/exams')
                                        .send({
                                            name: 'Analisi' });    
    expect(response.status).toBe(401);
  });
});