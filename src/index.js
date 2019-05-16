const { include, getFromFile } = require("./parts/include")
const { Group } = require("./parts/AssignmentStatement")
const { RemoveComments } = require("./parts/Comments")

/**
 * 
 * @param {string} string
 * @returns {string}
 */
function stripComments(input) {
    return RemoveComments.parse(input)
}

/**
 * Parses a string (you must remove comments and process include statements
 *  before passing your string to this methode)
 * @param {string} input 
 * @returns {{[key:string]:any}}
 */
function parseString(input){
    return Group.parse(`{${input}}`)
}

/**
 * 
 * @param {string} filename 
 * @param {string} basedir used for `@include`
 * @param {(path:string, basedir:string)=>string} fileReadFunction
 */
function parseFile(filename, basedir, fileReadFunction=getFromFile){
    const content = include(fileReadFunction(filename, basedir), basedir, fileReadFunction)
    return parseString(stripComments(content))
}

module.exports = {
    stripComments,
    parseString,
    parseFile,
}