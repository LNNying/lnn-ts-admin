/**
 * Used to monitor routing changes to change the status of menus and tabs. There is no need to monitor the route, because the route status change is affected by the page rendering time, which will be slow
 */
import Mitt from '/@/utils/mitt';
import { getRawRoute } from '/@/utils';
const mitt = new Mitt();
const key = Symbol();
let lastChangeTab;
export function setRouteChange(lastChangeRoute) {
    const r = getRawRoute(lastChangeRoute);
    mitt.emit(key, r);
    lastChangeTab = r;
}
export function listenerRouteChange(callback, immediate = true) {
    mitt.on(key, callback);
    immediate && lastChangeTab && callback(lastChangeTab);
}
export function removeTabChangeListener() {
    mitt.clear();
}
//# sourceMappingURL=routeChange.js.map