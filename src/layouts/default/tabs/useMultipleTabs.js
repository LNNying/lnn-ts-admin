import { toRaw, ref, nextTick } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { useSortable } from '/@/hooks/web/useSortable';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { isNullAndUnDef } from '/@/utils/is';
import projectSetting from '/@/settings/projectSetting';
import { useRouter } from 'vue-router';
export function initAffixTabs() {
    const affixList = ref([]);
    const tabStore = useMultipleTabStore();
    const router = useRouter();
    /**
     * @description: Filter all fixed routes
     */
    function filterAffixTabs(routes) {
        const tabs = [];
        routes &&
            routes.forEach((route) => {
                if (route.meta && route.meta.affix) {
                    tabs.push(toRaw(route));
                }
            });
        return tabs;
    }
    /**
     * @description: Set fixed tabs
     */
    function addAffixTabs() {
        const affixTabs = filterAffixTabs(router.getRoutes());
        affixList.value = affixTabs;
        for (const tab of affixTabs) {
            tabStore.addTab({
                meta: tab.meta,
                name: tab.name,
                path: tab.path,
            });
        }
    }
    let isAddAffix = false;
    if (!isAddAffix) {
        addAffixTabs();
        isAddAffix = true;
    }
    return affixList.value.map((item) => item.meta?.title).filter(Boolean);
}
export function useTabsDrag(affixTextList) {
    const tabStore = useMultipleTabStore();
    const { multiTabsSetting } = projectSetting;
    const { prefixCls } = useDesign('multiple-tabs');
    nextTick(() => {
        if (!multiTabsSetting.canDrag)
            return;
        const el = document.querySelectorAll(`.${prefixCls} .ant-tabs-nav > div`)?.[0];
        const { initSortable } = useSortable(el, {
            filter: (e) => {
                const text = e?.target?.innerText;
                if (!text)
                    return false;
                return affixTextList.includes(text);
            },
            onEnd: (evt) => {
                const { oldIndex, newIndex } = evt;
                if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
                    return;
                }
                tabStore.sortTabs(oldIndex, newIndex);
            },
        });
        initSortable();
    });
}
//# sourceMappingURL=useMultipleTabs.js.map