import { defHttp } from '/@/utils/http/axios';
var Api;
(function (Api) {
    Api["Login"] = "/login";
    Api["GetUserInfoById"] = "/getUserInfoById";
    Api["GetPermCodeByUserId"] = "/getPermCodeByUserId";
})(Api || (Api = {}));
/**
 * @description: user login api
 */
export function loginApi(params, mode = 'modal') {
    return defHttp.post({
        url: Api.Login,
        params,
    }, {
        errorMessageMode: mode,
    });
}
/**
 * @description: getUserInfoById
 */
export function getUserInfoById(params) {
    return defHttp.get({
        url: Api.GetUserInfoById,
        params,
    });
}
export function getPermCodeByUserId(params) {
    return defHttp.get({
        url: Api.GetPermCodeByUserId,
        params,
    });
}
//# sourceMappingURL=user.js.map