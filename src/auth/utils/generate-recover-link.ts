export const generateRecoverLink = (phoneNumber = '') => {
  const email = 'recover@telegram.org'
  const subject = encodeURIComponent(`Banned phone number: ${phoneNumber}`)
  const body = encodeURIComponent(`I'm trying to use my mobile phone number:\n+${phoneNumber}\nBut Telegram says it's banned. Please help.`)
  return `mailto:${email}?subject=${subject}&body=${body}`
}
