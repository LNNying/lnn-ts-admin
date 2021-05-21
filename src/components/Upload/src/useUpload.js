import { unref, computed } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
export function useUploadType({ acceptRef, 
//   uploadTypeRef,
helpTextRef, maxNumberRef, maxSizeRef, }) {
    // 文件类型限制
    const getAccept = computed(() => {
        // const uploadType = unref(uploadTypeRef);
        const accept = unref(acceptRef);
        if (accept && accept.length > 0) {
            return accept;
        }
        return [];
    });
    const getStringAccept = computed(() => {
        return unref(getAccept)
            .map((item) => `.${item}`)
            .join(',');
    });
    // 支持jpg、jpeg、png格式，不超过2M，最多可选择10张图片，。
    const getHelpText = computed(() => {
        const helpText = unref(helpTextRef);
        if (helpText) {
            return helpText;
        }
        const helpTexts = [];
        const accept = unref(acceptRef);
        if (accept.length > 0) {
            helpTexts.push(t('component.upload.accept', [accept.join(',')]));
        }
        const maxSize = unref(maxSizeRef);
        if (maxSize) {
            helpTexts.push(t('component.upload.maxSize', [maxSize]));
        }
        const maxNumber = unref(maxNumberRef);
        if (maxNumber && maxNumber !== Infinity) {
            helpTexts.push(t('component.upload.maxNumber', [maxNumber]));
        }
        return helpTexts.join('，');
    });
    return { getAccept, getStringAccept, getHelpText };
}
//# sourceMappingURL=useUpload.js.map