const request = require('supertest'); //allow testing w/ good syntax
const app     = require('../../app')

///GET work
test('GET / should return 200', async () => {
    const response = await request(app).get('/v1/students');
    expect(response.statusCode).toBe(200);
});

describe('CRUD on /v1/students', () => {  
  test('POST v1/students ', async () => {
    const response = await request(app).post('/v1/students/')
                                        .send({
                                            name: 'Davide',
                                            email: 'davide.michelon-1@studenti.unitn.it',
                                            password: 'cisco2018',
                                        });    
    expect(response.status).toBe(201);
  });

  test('POST DOESNT WORK v1/students ', async () => {
    const response = await request(app).post('/v1/students/')
                                        .send({
                                            name: 'Davide',
                                            email: 'davide.michelon-1@studenti.unitn.it',
                                        });    
    expect(response.status).toBe(403);
  });

  test('DELETE WORK v1/students ', async () => {
    
    var answer = await request(app).post('/v1/students/')
                                    .send({
                                        name: 'Davide',
                                        email: 'davide.michelon-1@studenti.unitn.it',
                                        password: 'cisco2018',
                                    });
      
    answer = await request(app).get('/v1/students');
    answer = JSON.stringify(answer)
    answer = JSON.parse(answer)
    answer = JSON.parse(answer.text)
    var url = '/v1/students/' + answer[0].id

    const response = await request(app).delete(url)
  
    
    expect(response.status).toBe(200);
  });

  test('DELETE DOESNT WORK v1/students ', async () => {
    const response = await request(app).delete('/v1/students/thisiddoesntexist')    
    expect(response.status).toBe(404);
  });

  test('DELETE WITH NO PARAMS v1/students ', async () => {
    const response = await request(app).delete('/v1/students/')    
    expect(response.status).toBe(400);
  });

  test('UPDATE WORK v1/students ', async () => {
    var answer = await request(app).post('/v1/students/')
                                    .send({
                                        name: 'Davide',
                                        email: 'davide.michelon-1@studenti.unitn.it',
                                        password: 'cisco2018',
                                    });
      
    answer = await request(app).get('/v1/students');
    answer = JSON.stringify(answer)
    answer = JSON.parse(answer)
    answer = JSON.parse(answer.text)
    var url = '/v1/students/' + answer[0].id

    const response = await request(app).put(url)
                                        .send({
                                            name: 'Davide',
                                            email: 'davide.michelon-1@studenti.unitn.it',
                                            password: 'cisco2019',
                                        });  
  
    
    expect(response.status).toBe(200);
  });

  test('UPDATE DOESNT WORK v1/students ', async () => {
    const response = await request(app).put('/v1/students/thisiddoesntexist')
                                        .send({
                                            name: 'Davide',
                                        });  
  
    
    expect(response.status).toBe(404);
  });

  test('UPDATE WITH NO PARAMS v1/students ', async () => {
    const response = await request(app).put('/v1/students/')
                                        .send({
                                            name: 'Davide',
                                        });  
  
    
    expect(response.status).toBe(400);
  });
});