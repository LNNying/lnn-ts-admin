import { defHttp } from '/@/utils/http/axios';
var Api;
(function (Api) {
    // The address does not exist
    Api["Error"] = "/error";
})(Api || (Api = {}));
/**
 * @description: Trigger ajax error
 */
export const fireErrorApi = () => defHttp.get({ url: Api.Error });
//# sourceMappingURL=error.js.map