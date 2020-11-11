export function getAttributeIfSet<T extends unknown>(
  element: Element,
  attribute: string,
  default_value: T = undefined as T) : (T|boolean) {
  if (element instanceof Element && element.hasAttribute(attribute)) {
    const value = element.getAttribute(attribute);
    if (value === '' || value === null) {
      // It was defined, but no value was set. Treat as a true bool value
      return true;
    }

    return value as T;
  }

  return default_value;
}
