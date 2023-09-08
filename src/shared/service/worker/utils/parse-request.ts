export const parseRequest = (request: Request) => {
  const { headers } = request
  const rangeHeader = headers.get('Range') || ''
  const rangeHeaderValue = rangeHeader.split('=')[1] || ''
  const range = rangeHeaderValue.split(', ')[0]
  return range.split('-').map(value => value ? +value : 0)
}
