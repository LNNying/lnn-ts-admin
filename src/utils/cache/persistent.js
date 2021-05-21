import { createLocalStorage, createSessionStorage } from '/@/utils/cache';
import { Memory } from './memory';
import { TOKEN_KEY, USER_INFO_KEY, ROLES_KEY, LOCK_INFO_KEY, PROJ_CFG_KEY, APP_LOCAL_CACHE_KEY, APP_SESSION_CACHE_KEY, MULTIPLE_TABS_KEY, } from '/@/enums/cacheEnum';
import { DEFAULT_CACHE_TIME } from '/@/settings/encryptionSetting';
import { toRaw } from 'vue';
const ls = createLocalStorage();
const ss = createSessionStorage();
const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);
function initPersistentMemory() {
    const localCache = ls.get(APP_LOCAL_CACHE_KEY);
    const sessionCache = ss.get(APP_SESSION_CACHE_KEY);
    localCache && localMemory.resetCache(localCache);
    sessionCache && sessionMemory.resetCache(sessionCache);
}
export class Persistent {
    static getLocal(key) {
        return localMemory.get(key)?.value;
    }
    static setLocal(key, value, immediate = false) {
        localMemory.set(key, toRaw(value));
        immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
    }
    static removeLocal(key) {
        localMemory.remove(key);
    }
    static clearLocal() {
        localMemory.clear();
    }
    static getSession(key) {
        return sessionMemory.get(key)?.value;
    }
    static setSession(key, value, immediate = false) {
        sessionMemory.set(key, toRaw(value));
        immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
    }
    static removeSession(key) {
        sessionMemory.remove(key);
    }
    static clearSession() {
        sessionMemory.clear();
    }
    static clearAll() {
        sessionMemory.clear();
        localMemory.clear();
    }
}
window.addEventListener('beforeunload', function () {
    ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
    ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
});
function storageChange(e) {
    const { key, newValue, oldValue } = e;
    if (!key) {
        Persistent.clearAll();
        return;
    }
    if (!!newValue && !!oldValue) {
        if (APP_LOCAL_CACHE_KEY === key) {
            Persistent.clearLocal();
        }
        if (APP_SESSION_CACHE_KEY === key) {
            Persistent.clearSession();
        }
    }
}
window.addEventListener('storage', storageChange);
initPersistentMemory();
//# sourceMappingURL=persistent.js.map