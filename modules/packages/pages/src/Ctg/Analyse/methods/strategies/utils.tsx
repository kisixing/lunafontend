
export function inRange(value: number, min: number, max: number): boolean {
    let result = false;
    if (value >= min && value <= max)
        result = true;
    return result;
}
