const { Parse } = require('sprache');
const Identifier = Parse.query(function* () {
    const leading = yield Parse.whiteSpace.many();
    const first = yield Parse.letter.once();
    const rest = yield Parse.letterOrDigit.many();
    const trailing = yield Parse.whiteSpace.many();
    return Parse.return([first].concat(rest).join(''));
});
exports.Identifier = Identifier;
