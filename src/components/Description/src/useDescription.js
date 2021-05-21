import { ref, getCurrentInstance, unref } from 'vue';
import { isProdMode } from '/@/utils/env';
export function useDescription(props) {
    if (!getCurrentInstance()) {
        throw new Error('Please put useDescription function in the setup function!');
    }
    const descRef = ref(null);
    const loadedRef = ref(false);
    function register(instance) {
        if (unref(loadedRef) && isProdMode())
            return;
        descRef.value = instance;
        props && instance.setDescProps(props);
        loadedRef.value = true;
    }
    const methods = {
        setDescProps: (descProps) => {
            unref(descRef)?.setDescProps(descProps);
        },
    };
    return [register, methods];
}
//# sourceMappingURL=useDescription.js.map