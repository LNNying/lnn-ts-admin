import { propTypes } from '/@/utils/propTypes';
export const basicProps = {
    value: {
        type: [Object, Array],
    },
    renderIcon: {
        type: Function,
    },
    helpMessage: {
        type: [String, Array],
        default: '',
    },
    title: propTypes.string,
    toolbar: propTypes.bool,
    search: propTypes.bool,
    checkStrictly: propTypes.bool,
    clickRowToExpand: propTypes.bool.def(true),
    checkable: propTypes.bool.def(false),
    replaceFields: {
        type: Object,
    },
    treeData: {
        type: Array,
    },
    actionList: {
        type: Array,
        default: () => [],
    },
    expandedKeys: {
        type: Array,
        default: () => [],
    },
    selectedKeys: {
        type: Array,
        default: () => [],
    },
    checkedKeys: {
        type: Array,
        default: () => [],
    },
    beforeRightClick: {
        type: Function,
        default: null,
    },
    rightMenuList: {
        type: Array,
    },
};
export const treeNodeProps = {
    actionList: {
        type: Array,
        default: () => [],
    },
    replaceFields: {
        type: Object,
    },
    treeData: {
        type: Array,
        default: () => [],
    },
};
//# sourceMappingURL=props.js.map