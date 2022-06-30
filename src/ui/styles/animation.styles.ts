const isAnimationSupported = !!self.document.body.animate

export const animationClass =
  isAnimationSupported ? '_animation' : '_animationFallback'
