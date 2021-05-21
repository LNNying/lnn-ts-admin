import { provide, inject } from 'vue';
const key = Symbol('flow-chart');
export function createFlowChartContext(instance) {
    provide(key, instance);
}
export function useFlowChartContext() {
    return inject(key);
}
//# sourceMappingURL=useFlowContext.js.map