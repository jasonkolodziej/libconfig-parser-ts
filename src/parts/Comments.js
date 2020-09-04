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
    const content = yield Parse.char(_ => true, "any char").until(Parse.string('*/')).text()
    yield Parse.char('\n').optional()

    return Parse.return({
        type: 'CStyle',
        comment: content
    })
})

const Comment = Parse.queryOr(function* () {
    yield ScriptStyleComment
    yield CppComment
    yield CComment
})

const ParseComments = Parse.query(function* () {
    const content = yield Parse.queryOr(function* () {
        yield Comment
        yield Parse.regex(/[^\#\/]+/)
    }).many()
    return Parse.return(
        content.filter(item => typeof item === "object")
    )
})

const RemoveComments = Parse.query(function* () {
    const content = yield Parse.queryOr(function* () {
        yield Comment
        yield Parse.char("/").or(Parse.char("#"))
        yield Parse.regex(/[^\#\/]+/)
    }).many()
    return Parse.return(
        content.filter(item => typeof item !== "object").join('')
    )
})


module.exports = {
    Comment,
    ParseComments,
    RemoveComments,
}