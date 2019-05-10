const { Parse } = require('sprache');


/**
 * `# comment line`
 */
const ScriptStyleComment = Parse.query(function*(){
    yield Parse.char('#')
    const content = yield Parse.char(c => !/\n/.test(c) , "chars exept for \\n").many()
    yield Parse.char('\n').optional()

    return Parse.return({
        type: 'ScriptStyle',
        comment: content.join('')
    })
})

/** 
 * `// comment line`
 */
const CppComment = Parse.query(function*(){
    yield Parse.string('//')
    const content = yield Parse.char(c => !/\n/.test(c) , "chars exept for \\n").many()
    yield Parse.char('\n').optional()

    return Parse.return({
        type: 'CppStyle',
        comment: content.join('')
    })
})

const oneLineComment = Parse.queryOr(function*(){
    yield ScriptStyleComment
    yield CppComment
})
/**
 * `/* comment *​/`
 */
const CComment = Parse.query(function*(){
    yield Parse.string('/*')
    const content = yield Parse.char(c => {
        const clast = content.length-1;
        return !(c === '/' && content[clast] === '*')
    }, "chars exept for comment end").many()
    yield Parse.char('\n')

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