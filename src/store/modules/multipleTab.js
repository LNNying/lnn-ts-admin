import { toRaw, unref } from 'vue';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useGo, useRedo } from '/@/hooks/web/usePage';
import { Persistent } from '/@/utils/cache/persistent';
import { PageEnum } from '/@/enums/pageEnum';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';
import { getRawRoute } from '/@/utils';
import { MULTIPLE_TABS_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';
function handleGotoPage(router) {
    const go = useGo(router);
    go(unref(router.currentRoute).path, true);
}
const cacheTab = projectSetting.multiTabsSetting.cache;
export const useMultipleTabStore = defineStore({
    id: 'app-multiple-tab',
    state: () => ({
        // Tabs that need to be cached
        cacheTabList: new Set(),
        // multiple tab list
        tabList: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
        // Index of the last moved tab
        lastDragEndIndex: 0,
    }),
    getters: {
        getTabList() {
            return this.tabList;
        },
        getCachedTabList() {
            return Array.from(this.cacheTabList);
        },
        getLastDragEndIndex() {
            return this.lastDragEndIndex;
        },
    },
    actions: {
        /**
         * Update the cache according to the currently opened tabs
         */
        async updateCacheTab() {
            const cacheMap = new Set();
            for (const tab of this.tabList) {
                const item = getRawRoute(tab);
                // Ignore the cache
                const needCache = !item.meta?.ignoreKeepAlive;
                if (!needCache) {
                    return;
                }
                const name = item.name;
                cacheMap.add(name);
            }
            this.cacheTabList = cacheMap;
        },
        /**
         * Refresh tabs
         */
        async refreshPage(router) {
            const { currentRoute } = router;
            const route = unref(currentRoute);
            const name = route.name;
            const findTab = this.getCachedTabList.find((item) => item === name);
            if (findTab) {
                this.cacheTabList.delete(findTab);
            }
            const redo = useRedo(router);
            await redo();
        },
        clearCacheTabs() {
            this.cacheTabList = new Set();
        },
        resetState() {
            this.tabList = [];
            this.clearCacheTabs();
        },
        goToPage(router) {
            const go = useGo(router);
            const len = this.tabList.length;
            const { path } = unref(router.currentRoute);
            let toPath = PageEnum.BASE_HOME;
            if (len > 0) {
                const page = this.tabList[len - 1];
                const p = page.fullPath || page.path;
                if (p) {
                    toPath = p;
                }
            }
            // Jump to the current page and report an error
            path !== toPath && go(toPath, true);
        },
        async addTab(route) {
            const { path, name, fullPath, params, query } = getRawRoute(route);
            // 404  The page does not need to add a tab
            if (path === PageEnum.ERROR_PAGE ||
                !name ||
                [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name)) {
                return;
            }
            let updateIndex = -1;
            // Existing pages, do not add tabs repeatedly
            const tabHasExits = this.tabList.some((tab, index) => {
                updateIndex = index;
                return (tab.fullPath || tab.path) === (fullPath || path);
            });
            // If the tab already exists, perform the update operation
            if (tabHasExits) {
                const curTab = toRaw(this.tabList)[updateIndex];
                if (!curTab) {
                    return;
                }
                curTab.params = params || curTab.params;
                curTab.query = query || curTab.query;
                curTab.fullPath = fullPath || curTab.fullPath;
                this.tabList.splice(updateIndex, 1, curTab);
            }
            else {
                // Add tab
                this.tabList.push(route);
            }
            this.updateCacheTab();
            cacheTab && Persistent.setLocal(MULTIPLE_TABS_KEY, this.tabList);
        },
        async closeTab(tab, router) {
            const getToTarget = (tabItem) => {
                const { params, path, query } = tabItem;
                return {
                    params: params || {},
                    path,
                    query: query || {},
                };
            };
            const close = (route) => {
                const { fullPath, meta: { affix } = {} } = route;
                if (affix) {
                    return;
                }
                const index = this.tabList.findIndex((item) => item.fullPath === fullPath);
                index !== -1 && this.tabList.splice(index, 1);
            };
            const { currentRoute, replace } = router;
            const { path } = unref(currentRoute);
            if (path !== tab.path) {
                // Closed is not the activation tab
                close(tab);
                return;
            }
            // Closed is activated atb
            let toTarget = {};
            const index = this.tabList.findIndex((item) => item.path === path);
            // If the current is the leftmost tab
            if (index === 0) {
                // There is only one tab, then jump to the homepage, otherwise jump to the right tab
                if (this.tabList.length === 1) {
                    toTarget = PageEnum.BASE_HOME;
                }
                else {
                    //  Jump to the right tab
                    const page = this.tabList[index + 1];
                    toTarget = getToTarget(page);
                }
            }
            else {
                // Close the current tab
                const page = this.tabList[index - 1];
                toTarget = getToTarget(page);
            }
            close(currentRoute.value);
            replace(toTarget);
        },
        // Close according to key
        async closeTabByKey(key, router) {
            const index = this.tabList.findIndex((item) => (item.fullPath || item.path) === key);
            index !== -1 && this.closeTab(this.tabList[index], router);
        },
        // Sort the tabs
        async sortTabs(oldIndex, newIndex) {
            const currentTab = this.tabList[oldIndex];
            this.tabList.splice(oldIndex, 1);
            this.tabList.splice(newIndex, 0, currentTab);
            this.lastDragEndIndex = this.lastDragEndIndex + 1;
        },
        // Close the tab on the right and jump
        async closeLeftTabs(route, router) {
            const index = this.tabList.findIndex((item) => item.path === route.path);
            if (index > 0) {
                const leftTabs = this.tabList.slice(0, index);
                const pathList = [];
                for (const item of leftTabs) {
                    const affix = item?.meta?.affix ?? false;
                    if (!affix) {
                        pathList.push(item.fullPath);
                    }
                }
                this.bulkCloseTabs(pathList);
            }
            this.updateCacheTab();
            handleGotoPage(router);
        },
        // Close the tab on the left and jump
        async closeRightTabs(route, router) {
            const index = this.tabList.findIndex((item) => item.fullPath === route.fullPath);
            if (index >= 0 && index < this.tabList.length - 1) {
                const rightTabs = this.tabList.slice(index + 1, this.tabList.length);
                const pathList = [];
                for (const item of rightTabs) {
                    const affix = item?.meta?.affix ?? false;
                    if (!affix) {
                        pathList.push(item.fullPath);
                    }
                }
                this.bulkCloseTabs(pathList);
            }
            this.updateCacheTab();
            handleGotoPage(router);
        },
        async closeAllTab(router) {
            this.tabList = this.tabList.filter((item) => item?.meta?.affix ?? false);
            this.clearCacheTabs();
            this.goToPage(router);
        },
        /**
         * Close other tabs
         */
        async closeOtherTabs(route, router) {
            const closePathList = this.tabList.map((item) => item.fullPath);
            const pathList = [];
            for (const path of closePathList) {
                if (path !== route.fullPath) {
                    const closeItem = this.tabList.find((item) => item.path === path);
                    if (!closeItem) {
                        continue;
                    }
                    const affix = closeItem?.meta?.affix ?? false;
                    if (!affix) {
                        pathList.push(closeItem.fullPath);
                    }
                }
            }
            this.bulkCloseTabs(pathList);
            this.updateCacheTab();
            handleGotoPage(router);
        },
        /**
         * Close tabs in bulk
         */
        async bulkCloseTabs(pathList) {
            this.tabList = this.tabList.filter((item) => !pathList.includes(item.fullPath));
        },
    },
});
// Need to be used outside the setup
export function useMultipleTabWithOutStore() {
    return useMultipleTabStore(store);
}
//# sourceMappingURL=multipleTab.js.map