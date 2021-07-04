import { LABELS } from '../constants';

export class TranslationService {
  static instant(key: string): string {
    if (LABELS[key]) {
      return LABELS[key];
    }

    console.warn(`${key} not found !`);

    return '';
  }
}