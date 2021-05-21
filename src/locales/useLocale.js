import moment from 'moment';
import { i18n } from './setupI18n';
import { useLocaleStoreWithOut } from '/@/store/modules/locale';
import { unref, computed } from 'vue';
const loadLocalePool = [];
export function setLoadLocalePool(cb) {
    cb(loadLocalePool);
}
function setI18nLanguage(locale) {
    const localeStore = useLocaleStoreWithOut();
    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale;
    }
    else {
        i18n.global.locale.value = locale;
    }
    localeStore.setLocaleInfo({ locale });
    document.querySelector('html')?.setAttribute('lang', locale);
}
export function useLocale() {
    const localeStore = useLocaleStoreWithOut();
    const getLocale = computed(() => localeStore.getLocale);
    const getShowLocalePicker = computed(() => localeStore.getShowPicker);
    const getAntdLocale = computed(() => {
        return i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale ?? {};
    });
    // Switching the language will change the locale of useI18n
    // And submit to configuration modification
    async function changeLocale(locale) {
        const globalI18n = i18n.global;
        const currentLocale = unref(globalI18n.locale);
        if (currentLocale === locale) {
            return locale;
        }
        if (loadLocalePool.includes(locale)) {
            setI18nLanguage(locale);
            return locale;
        }
        const langModule = (await import(`./lang/${locale}.ts`)).default;
        if (!langModule)
            return;
        const { message, momentLocale, momentLocaleName } = langModule;
        globalI18n.setLocaleMessage(locale, message);
        moment.updateLocale(momentLocaleName, momentLocale);
        loadLocalePool.push(locale);
        setI18nLanguage(locale);
        return locale;
    }
    return {
        getLocale,
        getShowLocalePicker,
        changeLocale,
        getAntdLocale,
    };
}
//# sourceMappingURL=useLocale.js.map