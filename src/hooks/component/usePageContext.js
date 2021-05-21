import { createContext, useContext } from '/@/hooks/core/useContext';
const key = Symbol();
export function createPageContext(context) {
    return createContext(context, key, { native: true });
}
export function usePageContext() {
    return useContext(key);
}
//# sourceMappingURL=usePageContext.js.map