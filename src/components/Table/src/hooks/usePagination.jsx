import { computed, unref, ref } from 'vue';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { isBoolean } from '/@/utils/is';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../const';
import { useI18n } from '/@/hooks/web/useI18n';
function itemRender({ page, type, originalElement }) {
    if (type === 'prev') {
        return page === 0 ? null : <LeftOutlined />;
    }
    else if (type === 'next') {
        return page === 1 ? null : <RightOutlined />;
    }
    return originalElement;
}
export function usePagination(refProps) {
    const { t } = useI18n();
    const configRef = ref({});
    const show = ref(true);
    const getPaginationInfo = computed(() => {
        const { pagination } = unref(refProps);
        if (!unref(show) || (isBoolean(pagination) && !pagination)) {
            return false;
        }
        return {
            current: 1,
            pageSize: PAGE_SIZE,
            size: 'small',
            defaultPageSize: PAGE_SIZE,
            showTotal: (total) => t('component.table.total', { total }),
            showSizeChanger: true,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            itemRender: itemRender,
            showQuickJumper: true,
            ...(isBoolean(pagination) ? {} : pagination),
            ...unref(configRef),
        };
    });
    function setPagination(info) {
        const paginationInfo = unref(getPaginationInfo);
        configRef.value = {
            ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
            ...info,
        };
    }
    function getPagination() {
        return unref(getPaginationInfo);
    }
    function getShowPagination() {
        return unref(show);
    }
    async function setShowPagination(flag) {
        show.value = flag;
    }
    return { getPagination, getPaginationInfo, setShowPagination, getShowPagination, setPagination };
}
//# sourceMappingURL=usePagination.jsx.map