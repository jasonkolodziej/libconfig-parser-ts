class Assertion {
    /**
     * 
     * @param {any} actual 
     * @param {any} expected 
     * @param {String} name 
     */
    constructor(actual, expected, name) {
        this.actual = actual
        this.expected = expected
        this.name = name
    }

    assert() {
        const aa = typeof this.actual === "object" ? JSON.stringify(this.actual) : this.actual
        const bb = typeof this.expected === "object" ? JSON.stringify(this.expected) : this.expected
        if (aa != bb) {
            throw `${this.name} failed, expected ${this.actual} == ${this.expected}`
        } else {
            return true
        }
    }
}

class TestParser {
    /**
     * 
     * @param {String} part_name 
     * @param  {...Assertion} assertions 
     */
    constructor(part_name, ...assertions) {
        this.part_name = part_name
        this.assertions = assertions
    }

    runTest() {
        let errors = []
        for (let i = 0; i < this.assertions.length; i++) {
            const assertion = this.assertions[i];
            try {
                if (!assertion.assert()) { throw new Error("Impossible Error") }
            } catch (error) {
                errors.push(error)
            }
        }
        console.info(`${this.part_name} (${this.assertions.length - errors.length}/${this.assertions.length})`)
        errors.forEach(error => console.log("-> ", error))
    }
}

module.exports = {
    Assertion,
    TestParser,
}