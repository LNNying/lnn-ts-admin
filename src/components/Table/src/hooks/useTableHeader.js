import { unref, computed, h } from 'vue';
import TableHeader from '../components/TableHeader.vue';
import { isString } from '/@/utils/is';
import { getSlot } from '/@/utils/helper/tsxHelper';
export function useTableHeader(propsRef, slots) {
    const getHeaderProps = computed(() => {
        const { title, showTableSetting, titleHelpMessage, tableSetting } = unref(propsRef);
        const hideTitle = !slots.tableTitle && !title && !slots.toolbar && !showTableSetting;
        if (hideTitle && !isString(title)) {
            return {};
        }
        return {
            title: hideTitle
                ? null
                : () => h(TableHeader, {
                    title,
                    titleHelpMessage,
                    showTableSetting,
                    tableSetting,
                }, {
                    ...(slots.toolbar
                        ? {
                            toolbar: () => getSlot(slots, 'toolbar'),
                        }
                        : {}),
                    ...(slots.tableTitle
                        ? {
                            tableTitle: () => getSlot(slots, 'tableTitle'),
                        }
                        : {}),
                }),
        };
    });
    return { getHeaderProps };
}
//# sourceMappingURL=useTableHeader.js.map