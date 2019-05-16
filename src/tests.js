//console.info = () => {}

const { TestParser, Assertion } = require('./util/test')

console.info("Tests\n=====")

const tests = [
    'parts/Identifier.test',
    'parts/scalarValue.test',
    'parts/AssignmentStatement.test',
    'parts/Comments.test',
    'include.test',
]
let failed = false;
tests.forEach(testName => {
    /**
     * @type {TestParser}
     */
    const test = require(`./${testName}`)
    if(!test.runTest())
        failed = true
})

if(failed) process.exit(1)
else process.exit(0)