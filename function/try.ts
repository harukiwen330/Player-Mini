export function parseDurationToSeconds(duration: string): number | Error {
    let passedT = false;
    let stack: string[] = [];
    let years: number = 0;
    let weeks: number = 0;
    let days: number = 0;
    let hours: number = 0;
    let minutes: number = 0;
    let seconds: number = 0;
    if (duration[0] !== "P") return new Error("Invalid duration format");
    for (let unit = 1; unit < duration.length; unit++) {
        // Store num in the stack as string. Parse it and turn into variable
       
       
        // Check if (passedT === false && duration === "M") new Error("Months not supported");
    }

    return generateTotalSeconds(years, weeks, days, hours, minutes, seconds);
}

function generateTotalSeconds(years: number, weeks: number, days: number, hours: number, minutes: number, seconds: number): number {
    return years * 365 * 24 * 60 * 60 + weeks * 7 * 24 * 60 * 60 + days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + (seconds || 0);
}
