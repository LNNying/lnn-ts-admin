import { useI18n } from '/@/hooks/web/useI18n';
import { propTypes } from '/@/utils/propTypes';
const { t } = useI18n();
export const modalProps = {
    visible: propTypes.bool,
    scrollTop: propTypes.bool.def(true),
    height: propTypes.number,
    minHeight: propTypes.number,
    // open drag
    draggable: propTypes.bool.def(true),
    centered: propTypes.bool,
    cancelText: propTypes.string.def(t('common.cancelText')),
    okText: propTypes.string.def(t('common.okText')),
    closeFunc: Function,
};
export const basicProps = Object.assign({}, modalProps, {
    defaultFullscreen: propTypes.bool,
    // Can it be full screen
    canFullscreen: propTypes.bool.def(true),
    // After enabling the wrapper, the bottom can be increased in height
    wrapperFooterOffset: propTypes.number.def(0),
    // Warm reminder message
    helpMessage: [String, Array],
    // Whether to setting wrapper
    useWrapper: propTypes.bool.def(true),
    loading: propTypes.bool,
    loadingTip: propTypes.string,
    /**
     * @description: Show close button
     */
    showCancelBtn: propTypes.bool.def(true),
    /**
     * @description: Show confirmation button
     */
    showOkBtn: propTypes.bool.def(true),
    wrapperProps: Object,
    afterClose: Function,
    bodyStyle: Object,
    closable: propTypes.bool.def(true),
    closeIcon: Object,
    confirmLoading: propTypes.bool,
    destroyOnClose: propTypes.bool,
    footer: Object,
    getContainer: Function,
    mask: propTypes.bool.def(true),
    maskClosable: propTypes.bool.def(true),
    keyboard: propTypes.bool.def(true),
    maskStyle: Object,
    okType: propTypes.string.def('primary'),
    okButtonProps: Object,
    cancelButtonProps: Object,
    title: propTypes.string,
    visible: propTypes.bool,
    width: [String, Number],
    wrapClassName: propTypes.string,
    zIndex: propTypes.number,
});
//# sourceMappingURL=props.js.map