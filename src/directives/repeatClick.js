/**
 * Prevent repeated clicks
 * @Example v-repeat-click="()=>{}"
 */
import { on, once } from '/@/utils/domUtils';
const repeatDirective = {
    beforeMount(el, binding) {
        let interval = null;
        let startTime = 0;
        const handler = () => binding?.value();
        const clear = () => {
            if (Date.now() - startTime < 100) {
                handler();
            }
            interval && clearInterval(interval);
            interval = null;
        };
        on(el, 'mousedown', (e) => {
            if (e.button !== 0)
                return;
            startTime = Date.now();
            once(document, 'mouseup', clear);
            interval && clearInterval(interval);
            interval = setInterval(handler, 100);
        });
    },
};
export default repeatDirective;
//# sourceMappingURL=repeatClick.js.map