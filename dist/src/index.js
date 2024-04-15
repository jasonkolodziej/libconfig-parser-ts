import { include, getFromFile } from "./parts/include";
import { Group } from "./parts/AssignmentStatement";
import { RemoveComments } from "./parts/Comments";
/**
 *
 * @param {string} string
 * @returns {string}
 */
export function stripComments(input) {
    return RemoveComments.parse(input);
}
/**
 * Parses a string (you must remove comments and process include statements
 *  before passing your string to this methode)
 * @param {string} input
 * @returns {{[key:string]:any}}
 */
export function parseString(input) {
    return Group.parse(`{${stripComments(input)}}`);
}
/**
 *
 * @param {string} filename
 * @param {string} basedir used for `@include`
 * @param {(path:string, basedir:string)=>string} fileReadFunction
 */
export function parseFile(filename, basedir, fileReadFunction = getFromFile) {
    const content = include(fileReadFunction(filename, basedir), basedir, fileReadFunction);
    return parseString(content);
}
// module.exports = {
//     stripComments,
//     parseString,
//     parseFile,
// }
//# sourceMappingURL=index.js.map