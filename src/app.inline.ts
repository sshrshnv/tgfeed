import { captureGlobalErrors } from '~/shared/errors/actions/capture-global-errors'
captureGlobalErrors()

import { presetTheme } from '~/core/theme/actions/preset-theme'
presetTheme()

import { presetLocale } from '~/core/locale/actions/preset-locale'
presetLocale()

import { captureInstallPrompt } from '~/core/install/actions/capture-install-prompt'
captureInstallPrompt()

import { preloadIconSprite } from '~/shared/ui/utils/preload-icon-sprite'
preloadIconSprite()
