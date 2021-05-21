import { defineStore } from 'pinia';
import { store } from '/@/store';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { getUserInfoById, loginApi } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import router from '/@/router';
export const useUserStore = defineStore({
    id: 'app-user',
    state: () => ({
        // user info
        userInfo: null,
        // token
        token: undefined,
        // roleList
        roleList: [],
    }),
    getters: {
        getUserInfo() {
            return this.userInfo || getAuthCache(USER_INFO_KEY) || {};
        },
        getToken() {
            return this.token || getAuthCache(TOKEN_KEY);
        },
        getRoleList() {
            return this.roleList.length > 0 ? this.roleList : getAuthCache(ROLES_KEY);
        },
    },
    actions: {
        setToken(info) {
            this.token = info;
            setAuthCache(TOKEN_KEY, info);
        },
        setRoleList(roleList) {
            this.roleList = roleList;
            setAuthCache(ROLES_KEY, roleList);
        },
        setUserInfo(info) {
            this.userInfo = info;
            setAuthCache(USER_INFO_KEY, info);
        },
        resetState() {
            this.userInfo = null;
            this.token = '';
            this.roleList = [];
        },
        /**
         * @description: login
         */
        async login(params) {
            try {
                const { goHome = true, mode, ...loginParams } = params;
                const data = await loginApi(loginParams, mode);
                const { token, userId } = data;
                // save token
                this.setToken(token);
                // get user info
                const userInfo = await this.getUserInfoAction({ userId });
                goHome && (await router.replace(PageEnum.BASE_HOME));
                return userInfo;
            }
            catch (error) {
                return null;
            }
        },
        async getUserInfoAction({ userId }) {
            const userInfo = await getUserInfoById({ userId });
            const { roles } = userInfo;
            const roleList = roles.map((item) => item.value);
            this.setUserInfo(userInfo);
            this.setRoleList(roleList);
            return userInfo;
        },
        /**
         * @description: logout
         */
        logout(goLogin = false) {
            goLogin && router.push(PageEnum.BASE_LOGIN);
        },
        /**
         * @description: Confirm before logging out
         */
        confirmLoginOut() {
            const { createConfirm } = useMessage();
            const { t } = useI18n();
            createConfirm({
                iconType: 'warning',
                title: t('sys.app.logoutTip'),
                content: t('sys.app.logoutMessage'),
                onOk: async () => {
                    await this.logout(true);
                },
            });
        },
    },
});
// Need to be used outside the setup
export function useUserStoreWidthOut() {
    return useUserStore(store);
}
//# sourceMappingURL=user.js.map