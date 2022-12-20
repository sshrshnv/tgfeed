const getCSSVarValueByIndex = (index, ...values) => {
  return values[+index - 1] || values[0]
}

const getCSSSafeAreaEnvValueBySide = (side, additionalValue = 0) => {
  let env = `env(safe-area-inset-${side}, 0)`

  if (additionalValue && parseInt(additionalValue))
    env = `calc(${env} + ${additionalValue})`

  return env
}

module.exports = {
  i: getCSSVarValueByIndex,
  safe: getCSSSafeAreaEnvValueBySide,
}
