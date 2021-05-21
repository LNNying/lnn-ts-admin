import { h } from 'vue';
import EditableCell from './EditableCell.vue';
export function renderEditCell(column) {
    return ({ text: value, record, index }) => {
        record.onEdit = async (edit, submit = false) => {
            if (!submit) {
                record.editable = edit;
            }
            if (!edit && submit) {
                const res = await record.onSubmitEdit?.();
                if (res) {
                    record.editable = false;
                    return true;
                }
                return false;
            }
            // cancel
            if (!edit && !submit) {
                record.onCancelEdit?.();
            }
            return true;
        };
        return h(EditableCell, {
            value,
            record,
            column,
            index,
        });
    };
}
//# sourceMappingURL=index.js.map