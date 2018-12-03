const app     = require('./app')
const examsRoute = require('./app/routes/examsRoute')

test('app should be defined',()=>{
    expect(app).toBeDefined();
})

test('route of exam should be defined', ()=>{
    expect(examsRoute).toBeDefined();
})