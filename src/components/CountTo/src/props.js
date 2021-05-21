import { propTypes } from '/@/utils/propTypes';
export const countToProps = {
    startVal: propTypes.number.def(0),
    endVal: propTypes.number.def(2020),
    duration: propTypes.number.def(1300),
    autoplay: propTypes.bool.def(true),
    decimals: {
        type: Number,
        required: false,
        default: 0,
        validator(value) {
            return value >= 0;
        },
    },
    color: {
        type: String,
        require: false,
    },
    decimal: propTypes.string.def('.'),
    separator: propTypes.string.def(','),
    prefix: propTypes.string.def(''),
    suffix: propTypes.string.def(''),
    useEasing: propTypes.bool.def(true),
    easingFn: {
        type: Function,
        default(t, b, c, d) {
            return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
        },
    },
};
//# sourceMappingURL=props.js.map