import { nextTick, unref } from 'vue';
export function useSortable(el, options) {
    function initSortable() {
        nextTick(async () => {
            if (!el)
                return;
            const Sortable = (await import('sortablejs')).default;
            Sortable.create(unref(el), {
                animation: 500,
                delay: 400,
                delayOnTouchOnly: true,
                ...options,
            });
        });
    }
    return { initSortable };
}
//# sourceMappingURL=useSortable.js.map