import { createContext, useContext } from '/@/hooks/core/useContext';
const key = Symbol();
export function createSimpleRootMenuContext(context) {
    return createContext(context, key, { readonly: false, native: true });
}
export function useSimpleRootMenuContext() {
    return useContext(key);
}
//# sourceMappingURL=useSimpleMenuContext.js.map