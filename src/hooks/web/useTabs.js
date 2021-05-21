import { useRouter } from 'vue-router';
import { unref } from 'vue';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { useAppStore } from '/@/store/modules/app';
var TableActionEnum;
(function (TableActionEnum) {
    TableActionEnum[TableActionEnum["REFRESH"] = 0] = "REFRESH";
    TableActionEnum[TableActionEnum["CLOSE_ALL"] = 1] = "CLOSE_ALL";
    TableActionEnum[TableActionEnum["CLOSE_LEFT"] = 2] = "CLOSE_LEFT";
    TableActionEnum[TableActionEnum["CLOSE_RIGHT"] = 3] = "CLOSE_RIGHT";
    TableActionEnum[TableActionEnum["CLOSE_OTHER"] = 4] = "CLOSE_OTHER";
    TableActionEnum[TableActionEnum["CLOSE_CURRENT"] = 5] = "CLOSE_CURRENT";
    TableActionEnum[TableActionEnum["CLOSE"] = 6] = "CLOSE";
})(TableActionEnum || (TableActionEnum = {}));
export function useTabs(_router) {
    const appStore = useAppStore();
    function canIUseTabs() {
        const { show } = appStore.getMultiTabsSetting;
        if (!show) {
            throw new Error('The multi-tab page is currently not open, please open it in the settings！');
        }
        return !!show;
    }
    const tabStore = useMultipleTabStore();
    const router = _router || useRouter();
    const { currentRoute } = router;
    function getCurrentTab() {
        const route = unref(currentRoute);
        return tabStore.getTabList.find((item) => item.path === route.path);
    }
    async function handleTabAction(action, tab) {
        const canIUse = canIUseTabs;
        if (!canIUse) {
            return;
        }
        const currentTab = getCurrentTab();
        switch (action) {
            case TableActionEnum.REFRESH:
                await tabStore.refreshPage(router);
                break;
            case TableActionEnum.CLOSE_ALL:
                await tabStore.closeAllTab(router);
                break;
            case TableActionEnum.CLOSE_LEFT:
                await tabStore.closeLeftTabs(currentTab, router);
                break;
            case TableActionEnum.CLOSE_RIGHT:
                await tabStore.closeRightTabs(currentTab, router);
                break;
            case TableActionEnum.CLOSE_OTHER:
                await tabStore.closeOtherTabs(currentTab, router);
                break;
            case TableActionEnum.CLOSE_CURRENT:
            case TableActionEnum.CLOSE:
                await tabStore.closeTab(tab || currentTab, router);
                break;
        }
    }
    return {
        refreshPage: () => handleTabAction(TableActionEnum.REFRESH),
        closeAll: () => handleTabAction(TableActionEnum.CLOSE_ALL),
        closeLeft: () => handleTabAction(TableActionEnum.CLOSE_LEFT),
        closeRight: () => handleTabAction(TableActionEnum.CLOSE_RIGHT),
        closeOther: () => handleTabAction(TableActionEnum.CLOSE_OTHER),
        closeCurrent: () => handleTabAction(TableActionEnum.CLOSE_CURRENT),
        close: (tab) => {
            handleTabAction(TableActionEnum.CLOSE, tab);
        },
    };
}
//# sourceMappingURL=useTabs.js.map