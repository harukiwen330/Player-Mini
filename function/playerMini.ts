export function parseDurationToSeconds(duration: string): number | Error {
    if (duration[0] !== "P") {
        return new Error("Invalid duration format.");
    }
    duration = duration.substring(1);

    let [dateDuration, timeDuration] = duration.split("T");

    if (dateDuration.includes("M")) {
        return new Error("Month value is not accepted.");
    }
    
    const dateKeys = ["Y", "W", "D"];
    const timeKeys = ["H", "M", "S"];
    const dateMap = new Map<string, number>();
    const timeMap = new Map<string, number>();

    if (dateDuration !== undefined) {
        for (let key of dateKeys) {
            let [val, rest] = extractValue(dateDuration, key);
            dateMap.set(key, val as number);
            dateDuration = rest as string;
        }
        if (dateDuration !== "") {
            return new Error("Invalid duration format.");
        }
    }

    if (timeDuration !== undefined) {
        for (let key of timeKeys) {
            let [val, rest] = extractValue(timeDuration, key);
            timeMap.set(key, val as number);
            timeDuration = rest as string;
        }
        if (timeDuration !== "") {
            return new Error("Invalid duration format.");
        }
    }

    return secondConverter(dateMap, timeMap);
}

function extractValue(all, match) {
    const [val, rest] = all.split(match);
    if (rest === undefined) {
        return [0, val];
    }
    return [parseFloat(val), rest];
}

function secondConverter(dateMap: Map<string, number>, timeMap: Map<string, number>) {
    return (
        (dateMap.get("Y") || 0) * 365 * 24 * 60 * 60 +
        (dateMap.get("W") || 0) * 7 * 24 * 60 * 60 +
        (dateMap.get("D") || 0) * 24 * 60 * 60 +
        (timeMap.get("H") || 0) * 60 * 60 +
        (timeMap.get("M") || 0) * 60 +
        (timeMap.get("S") || 0)
    );
}
