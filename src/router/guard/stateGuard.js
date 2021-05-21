import { useAppStore } from '/@/store/modules/app';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { useUserStore } from '/@/store/modules/user';
import { usePermissionStore } from '/@/store/modules/permission';
import { PageEnum } from '/@/enums/pageEnum';
import { removeTabChangeListener } from '/@/logics/mitt/routeChange';
export function createStateGuard(router) {
    router.afterEach((to) => {
        const tabStore = useMultipleTabStore();
        const userStore = useUserStore();
        const appStore = useAppStore();
        const permissionStore = usePermissionStore();
        // Just enter the login page and clear the authentication information
        if (to.path === PageEnum.BASE_LOGIN) {
            appStore.resetAllState();
            permissionStore.resetState();
            tabStore.resetState();
            userStore.resetState();
            removeTabChangeListener();
        }
    });
}
//# sourceMappingURL=stateGuard.js.map