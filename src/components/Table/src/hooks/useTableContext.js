import { provide, inject } from 'vue';
const key = Symbol('basic-table');
export function createTableContext(instance) {
    provide(key, instance);
}
export function useTableContext() {
    return inject(key);
}
//# sourceMappingURL=useTableContext.js.map