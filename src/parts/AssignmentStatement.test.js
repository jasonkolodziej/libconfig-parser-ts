const { TestParser, Assertion } = require('../util/test')
const { AssignmentOperator, AssignmentStatement } = require("./AssignmentStatement")

module.exports = new TestParser("AssignmentStatement",
    //AssignmentOperator
    new Assertion(AssignmentOperator.parse(":"), ":", "AssignmentOperator"),
    new Assertion(AssignmentOperator.parse("="), "=", "AssignmentOperator"),
    //AssignmentStatement
    new Assertion(AssignmentStatement.parse("id2 = 5"), { key: 'id2', value: 5 }, "test number"),
    new Assertion(AssignmentStatement.parse("message = \"Hello World\""), { key: 'message', value: "Hello World" }, "test string"),
    new Assertion(AssignmentStatement.parse("id =false"), { key: 'id', value: false }, "test boolean"),
)