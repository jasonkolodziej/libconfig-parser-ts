const { Parse } = require('sprache');

const Integer = Parse.digit.xAtLeastOnce().select(digits => {
    return Number.parseInt(digits.join(''), 10);
}).token().named('an integer');

const Octal = Parse.query(function* () {
    yield Parse.char("0")
    const number = yield Parse.digit.xAtLeastOnce().select(digits => {
        return Number.parseInt(digits.join(''), 8);
    }).token().named('octal notation number');
    return Parse.return(number)
})



const Hex = Parse.query(function* () {
    yield Parse.string("0x")
    const number = yield Parse.letterOrDigit.xAtLeastOnce().select(digits => {
        return Number.parseInt(digits.join(''), 16);
    }).token().named('a binary value');
    return Parse.return(number)
})

const Float = Parse.query(function* () {
    const upperPart = yield Parse.digit.xAtLeastOnce()
    yield Parse.char(".")
    const lowerPart = yield Parse.digit.xAtLeastOnce()
    const numberString = [...upperPart,'.',...lowerPart].join('')
    return Parse.return(Number.parseFloat(numberString))
})

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

function generateSignedParser (numberParser){
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

// console.log(NumberParser.parse("95"))

const StringParser = Parse.query(function* () {
    const first = yield Parse.char("\"");
    const rest = yield Parse.char(char => !/\"/.test(char), "string chars without support for \"").many();
    // TODO: add support for escaped " and other
    const last = yield Parse.char("\"");
    return Parse.return(rest.join(''));
})

const BooleanParser = Parse.query(function* () {
    const booleanLetters = yield Parse.queryOr(function* () {
        yield Parse.ignoreCase("true")
        yield Parse.ignoreCase("false")
    })
    const boolean = booleanLetters.join('').toLowerCase()
    if(boolean !== "true" && boolean !== "false") {
        console.log(boolean)
        throw new Error("Impossible error");
    }
    return Parse.return(boolean === "true");
})


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
    Integer,
    scalarValue
}
