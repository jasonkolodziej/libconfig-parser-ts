// const { Parse } = require('sprache');
import { Parse } from "sprache";
export const Identifier = Parse.query(function* () {
    const leading = yield Parse.whiteSpace.many();
    const name = yield Parse.regex(/[a-z0-9\*][-a-z0-9_\*]*/i);
    const trailing = yield Parse.whiteSpace.many();
    return Parse.return(name);
});
//# sourceMappingURL=Identifier.js.map