import { propTypes } from '/@/utils/propTypes';
export const contextMenuProps = {
    width: propTypes.number.def(156),
    customEvent: {
        type: Object,
        default: null,
    },
    styles: propTypes.style,
    showIcon: propTypes.bool.def(true),
    axis: {
        // The position of the right mouse button click
        type: Object,
        default() {
            return { x: 0, y: 0 };
        },
    },
    items: {
        // The most important list, if not, will not be displayed
        type: Array,
        default() {
            return [];
        },
    },
};
//# sourceMappingURL=props.js.map