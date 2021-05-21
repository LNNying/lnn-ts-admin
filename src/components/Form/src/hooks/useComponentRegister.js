import { tryOnUnmounted } from '@vueuse/core';
import { add, del } from '../componentMap';
export function useComponentRegister(compName, comp) {
    add(compName, comp);
    tryOnUnmounted(() => {
        del(compName);
    });
}
//# sourceMappingURL=useComponentRegister.js.map