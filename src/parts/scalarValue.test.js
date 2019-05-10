const { TestParser, Assertion } = require('../util/test')
const { scalarValue } = require("./scalarValue");


module.exports = new TestParser("scalarValue",
    new Assertion(scalarValue.parse("0027"), 0027, "octal"),
    new Assertion(scalarValue.parse("5"), 5, "integer"),
    new Assertion(scalarValue.parse("546368"), 546368, "big integer"),
    new Assertion(scalarValue.parse("0x1FC3"), 0x1FC3, "hex"),
    new Assertion(scalarValue.parse("40.05"), 40.05, "float"),
//signed numbers
    new Assertion(scalarValue.parse("-0027"), -0027, "signed octal"),
    new Assertion(scalarValue.parse("-5"), -5, "signed integer"),
    new Assertion(scalarValue.parse("-546368"), -546368, "signed big integer"),
    new Assertion(scalarValue.parse("-0x1FC3"), -0x1FC3, "signed hex"),
    new Assertion(scalarValue.parse("+0027"), 0027, "signed octal"),
    new Assertion(scalarValue.parse("-4.05"), -4.05, "signed float"),
    new Assertion(scalarValue.parse("+9"), 9, "signed integer"),
    new Assertion(scalarValue.parse("+546368"), 546368, "signed big integer"),
    new Assertion(scalarValue.parse("+0x1FC3"), 0x1FC3, "signed hex"),
    new Assertion(scalarValue.parse("+40.05"), 40.05, "signed float"),
//64bit numbers
    new Assertion(scalarValue.parse("0027"), 0027, "64bit octal"),
    new Assertion(scalarValue.parse("5"), 5, "64bit integer"),
    new Assertion(scalarValue.parse("546368"), 546368, "64bit big integer"),
    new Assertion(scalarValue.parse("0x1FC3"), 0x1FC3, "64bit hex"),
    new Assertion(scalarValue.parse("940.0554L"), 940.0554, "64bit float"),
// extra number tests    
    new Assertion(scalarValue.parse("-8L"), -8, "signed 64bit integer"),
    new Assertion(scalarValue.parse("-0"), 0, "0"),
    new Assertion(scalarValue.parse("-00"), 00, "00"),
//boolean
    new Assertion(scalarValue.parse("true"), true, "boolean true"),
    new Assertion(scalarValue.parse("false"), false, "boolean false"),
    new Assertion(scalarValue.parse("TRUE"), true, "boolean true"),
    new Assertion(scalarValue.parse("FALSE"), false, "boolean false"),
    new Assertion(scalarValue.parse("TrUe"), true, "boolean true"),
    new Assertion(scalarValue.parse("FaLsE"), false, "boolean false"),
// strings
    new Assertion(scalarValue.parse("\"test\""), "test", "string"),
    new Assertion(scalarValue.parse("\"4\""), "4", "number in string"),
    new Assertion(scalarValue.parse("\"Hello World\""), "Hello World", "string with whitespaces"),
    
)