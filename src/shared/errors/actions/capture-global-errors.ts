import { loadErrorTracker } from './load-error-tracker'

type OnUnhandledrejectionEventHandlerNonNull = ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) & ((this: Window, ev: PromiseRejectionEvent) => any)
type OnUnhandledrejectionEventHandler = OnUnhandledrejectionEventHandlerNonNull | null

type ErrorEventParams = Parameters<OnErrorEventHandlerNonNull>
type UnhandledrejectionEventParams = Parameters<OnUnhandledrejectionEventHandlerNonNull>

let errorEventParamsQueue: ErrorEventParams[] | null = []
let unhandledrejectionEventParamsQueue: UnhandledrejectionEventParams[] | null = []

let errorEventHandler: OnErrorEventHandler = (...params: ErrorEventParams) => {
  errorEventParamsQueue?.push(params)
  loadErrorTracker().then(onErrorsTrackerLoad)
}
let unhandledrejectionEventHandler: OnUnhandledrejectionEventHandler = (...params: UnhandledrejectionEventParams) => {
  unhandledrejectionEventParamsQueue?.push(params)
  loadErrorTracker().then(onErrorsTrackerLoad)
}

let errorTrackerLoaded = false
const onErrorsTrackerLoad = () => {
  if (errorTrackerLoaded) return
  errorTrackerLoaded = true

  errorEventHandler = null
  unhandledrejectionEventHandler = null

  errorEventParamsQueue?.forEach(params => self.onerror?.(...params))
  unhandledrejectionEventParamsQueue?.forEach(params => self.onunhandledrejection?.(...params))

  errorEventParamsQueue = null
  unhandledrejectionEventParamsQueue = null
}

export const captureGlobalErrors = () => {
  if (!self.onerror) self.onerror = errorEventHandler
  if (!self.onunhandledrejection) self.onunhandledrejection = unhandledrejectionEventHandler
}
