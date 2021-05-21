import { unref } from 'vue';
import { isFunction } from '/@/utils/is';
export function useTableStyle(propsRef, prefixCls) {
    function getRowClassName(record, index) {
        const { striped, rowClassName } = unref(propsRef);
        if (!striped)
            return;
        if (rowClassName && isFunction(rowClassName)) {
            return rowClassName(record);
        }
        return (index || 0) % 2 === 1 ? `${prefixCls}-row__striped` : '';
    }
    return {
        getRowClassName,
    };
}
//# sourceMappingURL=useTableStyle.js.map