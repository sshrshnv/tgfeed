export const generateRandomId = () =>
  `${Math.floor(Math.random() * 0xFFFFFFFF)}${Math.floor(Math.random() * 0xFFFFFF)}`.slice(0, 16)
