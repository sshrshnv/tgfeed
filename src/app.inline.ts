import { captureGlobalErrors } from '~/tracking/errors/actions/capture-global-errors'
//captureGlobalErrors()

import { presetTheme } from '~/client/settings/theme/actions/preset-theme'
presetTheme()

import { captureInstallPrompt } from '~/client/settings/install/actions/capture-install-prompt'
captureInstallPrompt()
