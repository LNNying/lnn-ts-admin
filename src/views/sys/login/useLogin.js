import { ref, computed, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
export var LoginStateEnum;
(function (LoginStateEnum) {
    LoginStateEnum[LoginStateEnum["LOGIN"] = 0] = "LOGIN";
    LoginStateEnum[LoginStateEnum["REGISTER"] = 1] = "REGISTER";
    LoginStateEnum[LoginStateEnum["RESET_PASSWORD"] = 2] = "RESET_PASSWORD";
    LoginStateEnum[LoginStateEnum["MOBILE"] = 3] = "MOBILE";
    LoginStateEnum[LoginStateEnum["QR_CODE"] = 4] = "QR_CODE";
})(LoginStateEnum || (LoginStateEnum = {}));
const currentState = ref(LoginStateEnum.LOGIN);
export function useLoginState() {
    function setLoginState(state) {
        currentState.value = state;
    }
    const getLoginState = computed(() => currentState.value);
    function handleBackLogin() {
        setLoginState(LoginStateEnum.LOGIN);
    }
    return { setLoginState, getLoginState, handleBackLogin };
}
export function useFormValid(formRef) {
    async function validForm() {
        const form = unref(formRef);
        if (!form)
            return;
        const data = await form.validate();
        return data;
    }
    return { validForm };
}
export function useFormRules(formData) {
    const { t } = useI18n();
    const getAccountFormRule = computed(() => createRule(t('sys.login.accountPlaceholder')));
    const getPasswordFormRule = computed(() => createRule(t('sys.login.passwordPlaceholder')));
    const getSmsFormRule = computed(() => createRule(t('sys.login.smsPlaceholder')));
    const getMobileFormRule = computed(() => createRule(t('sys.login.mobilePlaceholder')));
    const validatePolicy = async (_, value) => {
        return !value ? Promise.reject(t('sys.login.policyPlaceholder')) : Promise.resolve();
    };
    const validateConfirmPassword = (password) => {
        return async (_, value) => {
            if (!value) {
                return Promise.reject(t('sys.login.passwordPlaceholder'));
            }
            if (value !== password) {
                return Promise.reject(t('sys.login.diffPwd'));
            }
            return Promise.resolve();
        };
    };
    const getFormRules = computed(() => {
        const accountFormRule = unref(getAccountFormRule);
        const passwordFormRule = unref(getPasswordFormRule);
        const smsFormRule = unref(getSmsFormRule);
        const mobileFormRule = unref(getMobileFormRule);
        const mobileRule = {
            sms: smsFormRule,
            mobile: mobileFormRule,
        };
        switch (unref(currentState)) {
            // register form rules
            case LoginStateEnum.REGISTER:
                return {
                    account: accountFormRule,
                    password: passwordFormRule,
                    confirmPassword: [
                        { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
                    ],
                    policy: [{ validator: validatePolicy, trigger: 'change' }],
                    ...mobileRule,
                };
            // reset password form rules
            case LoginStateEnum.RESET_PASSWORD:
                return {
                    account: accountFormRule,
                    ...mobileRule,
                };
            // mobile form rules
            case LoginStateEnum.MOBILE:
                return mobileRule;
            // login form rules
            default:
                return {
                    account: accountFormRule,
                    password: passwordFormRule,
                };
        }
    });
    return { getFormRules };
}
function createRule(message) {
    return [
        {
            required: true,
            message,
            trigger: 'change',
        },
    ];
}
//# sourceMappingURL=useLogin.js.map