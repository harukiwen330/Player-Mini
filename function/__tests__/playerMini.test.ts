import {parseDurationToSeconds} from "../try";
describe("parseDurationToSeconds", () => {
    const testCases = [
        {input: "PT1M1.2S", expected: 61.2},
        {input: "PT1H30M", expected: 5400},
        {input: "P1DT12H", expected: 129600},
        {input: "P3M", error: true},
        {input: "undefined", error: true},
        {input: "1DT12H", error: true}, // without P and have 
        {input: "P1M1", error: true} // without T and have minute
    ];
    testCases.forEach((testCase, index) => {
        test(`Test case ${index + 1}`, () => {
            const result = parseDurationToSeconds(testCase.input);

            if (testCase.error) {
                expect(result).toBeInstanceOf(Error);
            } else {
                expect(result).toBe(testCase.expected);
            }
        });
    });
});
