import { getFromFile } from "./parts/include";
/**
 *
 * @param {string} string
 * @returns {string}
 */
export declare function stripComments(input: string): string;
/**
 * Parses a string (you must remove comments and process include statements
 *  before passing your string to this methode)
 * @param {string} input
 * @returns {{[key:string]:any}}
 */
export declare function parseString(input: string): {
    [key: string]: any;
};
/**
 *
 * @param {string} filename
 * @param {string} basedir used for `@include`
 * @param {(path:string, basedir:string)=>string} fileReadFunction
 */
export declare function parseFile(filename: string, basedir: string, fileReadFunction?: typeof getFromFile): {
    [key: string]: any;
};
