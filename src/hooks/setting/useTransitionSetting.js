import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';
export function useTransitionSetting() {
    const appStore = useAppStore();
    const getEnableTransition = computed(() => appStore.getTransitionSetting?.enable);
    const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress);
    const getOpenPageLoading = computed(() => {
        return !!appStore.getTransitionSetting?.openPageLoading;
    });
    const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition);
    function setTransitionSetting(transitionSetting) {
        appStore.setProjectConfig({ transitionSetting });
    }
    return {
        setTransitionSetting,
        getEnableTransition,
        getOpenNProgress,
        getOpenPageLoading,
        getBasicTransition,
    };
}
//# sourceMappingURL=useTransitionSetting.js.map