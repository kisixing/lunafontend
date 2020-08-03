
export function inRange(value: number | string, min: number, max: number): boolean {
    let v = typeof value === 'string' ? Number(value) : value
    let result = false;
    if (v >= min && v <= max)
        result = true;
    return result;
}
export function getValue(v: number | string): any {
    const a = String(v)
    const modified = a.startsWith('00');
    return modified ? Number.parseInt(a) : false
}
export function isModified(v: any) {
    return typeof v === 'number'
}