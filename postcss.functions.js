const getClVarValueByIndex = (index, ...values) => {
  return values[+index - 1] || values[0]
}

const getClSafeAreaEnvValueBySide = (side, additionalValue = 0) => {
  let env = `env(safe-area-inset-${side}, 0)`

  if (additionalValue) {
    env = `calc(${env} + ${additionalValue})`
  }

  return env
}

module.exports = {
  i: getClVarValueByIndex,
  safe: getClSafeAreaEnvValueBySide,
}
