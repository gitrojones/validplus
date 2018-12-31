export default (process.env.NODE_ENV === 'development')
  ? (...msg: any): void => console.log('[Debug]', ...msg)
  : (): void => null
