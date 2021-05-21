import { propTypes } from '/@/utils/propTypes';
export default {
    useCollapse: propTypes.bool.def(true),
    title: propTypes.string.def(''),
    size: propTypes.oneOf(['small', 'default', 'middle', undefined]).def('small'),
    bordered: propTypes.bool.def(true),
    column: {
        type: [Number, Object],
        default: () => {
            return { xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 };
        },
    },
    collapseOptions: {
        type: Object,
        default: null,
    },
    schema: {
        type: Array,
        default: () => [],
    },
    data: propTypes.object,
};
//# sourceMappingURL=props.js.map