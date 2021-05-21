import { toggleClass } from './util';
/**
 * Change the status of the project's color weakness mode
 * @param colorWeak
 */
export function updateColorWeak(colorWeak) {
    toggleClass(colorWeak, 'color-weak', document.documentElement);
}
//# sourceMappingURL=updateColorWeak.js.map