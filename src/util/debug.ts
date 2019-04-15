export const debug: (...msg: any) => void = (process.env.NODE_ENV === 'development')
  ? (...msg: any): void => console.log('[Debug]', ...msg)
  : (): null => null
