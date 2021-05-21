import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting';
const { uploadUrl = '' } = useGlobSetting();
/**
 * @description: Upload interface
 */
export function uploadApi(params, onUploadProgress) {
    return defHttp.uploadFile({
        url: uploadUrl,
        onUploadProgress,
    }, params);
}
//# sourceMappingURL=upload.js.map