import { defHttp } from '/@/utils/http/axios';
var Api;
(function (Api) {
    Api["ACCOUNT_INFO"] = "/account/getAccountInfo";
})(Api || (Api = {}));
// Get personal center-basic settings
export const accountInfoApi = () => defHttp.get({ url: Api.ACCOUNT_INFO });
//# sourceMappingURL=account.js.map