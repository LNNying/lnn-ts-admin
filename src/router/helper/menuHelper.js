import { findPath, treeMap } from '/@/utils/helper/treeHelper';
import { cloneDeep } from 'lodash-es';
import { isUrl } from '/@/utils/is';
export function getAllParentPath(treeData, path) {
    const menuList = findPath(treeData, (n) => n.path === path);
    return (menuList || []).map((item) => item.path);
}
function joinParentPath(menus, parentPath = '') {
    for (let index = 0; index < menus.length; index++) {
        const menu = menus[index];
        // https://next.router.vuejs.org/guide/essentials/nested-routes.html
        // Note that nested paths that start with / will be treated as a root path.
        // This allows you to leverage the component nesting without having to use a nested URL.
        if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
            // path doesn't start with /, nor is it a url, join parent path
            menu.path = `${parentPath}/${menu.path}`;
        }
        if (menu?.children?.length) {
            joinParentPath(menu.children, menu.path);
        }
    }
}
// Parsing the menu module
export function transformMenuModule(menuModule) {
    const { menu } = menuModule;
    const menuList = [menu];
    joinParentPath(menuList);
    return menuList[0];
}
export function transformRouteToMenu(routeModList) {
    const cloneRouteModList = cloneDeep(routeModList);
    const routeList = [];
    cloneRouteModList.forEach((item) => {
        if (item.meta?.single) {
            const realItem = item?.children?.[0];
            realItem && routeList.push(realItem);
        }
        else {
            routeList.push(item);
        }
    });
    const list = treeMap(routeList, {
        conversion: (node) => {
            const { meta: { title, hideMenu = false } = {} } = node;
            return {
                ...(node.meta || {}),
                meta: node.meta,
                name: title,
                hideMenu,
                path: node.path,
            };
        },
    });
    joinParentPath(list);
    return cloneDeep(list);
}
//# sourceMappingURL=menuHelper.js.map