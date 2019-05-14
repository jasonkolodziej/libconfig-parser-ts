//console.info = () => {}

const { TestParser, Assertion } = require('./util/test')

console.info("Tests\n=====")

const tests = [
    'Identifier.test',
    'scalarValue.test',
    'AssignmentStatement.test',
    'Comments.test',
]
let failed = false;
tests.forEach(testName => {
    /**
     * @type {TestParser}
     */
    const test = require(`./parts/${testName}`)
    if(!test.runTest())
        failed = true
})

if(failed) process.exit(1)