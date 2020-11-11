export default (function IEVersion() {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');
  const trident = ua.indexOf('Trident/');
  const edge = ua.indexOf('Edge/');
  if (msie > 0) return 10;
  if (trident > 0) return 11;
  if (edge > 0) return 12; // Edge or greater
  return false; // NOT IE
})();