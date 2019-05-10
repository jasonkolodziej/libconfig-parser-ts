const { Parse } = require('sprache');

const Integer = Parse
    .digit.xAtLeastOnce().text()
    .select(digits => Number.parseInt(digits, 10))
    .named('an integer');

const Octal = Parse
    .regex(/0[0-7]+/)
    .select(x => Number.parseInt(x, 8))
    .named('octal notation number');

const Hex = Parse
    .regex(/0x[0-9a-fA-F]+/)
    .select(x => Number.parseInt(x.replace('0x', ''), 16))
    .named('a hex notation number');

const Float = Parse
    .regex(/[0-9]+\.[0-9]+/)
    .select(x => Number.parseFloat(x))
    .named('a floating point number');

const FloatWithEmptyExponent = Parse.query(function* () {
    const number = yield Float
    yield Parse.ignoreCase("e")
    return Parse.return(number)
})

const FloatWithExponent = Parse.query(function* () {
    const coefficient = yield FloatWithEmptyExponent
    const n = yield Parse.queryOr(function* () {
        yield SignedInteger;
        yield Integer;
    })
    return Parse.return(coefficient * Math.pow(10, n))
})

const UnsignedNumber = Parse.queryOr(function* () {
    yield Octal;
    yield Hex;
    yield FloatWithExponent;
    yield FloatWithEmptyExponent;
    yield Float;
    yield Integer;
})

function generateSignedParser(numberParser) {
    return Parse.query(function* () {
        const sign = yield Parse.char(input => /\+|-/.test(input), "+ or - sign")
        const number = yield numberParser;
        return Parse.return((sign && sign == '-') ? -number : number)
    })
}

const SignedNumber = generateSignedParser(UnsignedNumber)

const SignedInteger = generateSignedParser(Integer)

const MaybeSignedNumber = Parse.queryOr(function* () {
    yield SignedNumber;
    yield UnsignedNumber;
})

const NumberParser64bit = Parse.query(function* () {
    const number = yield MaybeSignedNumber;
    const last = yield Parse.char('L', "the Letter L for 64bit int").once();
    return Parse.return(number);
})

const NumberParser = Parse.queryOr(function* () {
    yield NumberParser64bit;
    yield MaybeSignedNumber;
})

const StringParser = Parse.query(function* () {
    const first = yield Parse.char("\"");
    const rest = yield Parse.char(char => !/\"/.test(char), "string chars without support for \"").many();
    // TODO: add support for escaped " and other
    const last = yield Parse.char("\"");
    return Parse.return(rest.join(''));
})

const BooleanParser = Parse
    .ignoreCase("true").or(Parse.ignoreCase("false")).text()
    .select(bool => bool.toLowerCase() === "true")
    .named('a boolean');

const scalarValue = Parse.query(function* () {
    const leading = yield Parse.whiteSpace.many();
    const value = yield Parse.queryOr(function* () {
        yield StringParser;
        yield NumberParser;
        yield BooleanParser;
    })
    const trailing = yield Parse.whiteSpace.many();
    return Parse.return(value);
})

module.exports = {
    scalarValue
}
