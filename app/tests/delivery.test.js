const request = require('supertest'); //allow testing w/ good syntax
const app = require('../../app')


var token
///GET work
test('GET / should return 200', async () => {
    const response = await request(app).get('/v1/deliveries');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual('[]')
});


describe('/POST delivery', () => {
    test('POST where not exists student and/or exam v1/deliveries <should return 404> ', async () => {
        const response = await request(app).post('/v1/deliveries')
            .send({
                idStudent: 15,
                idExam: 12,
                answer: '[a,b]',
            });
        expect(response.status).toBe(404)
        expect(response.body.result).toEqual('Exam or student does not find')
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
    test('POST on autentication / should return 201', async () => {
        const response = await request(app).post('/v1/autentication')
            .send({
                name: 'Mario Rossi',
                password:'1234'
            });
        expect(response.statusCode).toBe(201);
        token = response.body.token
    });

    test('POST insert student and exam within the deadline on v1/deliveries <should return 200> ', async () => {
        //Insert student and exam
        await request(app).post('/v1/students')
            .send({
                id: 15,
                name: 'Davide',
                email: 'davide.michelon-1@studenti.unitn.it',
                password: 'cisco2018'
            });

        await request(app).post('/v1/exams')
            .send({
                id: 12,
                name: 'Analisi 1',
                profName: 'Barozzi',
                courseName: 'Ingegneria dell informazione ',
                deadline: 121218,
                examType: 'Oral',
                token: token
            });
        //delete student and exam                                    
        afterAll(() => {
            request(app).delete('/v1/exams/12').send({
                token:token
            });
            request(app).delete('/v1/students/15');
        })

        const answerResponse = await request(app).post('/v1/deliveries')
            .send({
                idStudent: 15,
                idExam: 12,
                answer: '[a,b]'
            });
        expect(answerResponse.status).toBe(200)
        expect(answerResponse.body.result).toEqual('inserted')
    });
    test('POST without the deadline on v1/deliveries <should return 200> ', async () => {
        //Insert student and exam
        await request(app).post('/v1/students')
            .send({
                id: 1,
                name: 'Davide',
                email: 'davide.michelon-1@studenti.unitn.it',
                password: 'cisco2018'
            });

        await request(app).post('/v1/exams')
            .send({
                id: 2,
                name: 'Analisi 1',
                profName: 'Barozzi',
                courseName: 'Ingegneria dell informazione ',
                deadline: 2544804341854,
                examType: 'Oral',
                token:token
            });
        //delete student and exam                                    
        afterAll(() => {
            request(app).delete('/v1/exams/2').send({
                token:token
            });
            request(app).delete('/v1/students/1');
        })

        const answerResponse1 = await request(app).post('/v1/deliveries')
            .send({
                idStudent: 1,
                idExam: 2,
                answer: '[a,b]'
            });
        expect(answerResponse1.status).toBe(403)
        expect(answerResponse1.body.result).toEqual('too late')
    });
});
