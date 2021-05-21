import { DEFAULT_FILTER_FN, DEFAULT_SORT_FN, FETCH_SETTING } from './const';
import { propTypes } from '/@/utils/propTypes';
export const basicProps = {
    clickToRowSelect: propTypes.bool.def(true),
    isTreeTable: propTypes.bool.def(false),
    tableSetting: propTypes.shape({}),
    inset: propTypes.bool,
    sortFn: {
        type: Function,
        default: DEFAULT_SORT_FN,
    },
    filterFn: {
        type: Function,
        default: DEFAULT_FILTER_FN,
    },
    showTableSetting: propTypes.bool,
    autoCreateKey: propTypes.bool.def(true),
    striped: propTypes.bool.def(true),
    showSummary: propTypes.bool,
    summaryFunc: {
        type: [Function, Array],
        default: null,
    },
    summaryData: {
        type: Array,
        default: null,
    },
    indentSize: propTypes.number.def(24),
    canColDrag: propTypes.bool.def(true),
    api: {
        type: Function,
        default: null,
    },
    beforeFetch: {
        type: Function,
        default: null,
    },
    afterFetch: {
        type: Function,
        default: null,
    },
    handleSearchInfoFn: {
        type: Function,
        default: null,
    },
    fetchSetting: {
        type: Object,
        default: () => {
            return FETCH_SETTING;
        },
    },
    // 立即请求接口
    immediate: propTypes.bool.def(true),
    emptyDataIsShowTable: propTypes.bool.def(true),
    // 额外的请求参数
    searchInfo: {
        type: Object,
        default: null,
    },
    // 使用搜索表单
    useSearchForm: propTypes.bool,
    // 表单配置
    formConfig: {
        type: Object,
        default: null,
    },
    columns: {
        type: [Array],
        default: () => [],
    },
    showIndexColumn: propTypes.bool.def(true),
    indexColumnProps: {
        type: Object,
        default: null,
    },
    actionColumn: {
        type: Object,
        default: null,
    },
    ellipsis: propTypes.bool.def(true),
    canResize: propTypes.bool.def(true),
    clearSelectOnPageChange: propTypes.bool,
    resizeHeightOffset: propTypes.number.def(0),
    rowSelection: {
        type: Object,
        default: null,
    },
    title: {
        type: [String, Function],
        default: null,
    },
    titleHelpMessage: {
        type: [String, Array],
    },
    maxHeight: propTypes.number,
    dataSource: {
        type: Array,
        default: null,
    },
    rowKey: {
        type: [String, Function],
        default: '',
    },
    bordered: propTypes.bool,
    pagination: {
        type: [Object, Boolean],
        default: null,
    },
    loading: propTypes.bool,
    rowClassName: {
        type: Function,
    },
    scroll: {
        type: Object,
        default: null,
    },
};
//# sourceMappingURL=props.js.map