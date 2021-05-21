import { toggleClass } from './util';
/**
 * Change project gray mode status
 * @param gray
 */
export function updateGrayMode(gray) {
    toggleClass(gray, 'gray-mode', document.documentElement);
}
//# sourceMappingURL=updateGrayMode.js.map