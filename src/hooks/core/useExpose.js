import { getCurrentInstance } from 'vue';
// expose public api
export function useExpose(apis) {
    const instance = getCurrentInstance();
    if (instance) {
        Object.assign(instance.proxy, apis);
    }
}
//# sourceMappingURL=useExpose.js.map