import { defHttp } from '/@/utils/http/axios';
var Api;
(function (Api) {
    Api["GetMenuListById"] = "/getMenuListById";
})(Api || (Api = {}));
/**
 * @description: Get user menu based on id
 */
export const getMenuListById = (params) => {
    return defHttp.get({ url: Api.GetMenuListById, params });
};
//# sourceMappingURL=menu.js.map