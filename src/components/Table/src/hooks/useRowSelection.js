import { computed, ref, unref, toRaw } from 'vue';
import { ROW_KEY } from '../const';
export function useRowSelection(propsRef, tableData, emit) {
    const selectedRowKeysRef = ref([]);
    const selectedRowRef = ref([]);
    const getRowSelectionRef = computed(() => {
        const { rowSelection } = unref(propsRef);
        if (!rowSelection) {
            return null;
        }
        return {
            selectedRowKeys: unref(selectedRowKeysRef),
            hideDefaultSelections: false,
            onChange: (selectedRowKeys, selectedRows) => {
                selectedRowKeysRef.value = selectedRowKeys;
                selectedRowRef.value = selectedRows;
                emit('selection-change', {
                    keys: selectedRowKeys,
                    rows: selectedRows,
                });
            },
            ...(rowSelection === undefined ? {} : rowSelection),
        };
    });
    const getAutoCreateKey = computed(() => {
        return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
    });
    const getRowKey = computed(() => {
        const { rowKey } = unref(propsRef);
        return unref(getAutoCreateKey) ? ROW_KEY : rowKey;
    });
    function setSelectedRowKeys(rowKeys) {
        selectedRowKeysRef.value = rowKeys;
        const rows = toRaw(unref(tableData)).filter((item) => rowKeys.includes(item[unref(getRowKey)]));
        selectedRowRef.value = rows;
    }
    function setSelectedRows(rows) {
        selectedRowRef.value = rows;
    }
    function clearSelectedRowKeys() {
        selectedRowRef.value = [];
        selectedRowKeysRef.value = [];
    }
    function deleteSelectRowByKey(key) {
        const selectedRowKeys = unref(selectedRowKeysRef);
        const index = selectedRowKeys.findIndex((item) => item === key);
        if (index !== -1) {
            unref(selectedRowKeysRef).splice(index, 1);
        }
    }
    function getSelectRowKeys() {
        return unref(selectedRowKeysRef);
    }
    function getSelectRows() {
        // const ret = toRaw(unref(selectedRowRef)).map((item) => toRaw(item));
        return unref(selectedRowRef);
    }
    function getRowSelection() {
        return unref(getRowSelectionRef);
    }
    return {
        getRowSelection,
        getRowSelectionRef,
        getSelectRows,
        getSelectRowKeys,
        setSelectedRowKeys,
        clearSelectedRowKeys,
        deleteSelectRowByKey,
        setSelectedRows,
    };
}
//# sourceMappingURL=useRowSelection.js.map