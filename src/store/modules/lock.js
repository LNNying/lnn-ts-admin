import { defineStore } from 'pinia';
import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { useUserStore } from './user';
export const useLockStore = defineStore({
    id: 'app-lock',
    state: () => ({
        lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
    }),
    getters: {
        getLockInfo() {
            return this.lockInfo;
        },
    },
    actions: {
        setLockInfo(info) {
            this.lockInfo = Object.assign({}, this.lockInfo, info);
            Persistent.setLocal(LOCK_INFO_KEY, this.lockInfo);
        },
        resetLockInfo() {
            Persistent.removeLocal(LOCK_INFO_KEY);
            this.lockInfo = null;
        },
        // Unlock
        async unLock(password) {
            const userStore = useUserStore();
            if (this.lockInfo?.pwd === password) {
                this.resetLockInfo();
                return true;
            }
            const tryLogin = async () => {
                try {
                    const username = userStore.getUserInfo?.username;
                    const res = await userStore.login({
                        username,
                        password: password,
                        goHome: false,
                        mode: 'none',
                    });
                    if (res) {
                        this.resetLockInfo();
                    }
                    return res;
                }
                catch (error) {
                    return false;
                }
            };
            return await tryLogin();
        },
    },
});
//# sourceMappingURL=lock.js.map