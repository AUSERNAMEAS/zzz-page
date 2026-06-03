import type { ActionId } from '../types/action'
import type { TranslationKey } from './types'

export function actionTextKey(
  id: ActionId,
  field: 'title' | 'description' | 'imageAlt',
): TranslationKey {
  return `actions.${id}.${field}` as TranslationKey
}
