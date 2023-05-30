import { captureGlobalErrors } from '~/shared/errors/actions/capture-global-errors'
//captureGlobalErrors()

import { restoreTheme } from '~/core/theme/actions/restore-theme'
restoreTheme()

import { restoreLocale } from '~/core/locale/actions/restore-locale'
restoreLocale()

import { captureInstallPrompt } from '~/core/install/actions/capture-install-prompt'
captureInstallPrompt()

import { preloadIconSprite } from '~/shared/utils/preload-icon-sprite'
preloadIconSprite()
