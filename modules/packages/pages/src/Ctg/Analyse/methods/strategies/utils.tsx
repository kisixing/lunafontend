
export function inRange(value: number | string, min: number, max: number): boolean {
    let v = typeof value === 'string' ? Number(value) : value
    let result = false;
    if (v >= min && v <= max)
        result = true;
    return result;
}
