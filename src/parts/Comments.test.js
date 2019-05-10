const { TestParser, Assertion } = require('../util/test')
const {
    ScriptStyleComment,
    CppComment,
    oneLineComment,
    CComment,
} = require("./Comments")

module.exports = new TestParser("Comments",
    // ScriptStyleComment
    new Assertion(
        ScriptStyleComment.parse("# TEST \n  not parsed"),
        { type: 'ScriptStyle', comment: " TEST " }, ""
    ),
    new Assertion(
        ScriptStyleComment.parse("# hey whats goin' on ##sda \n not parsed"),
        { type: 'ScriptStyle', comment: " hey whats goin' on ##sda " }, ""
    ),
    new Assertion(
        ScriptStyleComment.parse("#hello world"),
        { type: 'ScriptStyle', comment: "hello world" }, "without linebreak"
    ),
    // CppComment
    new Assertion(
        CppComment.parse("// TEST \n  not parsed"),
        { type: 'CppStyle', comment: " TEST " }, ""
    ),
    new Assertion(
        CppComment.parse("// hey whats goin' on #//sda \n not parsed"),
        { type: 'CppStyle', comment: " hey whats goin' on #//sda " }, ""
    ),
    new Assertion(
        CppComment.parse("//hello world"),
        { type: 'CppStyle', comment: "hello world" }, "without linebreak"
    ),
    // oneLineComment
    new Assertion(
        ScriptStyleComment.parse("#hello world"),
        { type: 'ScriptStyle', comment: "hello world" }, "without linebreak"
    ),
    new Assertion(
        CppComment.parse("// TEST \n  not parsed"),
        { type: 'CppStyle', comment: " TEST " }, ""
    ),

    // CComment
    // new Assertion(.parse(""), { type: '', comment: "" }, ""),
    // new Assertion(.parse(""), { type: '', comment: "" }, ""),
    // new Assertion(.parse(""), { type: '', comment: "" }, ""),
)