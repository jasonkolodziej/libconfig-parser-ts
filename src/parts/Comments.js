const { Parse } = require('sprache');


/**
 * `# comment line`
 */
const ScriptStyleComment = Parse.query(function* () {
    yield Parse.char('#')
    const content = yield Parse.char(c => !/\n/.test(c), "chars exept for \\n").many()
    yield Parse.char('\n').optional()

    return Parse.return({
        type: 'ScriptStyle',
        comment: content.join('')
    })
})

/** 
 * `// comment line`
 */
const CppComment = Parse.query(function* () {
    yield Parse.string('//')
    const content = yield Parse.char(c => !/\n/.test(c), "chars exept for \\n").many()
    yield Parse.char('\n').optional()

    return Parse.return({
        type: 'CppStyle',
        comment: content.join('')
    })
})

const oneLineComment = Parse.queryOr(function* () {
    yield ScriptStyleComment
    yield CppComment
})
/**
 * `/* comment *​/`
 */
const CComment = Parse.query(function* () {
    yield Parse.string('/*')
    const content = []

    while (true) { 
        content.push(yield Parse.char(c => /[^\*]+/.test(c), "char except for *").many().text())

        yield Parse.char("*")
        const char = yield Parse.char(_ => true, "any char")
        if (char === "/") {
            break;
        } else {
            content.push("*", char)
        }
    }

    yield Parse.char('\n').optional()

    return Parse.return({
        type: 'CStyle',
        comment: content.join('')
    })
})

module.exports = {
    ScriptStyleComment,
    CppComment,
    oneLineComment,
    CComment,
}