export const timeout = (value: number) =>
  new Promise(resolve => setTimeout(resolve, value))
