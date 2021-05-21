import { ref, watch } from 'vue';
import { isDef } from '/@/utils/is';
export function useCopyToClipboard(initial) {
    const clipboardRef = ref(initial || '');
    const isSuccessRef = ref(false);
    const copiedRef = ref(false);
    watch(clipboardRef, (str) => {
        if (isDef(str)) {
            copiedRef.value = true;
            isSuccessRef.value = copyTextToClipboard(str);
        }
    }, { immediate: !!initial, flush: 'sync' });
    return { clipboardRef, isSuccessRef, copiedRef };
}
export function copyTextToClipboard(input, { target = document.body } = {}) {
    const element = document.createElement('textarea');
    const previouslyFocusedElement = document.activeElement;
    element.value = input;
    element.setAttribute('readonly', '');
    element.style.contain = 'strict';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.fontSize = '12pt';
    const selection = document.getSelection();
    let originalRange;
    if (selection && selection.rangeCount > 0) {
        originalRange = selection.getRangeAt(0);
    }
    target.append(element);
    element.select();
    element.selectionStart = 0;
    element.selectionEnd = input.length;
    let isSuccess = false;
    try {
        isSuccess = document.execCommand('copy');
    }
    catch (e) {
        throw new Error(e);
    }
    element.remove();
    if (originalRange && selection) {
        selection.removeAllRanges();
        selection.addRange(originalRange);
    }
    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
    }
    return isSuccess;
}
//# sourceMappingURL=useCopyToClipboard.js.map