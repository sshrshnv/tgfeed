export const formatDate = (
  value,
  {
    time = false
  } = {}
) => {
  return new Intl.DateTimeFormat(self.navigator.languages as string[], time ? {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  } : {

  }).format(value * 1000)
}
