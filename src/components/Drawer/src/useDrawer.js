import { ref, getCurrentInstance, unref, reactive, watchEffect, nextTick, toRaw, computed, } from 'vue';
import { isProdMode } from '/@/utils/env';
import { isFunction } from '/@/utils/is';
import { tryOnUnmounted } from '@vueuse/core';
import { isEqual } from 'lodash-es';
import { error } from '/@/utils/log';
const dataTransferRef = reactive({});
const visibleData = reactive({});
/**
 * @description: Applicable to separate drawer and call outside
 */
export function useDrawer() {
    const drawerRef = ref(null);
    const loadedRef = ref(false);
    const uidRef = ref('');
    function register(drawerInstance, uuid) {
        isProdMode() &&
            tryOnUnmounted(() => {
                drawerRef.value = null;
                loadedRef.value = null;
                dataTransferRef[unref(uidRef)] = null;
            });
        if (unref(loadedRef) && isProdMode() && drawerInstance === unref(drawerRef)) {
            return;
        }
        uidRef.value = uuid;
        drawerRef.value = drawerInstance;
        loadedRef.value = true;
        drawerInstance.emitVisible = (visible, uid) => {
            visibleData[uid] = visible;
        };
    }
    const getInstance = () => {
        const instance = unref(drawerRef);
        if (!instance) {
            error('useDrawer instance is undefined!');
        }
        return instance;
    };
    const methods = {
        setDrawerProps: (props) => {
            getInstance()?.setDrawerProps(props);
        },
        getVisible: computed(() => {
            return visibleData[~~unref(uidRef)];
        }),
        openDrawer: (visible = true, data, openOnSet = true) => {
            getInstance()?.setDrawerProps({
                visible: visible,
            });
            if (!data)
                return;
            if (openOnSet) {
                dataTransferRef[unref(uidRef)] = null;
                dataTransferRef[unref(uidRef)] = toRaw(data);
                return;
            }
            const equal = isEqual(toRaw(dataTransferRef[unref(uidRef)]), toRaw(data));
            if (!equal) {
                dataTransferRef[unref(uidRef)] = toRaw(data);
            }
        },
    };
    return [register, methods];
}
export const useDrawerInner = (callbackFn) => {
    const drawerInstanceRef = ref(null);
    const currentInstance = getCurrentInstance();
    const uidRef = ref('');
    if (!currentInstance) {
        error('useDrawerInner instance is undefined!');
    }
    const getInstance = () => {
        const instance = unref(drawerInstanceRef);
        if (!instance) {
            error('useDrawerInner instance is undefined!');
            return;
        }
        return instance;
    };
    const register = (modalInstance, uuid) => {
        isProdMode() &&
            tryOnUnmounted(() => {
                drawerInstanceRef.value = null;
            });
        uidRef.value = uuid;
        drawerInstanceRef.value = modalInstance;
        currentInstance?.emit('register', modalInstance, uuid);
    };
    watchEffect(() => {
        const data = dataTransferRef[unref(uidRef)];
        if (!data)
            return;
        if (!callbackFn || !isFunction(callbackFn))
            return;
        nextTick(() => {
            callbackFn(data);
        });
    });
    return [
        register,
        {
            changeLoading: (loading = true) => {
                getInstance()?.setDrawerProps({ loading });
            },
            changeOkLoading: (loading = true) => {
                getInstance()?.setDrawerProps({ confirmLoading: loading });
            },
            getVisible: computed(() => {
                return visibleData[~~unref(uidRef)];
            }),
            closeDrawer: () => {
                getInstance()?.setDrawerProps({ visible: false });
            },
            setDrawerProps: (props) => {
                getInstance()?.setDrawerProps(props);
            },
        },
    ];
};
//# sourceMappingURL=useDrawer.js.map