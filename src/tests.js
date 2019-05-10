const def = require('./parts/definition')

const { TestParser, Assertion } = require('./util/test')

console.info("Tests\n=====")

const tests = [
    'Identifier.test',
    'scalarValue.test',
    'AssignmentStatement.test',
    'Comments.test',
]

tests.forEach(testName => {
    /**
     * @type {TestParser}
     */
    const test = require(`./parts/${testName}`)
    test.runTest()
})
