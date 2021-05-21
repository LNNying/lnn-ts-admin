import { createTypes } from 'vue-types';
const propTypes = createTypes({
    func: undefined,
    bool: undefined,
    string: undefined,
    number: undefined,
    object: undefined,
    integer: undefined,
});
propTypes.extend([
    {
        name: 'style',
        getter: true,
        type: [String, Object],
        default: undefined,
    },
    {
        name: 'VNodeChild',
        getter: true,
        type: undefined,
    },
    // {
    //   name: 'trueBool',
    //   getter: true,
    //   type: Boolean,
    //   default: true,
    // },
]);
export { propTypes };
//# sourceMappingURL=propTypes.js.map