import { defineComponent, Transition, TransitionGroup } from 'vue';
import { getSlot } from '/@/utils/helper/tsxHelper';
export function createSimpleTransition(name, origin = 'top center 0', mode) {
    return defineComponent({
        name,
        props: {
            group: {
                type: Boolean,
                default: false,
            },
            mode: {
                type: String,
                default: mode,
            },
            origin: {
                type: String,
                default: origin,
            },
        },
        setup(props, { slots, attrs }) {
            const onBeforeEnter = (el) => {
                el.style.transformOrigin = props.origin;
            };
            return () => {
                const Tag = !props.group ? Transition : TransitionGroup;
                return (<Tag name={name} mode={props.mode} {...attrs} onBeforeEnter={onBeforeEnter}>
            {() => getSlot(slots)}
          </Tag>);
            };
        },
    });
}
export function createJavascriptTransition(name, functions, mode = 'in-out') {
    return defineComponent({
        name,
        props: {
            mode: {
                type: String,
                default: mode,
            },
        },
        setup(props, { attrs, slots }) {
            return () => {
                return (<Transition name={name} mode={props.mode} {...attrs} onBeforeEnter={functions.beforeEnter} onEnter={functions.enter} onLeave={functions.leave} onAfterLeave={functions.afterLeave} onLeaveCancelled={functions.afterLeave}>
            {() => getSlot(slots)}
          </Transition>);
            };
        },
    });
}
//# sourceMappingURL=CreateTransition.jsx.map