import { createContext, useContext } from '/@/hooks/core/useContext';
const key = Symbol();
export function createFormContext(context) {
    return createContext(context, key);
}
export function useFormContext() {
    return useContext(key);
}
//# sourceMappingURL=useFormContext.js.map