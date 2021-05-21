import { setRouteChange } from '/@/logics/mitt/routeChange';
export function createPageGuard(router) {
    const loadedPageMap = new Map();
    router.beforeEach(async (to) => {
        to.meta.loaded = !!loadedPageMap.get(to.path);
        // Notify routing changes
        setRouteChange(to);
        return true;
    });
    router.afterEach((to) => {
        loadedPageMap.set(to.path, true);
    });
}
//# sourceMappingURL=pageGuard.js.map