export const basicProps = {
    helpText: {
        type: String,
        default: '',
    },
    // 文件最大多少MB
    maxSize: {
        type: Number,
        default: 2,
    },
    // 最大数量的文件，Infinity不限制
    maxNumber: {
        type: Number,
        default: Infinity,
    },
    // 根据后缀，或者其他
    accept: {
        type: Array,
        default: () => [],
    },
    multiple: {
        type: Boolean,
        default: true,
    },
    uploadParams: {
        type: Object,
        default: {},
    },
    api: {
        type: Function,
        default: null,
        required: true,
    },
};
export const uploadContainerProps = {
    value: {
        type: Array,
        default: () => [],
    },
    ...basicProps,
    showPreviewNumber: {
        type: Boolean,
        default: true,
    },
    emptyHidePreview: {
        type: Boolean,
        default: false,
    },
};
export const previewProps = {
    value: {
        type: Array,
        default: () => [],
    },
};
export const fileListProps = {
    columns: {
        type: [Array],
        default: null,
    },
    actionColumn: {
        type: Object,
        default: null,
    },
    dataSource: {
        type: Array,
        default: null,
    },
};
//# sourceMappingURL=props.js.map