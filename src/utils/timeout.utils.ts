export const setTimeout = (value: number) =>
  new Promise(resolve => self.setTimeout(resolve, value))
