import { defHttp } from '/@/utils/http/axios';
var Api;
(function (Api) {
    Api["OPTIONS_LIST"] = "/select/getDemoOptions";
})(Api || (Api = {}));
/**
 * @description: Get sample options value
 */
export const optionsListApi = () => defHttp.get({ url: Api.OPTIONS_LIST });
//# sourceMappingURL=select.js.map