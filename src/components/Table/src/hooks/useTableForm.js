import { unref, computed } from 'vue';
import { isFunction } from '/@/utils/is';
export function useTableForm(propsRef, slots, fetch, getLoading) {
    const getFormProps = computed(() => {
        const { formConfig } = unref(propsRef);
        const { submitButtonOptions } = formConfig || {};
        return {
            showAdvancedButton: true,
            ...formConfig,
            submitButtonOptions: { loading: unref(getLoading), ...submitButtonOptions },
            compact: true,
        };
    });
    const getFormSlotKeys = computed(() => {
        const keys = Object.keys(slots);
        return keys.map((item) => (item.startsWith('form-') ? item : null)).filter(Boolean);
    });
    function replaceFormSlotKey(key) {
        if (!key)
            return '';
        return key?.replace?.(/form\-/, '') ?? '';
    }
    function handleSearchInfoChange(info) {
        const { handleSearchInfoFn } = unref(propsRef);
        if (handleSearchInfoFn && isFunction(handleSearchInfoFn)) {
            info = handleSearchInfoFn(info) || info;
        }
        fetch({ searchInfo: info, page: 1 });
    }
    return {
        getFormProps,
        replaceFormSlotKey,
        getFormSlotKeys,
        handleSearchInfoChange,
    };
}
//# sourceMappingURL=useTableForm.js.map