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
                && (criterias.id == undefined ? true : t.id === criterias.id)
        })
        return matchingTests
    }

    //return questions from all tests that respect criterias, if no criterias are defined all questions will be returned
    static async findQuestionsByCriterias(criterias) {
        if (criterias == undefined)
            return aggregateQuestions()

        let matchingQuestions = aggregateQuestions().filter(q => {
            return (criterias.id == undefined ? true : q.id === criterias.id)
                && (criterias.text == undefined ? true : q.text === criterias.text)
        })
        return matchingQuestions
    }

    //add a new test
    static async addTest(criterias) {
        if (criterias != undefined) {
            criterias.id = uniqid()
            if (Object.keys(criterias).length == 8) {
                testTable.push(criterias)
                return true
            }
        }
        return false
    }

    //remove tests that respect criterias, if no criterias are defined all tests will be removed
    //returns the deleted tests or empty array if no tests are found with the given criterias
    static async removeTest(criterias) {
        if(criterias != undefined && criterias.id != undefined){
            var iterationCounter = 0
            var testsRemoved = []
            testTable.forEach(test => {
                if(test.id == criterias.id)
                    testsRemoved.push(testTable.splice(iterationCounter,1))
                iterationCounter++
            });
            return testsRemoved;
        }
        else
            return testTable.splice(0, testTable.length);
        
    }
}

module.exports = Test