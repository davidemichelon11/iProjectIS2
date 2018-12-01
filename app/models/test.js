var uniqid = require('uniqid')

var testTable = global.examsTable
if (testTable == undefined)
    testTable = []

class Test {

    //aggregate all questions in all tests in one array
    static async aggregateQuestions() {
        var questionArray = [];
        testTable.forEach(test => {
            questionArray.push(test.question);
        });
        return questionArray;
    }

    //return tests that respect criterias, if no criterias are defined all tests will be returned
    static async findTestsByCriterias(criterias) {

        let matchingTests = testTable.filter(t => {
            return (criterias.nameExam == undefined ? true : t.nameExam === criterias.nameExam)
                && (criterias.idTest == undefined ? true : t.idTest === criterias.idTest)
        })
        return matchingTests
    }

    //return questions from all tests that respect criterias, if no criterias are defined all questions will be returned
    static async findQuestionsByCriterias(criterias) {
        if (criterias == undefined)
            return aggregateQuestions()

        let matchingQuestions = aggregateQuestions().filter(q => {
            return (criterias.idTest == undefined ? true : q.idTest === criterias.idTest)
                && (criterias.text == undefined ? true : q.text === criterias.text)
        })
        return matchingQuestions
    }

    //add a new test
    static async addTest(criterias) {
        if (criterias != undefined) {
            criterias.idTest = uniqid()
            if (Object.keys(criterias).length == 3) {
                testTable.push(criterias)
                return true
            }
        }
        return false
    }

    //remove tests that respect criterias, if no criterias are defined all tests will be removed
    //returns the deleted tests or empty array if no tests are found with the given criterias
    static async removeTest(criterias) {
        if(criterias != undefined && criterias.idTest != undefined){
            var iterationCounter = 0
            var testsRemoved = []
            testTable.forEach(test => {
                if(test.idTest == criterias.idTest)
                    testsRemoved.push(testTable.splice(iterationCounter,1))
                iterationCounter++
            });
            return testsRemoved
        }
        else
            return testTable.splice(0, testTable.length)
    }

    static async updateTest(criterias){
        if(criterias != undefined && criterias.idTest != undefined && criterias.nameTest != undefined 
            && criterias.question != undefined){
                var idFound = false
                testTable.forEach(test => {
                    if(test.idTest === criterias.idTest){
                        test.nameTest = criterias.nameTest
                        test.question = criterias.question
                        idFound = true
                    }
                });
                return idFound
            }
            return false;
    }
}

module.exports = Test