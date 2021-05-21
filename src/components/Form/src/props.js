import { propTypes } from '/@/utils/propTypes';
export const basicProps = {
    model: {
        type: Object,
        default: {},
    },
    // 标签宽度  固定宽度
    labelWidth: {
        type: [Number, String],
        default: 0,
    },
    fieldMapToTime: {
        type: Array,
        default: () => [],
    },
    compact: propTypes.bool,
    // 表单配置规则
    schemas: {
        type: [Array],
        default: () => [],
    },
    mergeDynamicData: {
        type: Object,
        default: null,
    },
    baseRowStyle: {
        type: Object,
    },
    baseColProps: {
        type: Object,
    },
    autoSetPlaceHolder: propTypes.bool.def(true),
    // 在INPUT组件上单击回车时，是否自动提交
    autoSubmitOnEnter: propTypes.bool.def(false),
    submitOnReset: propTypes.bool,
    size: propTypes.oneOf(['default', 'small', 'large']).def('default'),
    // 禁用表单
    disabled: propTypes.bool,
    emptySpan: {
        type: [Number, Object],
        default: 0,
    },
    // 是否显示收起展开按钮
    showAdvancedButton: propTypes.bool,
    // 转化时间
    transformDateFunc: {
        type: Function,
        default: (date) => {
            return date._isAMomentObject ? date?.format('YYYY-MM-DD HH:mm:ss') : date;
        },
    },
    rulesMessageJoinLabel: propTypes.bool.def(true),
    // 超过3行自动折叠
    autoAdvancedLine: propTypes.number.def(3),
    // 是否显示操作按钮
    showActionButtonGroup: propTypes.bool.def(true),
    // 操作列Col配置
    actionColOptions: Object,
    // 显示重置按钮
    showResetButton: propTypes.bool.def(true),
    // 是否聚焦第一个输入框，只在第一个表单项为input的时候作用
    autoFocusFirstItem: propTypes.bool,
    // 重置按钮配置
    resetButtonOptions: Object,
    // 显示确认按钮
    showSubmitButton: propTypes.bool.def(true),
    // 确认按钮配置
    submitButtonOptions: Object,
    // 自定义重置函数
    resetFunc: Function,
    submitFunc: Function,
    // 以下为默认props
    hideRequiredMark: propTypes.bool,
    labelCol: Object,
    layout: propTypes.oneOf(['horizontal', 'vertical', 'inline']).def('horizontal'),
    tableAction: {
        type: Object,
    },
    wrapperCol: Object,
    colon: propTypes.bool,
    labelAlign: propTypes.string,
};
//# sourceMappingURL=props.js.map