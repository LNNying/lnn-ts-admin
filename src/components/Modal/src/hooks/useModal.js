import { ref, onUnmounted, unref, getCurrentInstance, reactive, watchEffect, nextTick, toRaw, } from 'vue';
import { isProdMode } from '/@/utils/env';
import { isFunction } from '/@/utils/is';
import { isEqual } from 'lodash-es';
import { tryOnUnmounted } from '@vueuse/core';
import { error } from '/@/utils/log';
import { computed } from 'vue';
const dataTransferRef = reactive({});
const visibleData = reactive({});
/**
 * @description: Applicable to independent modal and call outside
 */
export function useModal() {
    const modalRef = ref(null);
    const loadedRef = ref(false);
    const uidRef = ref('');
    function register(modalMethod, uuid) {
        uidRef.value = uuid;
        isProdMode() &&
            onUnmounted(() => {
                modalRef.value = null;
                loadedRef.value = false;
                dataTransferRef[unref(uidRef)] = null;
            });
        if (unref(loadedRef) && isProdMode() && modalMethod === unref(modalRef))
            return;
        modalRef.value = modalMethod;
        modalMethod.emitVisible = (visible, uid) => {
            visibleData[uid] = visible;
        };
    }
    const getInstance = () => {
        const instance = unref(modalRef);
        if (!instance) {
            error('useModal instance is undefined!');
        }
        return instance;
    };
    const methods = {
        setModalProps: (props) => {
            getInstance()?.setModalProps(props);
        },
        getVisible: computed(() => {
            return visibleData[~~unref(uidRef)];
        }),
        redoModalHeight: () => {
            getInstance()?.redoModalHeight?.();
        },
        openModal: (visible = true, data, openOnSet = true) => {
            getInstance()?.setModalProps({
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
export const useModalInner = (callbackFn) => {
    const modalInstanceRef = ref(null);
    const currentInstance = getCurrentInstance();
    const uidRef = ref('');
    // currentInstall.type.emits = [...currentInstall.type.emits, 'register'];
    // Object.assign(currentInstall.type.emits, ['register']);
    const getInstance = () => {
        const instance = unref(modalInstanceRef);
        if (!instance) {
            error('useModalInner instance is undefined!');
        }
        return instance;
    };
    const register = (modalInstance, uuid) => {
        isProdMode() &&
            tryOnUnmounted(() => {
                modalInstanceRef.value = null;
            });
        uidRef.value = uuid;
        modalInstanceRef.value = modalInstance;
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
                getInstance()?.setModalProps({ loading });
            },
            getVisible: computed(() => {
                return visibleData[~~unref(uidRef)];
            }),
            changeOkLoading: (loading = true) => {
                getInstance()?.setModalProps({ confirmLoading: loading });
            },
            closeModal: () => {
                getInstance()?.setModalProps({ visible: false });
            },
            setModalProps: (props) => {
                getInstance()?.setModalProps(props);
            },
        },
    ];
};
//# sourceMappingURL=useModal.js.map