export function deepEquals(a: any, b: any): boolean {
  if (a === b) return true;

  if (typeof a !== typeof b) return false;

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (typeof a === "function" && typeof b === "function") {
    return a.toString() === b.toString();
  }

  if (typeof a === "object" && a !== null && b !== null) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!deepEquals(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
}
