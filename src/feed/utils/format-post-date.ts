export const formatPostDate = (
  value,
  {
    time = false
  } = {}
) => {
  return new Intl.DateTimeFormat(self.navigator.languages as string[], time ? {
    hour: '2-digit',
    minute: '2-digit'
  } : {

  }).format(value * 1000)
}
