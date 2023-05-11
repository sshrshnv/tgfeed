export const setDelay = (value: number) =>
  new self.Promise(resolve => self.setTimeout(resolve, value))
