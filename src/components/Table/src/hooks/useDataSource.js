import { ref, unref, computed, onMounted, watch, reactive, watchEffect, } from 'vue';
import { useTimeoutFn } from '/@/hooks/core/useTimeout';
import { buildUUID } from '/@/utils/uuid';
import { isFunction, isBoolean } from '/@/utils/is';
import { get, cloneDeep } from 'lodash-es';
import { FETCH_SETTING, ROW_KEY, PAGE_SIZE } from '../const';
export function useDataSource(propsRef, { getPaginationInfo, setPagination, setLoading, getFieldsValue, clearSelectedRowKeys, tableData, }, emit) {
    const searchState = reactive({
        sortInfo: {},
        filterInfo: {},
    });
    const dataSourceRef = ref([]);
    watchEffect(() => {
        tableData.value = unref(dataSourceRef);
    });
    watch(() => unref(propsRef).dataSource, () => {
        const { dataSource, api } = unref(propsRef);
        !api && dataSource && (dataSourceRef.value = dataSource);
    }, {
        immediate: true,
    });
    function handleTableChange(pagination, filters, sorter) {
        const { clearSelectOnPageChange, sortFn, filterFn } = unref(propsRef);
        if (clearSelectOnPageChange) {
            clearSelectedRowKeys();
        }
        setPagination(pagination);
        const params = {};
        if (sorter && isFunction(sortFn)) {
            const sortInfo = sortFn(sorter);
            searchState.sortInfo = sortInfo;
            params.sortInfo = sortInfo;
        }
        if (filters && isFunction(filterFn)) {
            const filterInfo = filterFn(filters);
            searchState.filterInfo = filterInfo;
            params.filterInfo = filterInfo;
        }
        fetch(params);
    }
    function setTableKey(items) {
        if (!items || !Array.isArray(items))
            return;
        items.forEach((item) => {
            if (!item[ROW_KEY]) {
                item[ROW_KEY] = buildUUID();
            }
            if (item.children && item.children.length) {
                setTableKey(item.children);
            }
        });
    }
    const getAutoCreateKey = computed(() => {
        return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
    });
    const getRowKey = computed(() => {
        const { rowKey } = unref(propsRef);
        return unref(getAutoCreateKey) ? ROW_KEY : rowKey;
    });
    const getDataSourceRef = computed(() => {
        const dataSource = unref(dataSourceRef);
        if (!dataSource || dataSource.length === 0) {
            return [];
        }
        if (unref(getAutoCreateKey)) {
            const firstItem = dataSource[0];
            const lastItem = dataSource[dataSource.length - 1];
            if (firstItem && lastItem) {
                if (!firstItem[ROW_KEY] || !lastItem[ROW_KEY]) {
                    const data = cloneDeep(unref(dataSourceRef));
                    data.forEach((item) => {
                        if (!item[ROW_KEY]) {
                            item[ROW_KEY] = buildUUID();
                        }
                        if (item.children && item.children.length) {
                            setTableKey(item.children);
                        }
                    });
                    dataSourceRef.value = data;
                }
            }
        }
        return unref(dataSourceRef);
    });
    async function updateTableData(index, key, value) {
        const record = dataSourceRef.value[index];
        if (record) {
            dataSourceRef.value[index][key] = value;
        }
        return dataSourceRef.value[index];
    }
    async function fetch(opt) {
        const { api, searchInfo, fetchSetting, beforeFetch, afterFetch, useSearchForm, pagination, } = unref(propsRef);
        if (!api || !isFunction(api))
            return;
        try {
            setLoading(true);
            const { pageField, sizeField, listField, totalField } = fetchSetting || FETCH_SETTING;
            let pageParams = {};
            const { current = 1, pageSize = PAGE_SIZE } = unref(getPaginationInfo);
            if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
                pageParams = {};
            }
            else {
                pageParams[pageField] = (opt && opt.page) || current;
                pageParams[sizeField] = pageSize;
            }
            const { sortInfo = {}, filterInfo } = searchState;
            let params = {
                ...pageParams,
                ...(useSearchForm ? getFieldsValue() : {}),
                ...searchInfo,
                ...(opt?.searchInfo ?? {}),
                ...sortInfo,
                ...filterInfo,
                ...(opt?.sortInfo ?? {}),
                ...(opt?.filterInfo ?? {}),
            };
            if (beforeFetch && isFunction(beforeFetch)) {
                params = beforeFetch(params) || params;
            }
            const res = await api(params);
            const isArrayResult = Array.isArray(res);
            let resultItems = isArrayResult ? res : get(res, listField);
            const resultTotal = isArrayResult ? 0 : get(res, totalField);
            // ??????????????????????????????????????????????????????????????????????????????getPaginationRef????????????????????????????????????????????????????????????????????????
            if (resultTotal) {
                const currentTotalPage = Math.ceil(resultTotal / pageSize);
                if (current > currentTotalPage) {
                    setPagination({
                        current: currentTotalPage,
                    });
                    fetch(opt);
                }
            }
            if (afterFetch && isFunction(afterFetch)) {
                resultItems = afterFetch(resultItems) || resultItems;
            }
            dataSourceRef.value = resultItems;
            setPagination({
                total: resultTotal || 0,
            });
            if (opt && opt.page) {
                setPagination({
                    current: opt.page || 1,
                });
            }
            emit('fetch-success', {
                items: unref(resultItems),
                total: resultTotal,
            });
        }
        catch (error) {
            emit('fetch-error', error);
            dataSourceRef.value = [];
            setPagination({
                total: 0,
            });
        }
        finally {
            setLoading(false);
        }
    }
    function setTableData(values) {
        dataSourceRef.value = values;
    }
    function getDataSource() {
        return getDataSourceRef.value;
    }
    async function reload(opt) {
        await fetch(opt);
    }
    onMounted(() => {
        useTimeoutFn(() => {
            unref(propsRef).immediate && fetch();
        }, 16);
    });
    return {
        getDataSourceRef,
        getDataSource,
        getRowKey,
        setTableData,
        getAutoCreateKey,
        fetch,
        reload,
        updateTableData,
        handleTableChange,
    };
}
//# sourceMappingURL=useDataSource.js.map