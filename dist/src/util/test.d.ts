export declare class Assertion {
    actual: any;
    expected: any;
    name: String;
    /**
     *
     * @param {any} actual
     * @param {any} expected
     * @param {String} name
     */
    constructor(actual: any, expected: any, name: any);
    assert(): boolean;
}
export declare class TestParser {
    part_name: any;
    assertions: any[];
    /**
     *
     * @param {String} part_name
     * @param  {...Assertion|TestParser} assertions
     */
    constructor(part_name: any, ...assertions: any[]);
    runTest(nestedLevel?: number): boolean | {
        info: string;
        error_prefix: string;
        errors: any;
    };
    _displayOutput({ info, errors, error_prefix }: {
        info: any;
        errors: any;
        error_prefix: any;
    }): void;
    _generateOutput(errors: any, nestedLevel: any, failedChildTests: any): {
        info: string;
        error_prefix: string;
        errors: any;
    };
}
