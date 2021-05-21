import { computed, unref, ref, toRaw } from 'vue';
import { ROW_KEY } from '../const';
export function useTableExpand(propsRef, tableData, emit) {
    const expandedRowKeys = ref([]);
    const getAutoCreateKey = computed(() => {
        return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
    });
    const getRowKey = computed(() => {
        const { rowKey } = unref(propsRef);
        return unref(getAutoCreateKey) ? ROW_KEY : rowKey;
    });
    const getExpandOption = computed(() => {
        const { isTreeTable } = unref(propsRef);
        if (!isTreeTable)
            return {};
        return {
            expandedRowKeys: unref(expandedRowKeys),
            onExpandedRowsChange: (keys) => {
                expandedRowKeys.value = keys;
                emit('expanded-rows-change', keys);
            },
        };
    });
    function expandAll() {
        const keys = getAllKeys();
        expandedRowKeys.value = keys;
    }
    function getAllKeys(data) {
        const keys = [];
        const { childrenColumnName } = unref(propsRef);
        toRaw(data || unref(tableData)).forEach((item) => {
            keys.push(item[unref(getRowKey)]);
            const children = item[childrenColumnName || 'children'];
            if (children?.length) {
                keys.push(...getAllKeys(children));
            }
        });
        return keys;
    }
    function collapseAll() {
        expandedRowKeys.value = [];
    }
    return { getExpandOption, expandAll, collapseAll };
}
//# sourceMappingURL=useTableExpand.js.map