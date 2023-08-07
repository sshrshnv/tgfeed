export const parseFormData = <T>(formData: FormData) => {
  const data = [...formData.entries()].reduce((obj, [key, value]) => {
    if (key.endsWith('[]')) {
      key = key.replace('[]', '')
      obj[key] ??= []
      obj[key].push(value)
    } else {
      obj[key] = value
    }
    return obj
  }, {} as T)
  return data
}
