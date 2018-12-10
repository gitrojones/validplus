export default (str: string, _default: (boolean | null) = null): boolean => {
  if (typeof str !== 'string' || str.length === 0) return _default;

  if (str.toLowerCase() === 'true') return true;
  if (str.toLowerCase() === 'false') return false;
  return !!str;
};