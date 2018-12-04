const request = require('supertest'); //allow testing w/ good syntax
const app     = require('../../app')



describe('CRUD on /v1/exams', () => {
  ///GET work
  test('GET / should return 200', async () => {
    const response = await request(app).get('/v1/exams');
    expect(response.statusCode).toBe(200);
  });

  const Exam = require('../models/exam');  
  test('POST, DELETE and PUT on v1/exams ', async () => {
    const response = await request(app).post('/v1/exams/')
                                        .send({
                                          name: 'Analisi 1',
                                          profName: 'Barozzi',
                                          courseName: 'Ingegneria dell informazione ',
                                          deadline: 121218,
                                          examType: 'Oral'
                                        });
    expect(response.status).toBe(201);

    answer = await request(app).get('/v1/exams');
    answer = JSON.stringify(answer)
    answer = JSON.parse(answer)
    answer = JSON.parse(answer.text)
    var url = '/v1/exams/' + answer[0].id

    const PUTresp = await request(app).put(url)
                                        .send({
                                          name:'Base di dati'
                                        })
    expect(PUTresp.status).toBe(200)

    const resp = await request(app).delete(url)
    expect(resp.status).toBe(204);

  });
  test('DELETE v1/exams should return 404', async()=>{
    var url = '/v1/exams/'+123432;
    const resp = await request(app).delete(url)
    expect(resp.status).toBe(404);
  })
  test('POST v1/exams should return 403 ', async () => {
    const response = await request(app).post('/v1/exams')
                                        .send({
                                            name: 'Analisi'                                        });    
    expect(response.status).toBe(403);
  });  
});