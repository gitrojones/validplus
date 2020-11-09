export function getAttributeIfSet(element: Element, attribute: string, default_value: unknown) : unknown {
  if (element instanceof Element && element.hasAttribute(attribute)) {
    const value = element.getAttribute(attribute);
    if (value === '' || value === null) {
      // It was defined, but no value was set. Treat as a true bool value
      return true;
    }

    return value;
  }

  return default_value;
}
