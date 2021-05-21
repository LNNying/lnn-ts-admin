// Helpers
export const props = {
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String],
    bench: {
        type: [Number, String],
        default: 0,
    },
    itemHeight: {
        type: [Number, String],
        required: true,
    },
    items: {
        type: Array,
        default: () => [],
    },
};
//# sourceMappingURL=props.js.map