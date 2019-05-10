const { Identifier } = require("./Identifier");
const { scalarValue } = require("./scalarValue");
const { Parse } = require('sprache');

const AssignmentOperator = Parse.char(c => /:|=/.test(c), '=|: (assignment)')

const SettingValue = Parse.queryOr(function*(){
    yield scalarValue;
    //TODO Array
    //TODO Group
    //TODO List
})

const AssignmentStatement = Parse.query(function* () {
    const identifier = yield Identifier
    const assignmentOperator = yield AssignmentOperator
    const value = yield SettingValue
    return Parse.return({
        key: identifier,
        value: value,
    })
})

module.exports = {
    AssignmentOperator,
    AssignmentStatement,
}
