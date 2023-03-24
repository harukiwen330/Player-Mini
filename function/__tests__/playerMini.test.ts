import {parseDurationToSeconds} from "../playerMini";
describe("parseDurationToSeconds", () => {
    const testCases = [
        {input: "PT1M1.2S", expected: 61.2},
        {input: "PT1H30M", expected: 5400},
        {input: "PT1H1M1S", expected: 3661},
        {input: "P1Y2D", expected: 31708800},
        {input: "P1Y2DT1H1M1S", expected: 31712461},
        {input: "P1DT12H", expected: 129600},
        {input: "PT3H", expected: 10800},
        {input: "P3M", error: true}, // No month is allowed
        {input: "P3W2T12H", error: true}, // without ending with Y/W/D before T is passed
        {input: "PT1H1.2", error: true}, // without ending with H/M/S after T is passed
        {input: "undefined", error: true}, // invalid string
        {input: "1DT12H", error: true} // without P and have
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
