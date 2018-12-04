const request = require('supertest'); //allow testing w/ good syntax
const app     = require('../../app')

///GET work
test('GET / should return 200', async () => {
    const response = await request(app).get('/v1/assignments');
    expect(response.statusCode).toBe(200);
});

describe('CRUD on /v1/assignment', () => {  
  test('POST v1/assignments ', async () => {
    const response = await request(app).post('/v1/assignments/')
                                        .send({
                                            name: 'Analisi',
                                            idTest: 'sjhbcab37gfuys',
                                            idCourse: 'hvgtgyuydsu878',
                                            idProfessor: 'hgf62trfyegw8',
                                            deadline: '20181215',
                                            obligatory: 'true'
                                        });    
    expect(response.status).toBe(201);
  });

  test('POST DOESNT WORK v1/assignments ', async () => {
    const response = await request(app).post('/v1/assignments/')
                                        .send({
                                            name: 'Analisi',
                                            idTest: 'sjhbcab37gfuys',
                                        });    
    expect(response.status).toBe(403);
  });

  test('DELETE WORK v1/assignments ', async () => {
    
    var answer = await request(app).post('/v1/assignments/')
    .send({
        name: 'Analisi',
        idTest: 'sjhbcab37gfuys',
        idCourse: 'hvgtgyuydsu878',
        idProfessor: 'hgf62trfyegw8',
        deadline: '20181215',
        obligatory: 'true'
    });
      
    answer = await request(app).get('/v1/assignments');
    answer = JSON.stringify(answer)
    answer = JSON.parse(answer)
    answer = JSON.parse(answer.text)
    var url = '/v1/assignments/' + answer[0].id

    const response = await request(app).delete(url)
  
    
    expect(response.status).toBe(200);
  });

  test('DELETE DOESNT WORK v1/assignments ', async () => {
    const response = await request(app).delete('/v1/assignments/thisiddoesntexist')    
    expect(response.status).toBe(404);
  });

  test('DELETE WITH NO PARAMS v1/assignments ', async () => {
    const response = await request(app).delete('/v1/assignments/')    
    expect(response.status).toBe(400);
  });

  test('UPDATE WORK v1/assignments ', async () => {
    var answer = await request(app).post('/v1/assignments/')
    .send({
        name: 'Analisi',
        idTest: 'sjhbcab37gfuys',
        idCourse: 'hvgtgyuydsu878',
        idProfessor: 'hgf62trfyegw8',
        deadline: '20181215',
        obligatory: 'true'
    });
      
    answer = await request(app).get('/v1/assignments');
    answer = JSON.stringify(answer)
    answer = JSON.parse(answer)
    answer = JSON.parse(answer.text)
    var url = '/v1/assignments/' + answer[0].id

    const response = await request(app).put(url)
                                        .send({
                                            name: 'Programmazione',
                                            idTest: 'vkjdsgyy8yuas',
                                        });  
  
    
    expect(response.status).toBe(200);
  });

  test('UPDATE DOESNT WORK v1/assignments ', async () => {
    const response = await request(app).put('/v1/assignments/thisiddoesntexist')
                                        .send({
                                            name: 'Programmazione',
                                            idTest: 'vkjdsgyy8yuas',
                                        });  
  
    
    expect(response.status).toBe(404);
  });

  test('UPDATE WITH NO PARAMS v1/assignments ', async () => {
    const response = await request(app).put('/v1/assignments/')
                                        .send({
                                            name: 'Programmazione',
                                            idTest: 'vkjdsgyy8yuas',
                                        });  
  
    
    expect(response.status).toBe(400);
  });
});