import { useI18n } from '/@/hooks/web/useI18n';
import { propTypes } from '/@/utils/propTypes';
const { t } = useI18n();
export const footerProps = {
    confirmLoading: propTypes.bool,
    /**
     * @description: Show close button
     */
    showCancelBtn: propTypes.bool.def(true),
    cancelButtonProps: Object,
    cancelText: propTypes.string.def(t('common.cancelText')),
    /**
     * @description: Show confirmation button
     */
    showOkBtn: propTypes.bool.def(true),
    okButtonProps: Object,
    okText: propTypes.string.def(t('common.okText')),
    okType: propTypes.string.def('primary'),
    showFooter: propTypes.bool,
    footerHeight: {
        type: [String, Number],
        default: 60,
    },
};
export const basicProps = {
    isDetail: propTypes.bool,
    title: propTypes.string.def(''),
    loadingText: propTypes.string,
    showDetailBack: propTypes.bool.def(true),
    visible: propTypes.bool,
    loading: propTypes.bool,
    maskClosable: propTypes.bool.def(true),
    getContainer: {
        type: [Object, String],
    },
    scrollOptions: {
        type: Object,
        default: null,
    },
    closeFunc: {
        type: [Function, Object],
        default: null,
    },
    triggerWindowResize: propTypes.bool,
    destroyOnClose: propTypes.bool,
    ...footerProps,
};
//# sourceMappingURL=props.js.map