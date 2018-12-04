const request = require('supertest'); //allow testing w/ good syntax
const app     = require('../../app')

///GET work
test('GET / should return 200', async () => {
    const response = await request(app).get('/v1/workgroups');
    expect(response.statusCode).toBe(200);
});

describe('CRUD on /v1/workgroups', () => {  
  test('POST WORK v1/workgroups ', async () => {
    const response = await request(app).post('/v1/workgroups/')
                                        .send({
                                            name: 'iProjectIS2',
                                            members: ['Lorenzo Cavada', 'Davide Michelon', 'Grassi Alessandro', 'Alessanfro Fontanella', 'MAtteo Luca']
                                        });    
    expect(response.status).toBe(201);
  });

  test('POST DOESNT WORK v1/workgroups ', async () => {
    const response = await request(app).post('/v1/workgroups/')
                                        .send({
                                            name: 'iProjectIS2',
                                        });    
    expect(response.status).toBe(403);
  });

  test('DELETE WORK v1/workgroups ', async () => {
    
    var answare = await request(app).post('/v1/workgroups/')
    .send({
        name: 'iProjectIS2',
        members: ['Lorenzo Cavada', 'Davide Michelon', 'Grassi Alessandro', 'Alessanfro Fontanella', 'MAtteo Luca']
    });
      
    answare = await request(app).get('/v1/workgroups');
    answare = JSON.stringify(answare)
    answare = JSON.parse(answare)
    answare = JSON.parse(answare.text)
    var url = '/v1/workgroups/' + answare[0].id

    const response = await request(app).delete(url)  
    
    expect(response.status).toBe(200);
  });

  test('DELETE DOESNT WORK v1/workgroups ', async () => {
    const response = await request(app).delete('/v1/workgroups/thisiddoesntexist')    
    expect(response.status).toBe(404);
  });

  test('DELETE WITH NO PARAMS v1/workgroups ', async () => {
    const response = await request(app).delete('/v1/workgroups/')    
    expect(response.status).toBe(400);
  });

  test('UPDATE WORK v1/workgroups ', async () => {
    var answare = await request(app).post('/v1/workgroups/')
    .send({
        name: 'iProjectIS2',
        members: ['Lorenzo Cavada', 'Davide Michelon', 'Grassi Alessandro', 'Alessanfro Fontanella', 'MAtteo Luca']
    });
      
    answare = await request(app).get('/v1/workgroups');
    answare = JSON.stringify(answare)
    answare = JSON.parse(answare)
    answare = JSON.parse(answare.text)
    var url = '/v1/workgroups/' + answare[0].id

    const response = await request(app).put(url)
                                        .send({
                                            name: 'iProjectIS2',
                                            members: ['LORENZO Cavada', 'Davide Michelon', 'Grassi Alessandro', 'Alessanfro Fontanella', 'MAtteo Luca']
                                        });  
  
    
    expect(response.status).toBe(200);
  });

  test('UPDATE DOESNT WORK v1/workgroups ', async () => {
    const response = await request(app).put('/v1/workgroups/thisiddoesntexist')
                                        .send({
                                            name: 'iProjectIS2',
                                            members: ['LORENZO Cavada', 'Davide Michelon', 'Grassi Alessandro', 'Alessanfro Fontanella', 'MAtteo Luca']
                                        });  
  
    
    expect(response.status).toBe(404);
  });

  test('UPDATE WITH NO PARAMS v1/workgroups ', async () => {
    const response = await request(app).put('/v1/workgroups/')
                                        .send({
                                            name: 'iProjectIS2',
                                            members: ['LORENZO Cavada', 'Davide Michelon', 'Grassi Alessandro', 'Alessanfro Fontanella', 'MAtteo Luca']
                                        });  
  
    
    expect(response.status).toBe(400);
  });
});