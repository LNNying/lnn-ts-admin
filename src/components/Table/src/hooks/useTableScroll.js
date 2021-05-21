import { computed, unref, ref, nextTick, watch } from 'vue';
import { getViewportOffset } from '/@/utils/domUtils';
import { isBoolean } from '/@/utils/is';
import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';
import { useModalContext } from '/@/components/Modal';
import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';
import { useDebounceFn } from '@vueuse/core';
export function useTableScroll(propsRef, tableElRef, columnsRef, rowSelectionRef, getDataSourceRef) {
    const tableHeightRef = ref(null);
    const modalFn = useModalContext();
    // Greater than animation time 280
    const debounceRedoHeight = useDebounceFn(redoHeight, 100);
    const getCanResize = computed(() => {
        const { canResize, scroll } = unref(propsRef);
        return canResize && !(scroll || {}).y;
    });
    watch(() => [unref(getCanResize), unref(getDataSourceRef)?.length], () => {
        debounceRedoHeight();
    }, {
        flush: 'post',
    });
    function redoHeight() {
        nextTick(() => {
            calcTableHeight();
        });
    }
    function setHeight(heigh) {
        tableHeightRef.value = heigh;
        //  Solve the problem of modal adaptive height calculation when the form is placed in the modal
        modalFn?.redoModalHeight?.();
    }
    // No need to repeat queries
    let paginationEl;
    let footerEl;
    let bodyEl;
    async function calcTableHeight() {
        const { resizeHeightOffset, pagination, maxHeight } = unref(propsRef);
        const tableData = unref(getDataSourceRef);
        const table = unref(tableElRef);
        if (!table)
            return;
        const tableEl = table.$el;
        if (!tableEl)
            return;
        if (!bodyEl) {
            bodyEl = tableEl.querySelector('.ant-table-body');
        }
        bodyEl.style.height = 'unset';
        if (!unref(getCanResize) || tableData.length === 0)
            return;
        await nextTick();
        //Add a delay to get the correct bottomIncludeBody paginationHeight footerHeight headerHeight
        const headEl = tableEl.querySelector('.ant-table-thead ');
        if (!headEl)
            return;
        // Table height from bottom
        const { bottomIncludeBody } = getViewportOffset(headEl);
        // Table height from bottom height-custom offset
        const paddingHeight = 32;
        // Pager height
        let paginationHeight = 2;
        if (!isBoolean(pagination)) {
            paginationEl = tableEl.querySelector('.ant-pagination');
            if (paginationEl) {
                const offsetHeight = paginationEl.offsetHeight;
                paginationHeight += offsetHeight || 0;
            }
            else {
                // TODO First fix 24
                paginationHeight += 24;
            }
        }
        else {
            paginationHeight = -8;
        }
        let footerHeight = 0;
        if (!isBoolean(pagination)) {
            if (!footerEl) {
                footerEl = tableEl.querySelector('.ant-table-footer');
            }
            else {
                const offsetHeight = footerEl.offsetHeight;
                footerHeight += offsetHeight || 0;
            }
        }
        let headerHeight = 0;
        if (headEl) {
            headerHeight = headEl.offsetHeight;
        }
        let height = bottomIncludeBody -
            (resizeHeightOffset || 0) -
            paddingHeight -
            paginationHeight -
            footerHeight -
            headerHeight;
        height = (height > maxHeight ? maxHeight : height) ?? height;
        setHeight(height);
        bodyEl.style.height = `${height}px`;
    }
    useWindowSizeFn(calcTableHeight, 280);
    onMountedOrActivated(() => {
        calcTableHeight();
        nextTick(() => {
            debounceRedoHeight();
        });
    });
    const getScrollX = computed(() => {
        let width = 0;
        if (unref(rowSelectionRef)) {
            width += 60;
        }
        // TODO props ?? 0;
        const NORMAL_WIDTH = 150;
        const columns = unref(columnsRef).filter((item) => !item.defaultHidden);
        columns.forEach((item) => {
            width += Number.parseInt(item.width) || 0;
        });
        const unsetWidthColumns = columns.filter((item) => !Reflect.has(item, 'width'));
        const len = unsetWidthColumns.length;
        if (len !== 0) {
            width += len * NORMAL_WIDTH;
        }
        const table = unref(tableElRef);
        const tableWidth = table?.$el?.offsetWidth ?? 0;
        return tableWidth > width ? '100%' : width;
    });
    const getScrollRef = computed(() => {
        const tableHeight = unref(tableHeightRef);
        const { canResize, scroll } = unref(propsRef);
        return {
            x: unref(getScrollX),
            y: canResize ? tableHeight : null,
            scrollToFirstRowOnChange: false,
            ...scroll,
        };
    });
    return { getScrollRef, redoHeight };
}
//# sourceMappingURL=useTableScroll.js.map