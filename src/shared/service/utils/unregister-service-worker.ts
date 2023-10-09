export const unregisterServiceWorker = async () => {
  const registrations = await navigator.serviceWorker?.getRegistrations()
  return Promise.all(registrations.map(reg => reg.unregister()))
}
