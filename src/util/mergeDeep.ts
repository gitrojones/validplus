/**
 * Simple object check.
 */
const isObject = function (item: any): boolean {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects, left most takes priority
 *
 * @param target - The object to merge onto
 * @param sources - The object(s) to merge into the target
 */
const mergeDeep = function (target: object, ...sources: object[]): object {
  if (!Array.isArray(sources) || sources.length < 1) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        return mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export default mergeDeep
