const { Parse } = require('sprache');
const space = Parse.whiteSpace.or(Parse.char('\n').or(Parse.char("\t")));
exports.space = space;
