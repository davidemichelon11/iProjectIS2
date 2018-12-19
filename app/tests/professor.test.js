const request = require('supertest') //allow testing w/ good syntax
const app     = require('../../app')

///GET work
test('GET / should return 200', async () => {
    const response = await request(app).get('/v1/professors');
    expect(response.statusCode).toBe(200);
});

describe('CRUD on /v1/professors', () => {  
  test('POST v1/professors ', async () => {
    const response = await request(app).post('/v1/professors/')
                                        .send({
                                            name: 'Mario Rossi',
                                            email: 'mr@mail.com',
                                            password: '1234'
                                        });    
    expect(response.status).toBe(201);
  });

  test('POST DOESNT WORK v1/prrofessors', async () => {
    const response = await request(app).post('/v1/professors/')
                                        .send({
                                            name: 'Mario Bianchi',
                                            email: 'aa@mail.com'
                                        });    
    expect(response.status).toBe(403);
  });

  test('DELETE WORK v1/professors ', async () => {
    
    var answare = await request(app).post('/v1/professors/')
    .send({
      name: 'Mario Rossi',
      email: 'mr@mail.com',
      password: '1234'
    });
      
    answare = await request(app).get('/v1/professors');
    answare = JSON.stringify(answare)
    answare = JSON.parse(answare)
    answare = JSON.parse(answare.text)
    var url = '/v1/professors/' + answare[0].id

    const response = await request(app).delete(url)
  
    
    expect(response.status).toBe(200);
  });

  test('DELETE DOESNT WORK v1/professors ', async () => {
    const response = await request(app).delete('/v1/professors/thisiddoesntexist')    
    expect(response.status).toBe(404);
  });

  test('DELETE WITH NO PARAMS v1/professors ', async () => {
    const response = await request(app).delete('/v1/professors/')    
    expect(response.status).toBe(400);
  });

  test('UPDATE WORK v1/professors ', async () => {
    var answare = await request(app).post('/v1/professors/')
    .send({
      name: 'Mario Rossi',
      email: 'mr@mail.com',
      password: '1234'
    });
      
    answare = await request(app).get('/v1/professors');
    answare = JSON.stringify(answare)
    answare = JSON.parse(answare)
    answare = JSON.parse(answare.text)
    var url = '/v1/professors/' + answare[0].id

    const response = await request(app).put(url)
                                        .send({
                                            name: 'Mario Bianchi',
                                            email: 'aa@mail.com'
                                        });  
  
    
    expect(response.status).toBe(200);
  });

  test('UPDATE DOESNT WORK v1/professors ', async () => {
    const response = await request(app).put('/v1/professors/thisiddoesntexist')
                                        .send({
                                          name: 'Mario Bianchi',
                                          email: 'aa@mail.com'
                                        });  
  
    
    expect(response.status).toBe(404);
  });

  test('UPDATE WITH NO PARAMS v1/professors ', async () => {
    const response = await request(app).put('/v1/professors/')
                                        .send({
                                          name: 'Mario Bianchi',
                                          email: 'aa@mail.com'
                                        });  
  
    
    expect(response.status).toBe(400);
  });
});