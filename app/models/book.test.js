const request = require('supertest') //allow testing w/ good syntax
const app     = require('../../app')

describe('CRUD on /v1/books', () => {  
  test('POST v1/books ', async () => {
    const response = await request(app).post('/v1/books/')
                                        .send({
                                            title: 'Analisi 1',
                                            idSolder: 'frifb08b340',
                                            firstPrice: '1',
                                            lastPrice: '50',
                                            deadline: '12122017',
                                            sold: 'false'
                                        });    
    expect(response.status).toBe(201);
  });

test('GET / should return 200', async () => {
    const response = await request(app).get('/v1/books');
    expect(response.statusCode).toBe(200);
    var jsonRespone = response.body[0];
    delete jsonRespone.id;
    expect(jsonRespone).toEqual({
                              title: 'Analisi 1',
                              idSolder: 'frifb08b340',
                              firstPrice: '1',
                              lastPrice: '50',
                              deadline: '12122017',
                              sold: 'false'
    });  
});

  test('POST DOESNT WORK v1/books', async () => {
    const response = await request(app).post('/v1/books/')
                                        .send({
                                            title: 'Analisi 1',
                                            idSolder: 'frifb08b340',
                                            firstPrice: '1',
                                            lastPrice: '50'
                                        });    
    expect(response.status).toBe(403);
  });

  test('DELETE WORK v1/books ', async () => {
    
    var answare = await request(app).post('/v1/books/')
    .send({
        title: 'Analisi 1',
        idSolder: 'frifb08b340',
        firstPrice: '1',
        lastPrice: '50',
        deadline: '12122017',
        sold: 'false'
    });
      
    answare = await request(app).get('/v1/books');
    answare = JSON.stringify(answare)
    answare = JSON.parse(answare)
    answare = JSON.parse(answare.text)
    var url = '/v1/books/' + answare[0].id

    const response = await request(app).delete(url)
  
    
    expect(response.status).toBe(200);
    //There is only one element so the response body must be a empty JSON
    expect(response.body).toEqual({});
  });

  test('DELETE DOESNT WORK v1/books ', async () => {
    const response = await request(app).delete('/v1/books/thisiddoesntexist')    
    expect(response.status).toBe(404);
  });

  test('DELETE WITH NO PARAMS v1/books ', async () => {
    const response = await request(app).delete('/v1/books/')    
    expect(response.status).toBe(400);
  });

  test('UPDATE WORK v1/books ', async () => {
    var answare = await request(app).post('/v1/books/')
    .send({
        title: 'Analisi 1',
        idBuyer: 'sjpfrnèk',
        firstPrice: '1',
        lastPrice: '50',
        deadline: '12122017',
        sold: 'false'
    });
      
    answare = await request(app).get('/v1/books');
    answare = JSON.stringify(answare)
    answare = JSON.parse(answare)
    answare = JSON.parse(answare.text)
    var url = '/v1/books/' + answare[0].id

    const response = await request(app).put(url)
                                        .send({
                                            title: 'Analisi 1',
                                            idBuyer: 'jdsnefnon',
                                            firstPrice: '1'
                                        });  
  
    
     expect(response.status).toBe(200);
     expect(response.body).toEqual({});
  });

  test('UPDATE DOESNT WORK v1/books ', async () => {
    const response = await request(app).put('/v1/books/thisiddoesntexist')
                                        .send({
                                            title: 'Analisi 1',
                                            idBuyer: 'jdsnefnon'
                                        });  
  
    
    expect(response.status).toBe(404);
  });

  test('UPDATE WITH NO PARAMS v1/books ', async () => {
    const response = await request(app).put('/v1/books/')
                                        .send({
                                            title: 'Analisi 1',
                                            idBuyer: 'jdsnefnon'
                                        });  
  
    
    expect(response.status).toBe(400);
  });
});