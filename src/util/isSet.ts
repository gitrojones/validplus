export default (parameter: any): boolean => {
  return typeof parameter !== 'undefined' && parameter !== null
}
