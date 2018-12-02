const request = require('supertest'); //allow testing w/ good syntax
const app     = require('../../app')

///GET work
test('GET / should return 200', async () => {
    const response = await request(app).get('/v1/assignments');
    //console.log(JSON.stringify(response))
    expect(response.statusCode).toBe(200);
});

describe('CRUD on /v1/assignment', () => {
  const Assignment = require('../models/assignment');  
  test('POST v1/assignments ', async () => {
    const response = await request(app).post('/v1/assignments/')
                                        .send({
                                            name: 'Analisi',
                                            idTest: 'sjhbcab37gfuys',
                                            idCourse: 'hvgtgyuydsu878',
                                            idProfessor: 'hgf62trfyegw8',
                                            nameProfessor: 'Barozzi',
                                            nameCourse: 'Analisi I',
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
    
    var answare = await request(app).post('/v1/assignments/')
    .send({
        name: 'Analisi',
        idTest: 'sjhbcab37gfuys',
        idCourse: 'hvgtgyuydsu878',
        idProfessor: 'hgf62trfyegw8',
        nameProfessor: 'Barozzi',
        nameCourse: 'Analisi I',
        deadline: '20181215',
        obligatory: 'true'
    });
      
    answare = await request(app).get('/v1/assignments');
    answare = JSON.stringify(answare)
    answare = JSON.parse(answare)
    answare = JSON.parse(answare.text)
    var url = '/v1/assignments/' + answare[0].id

    const response = await request(app).delete(url)
  
    
    expect(response.status).toBe(200);
  });

  test('DELETE DOESNT WORK v1/assignments ', async () => {
    const response = await request(app).delete('/v1/assignments/thisiddoesntexist')    
    expect(response.status).toBe(404);
  });

  test('UPDATE WORK v1/assignments ', async () => {
    var answare = await request(app).post('/v1/assignments/')
    .send({
        name: 'Analisi',
        idTest: 'sjhbcab37gfuys',
        idCourse: 'hvgtgyuydsu878',
        idProfessor: 'hgf62trfyegw8',
        nameProfessor: 'Barozzi',
        nameCourse: 'Analisi I',
        deadline: '20181215',
        obligatory: 'true'
    });
      
    answare = await request(app).get('/v1/assignments');
    answare = JSON.stringify(answare)
    answare = JSON.parse(answare)
    answare = JSON.parse(answare.text)
    var url = '/v1/assignments/' + answare[0].id

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
});



    /*console.log('\n\n\n')
    console.log(JSON.stringify(response))         
    TROVO L'ID DELL'ULTIMO INSERIMENTO ESEGUITO
    var answare = await request(app).get('/v1/assignments');
    answare = JSON.stringify(answare)
    answare = JSON.parse(answare)
    answare = JSON.parse(answare.text)
    console.log(answare[0].id) 
    console.log('\n\n\n')    */    