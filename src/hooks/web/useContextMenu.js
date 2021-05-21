import { onUnmounted, getCurrentInstance } from 'vue';
import { createContextMenu, destroyContextMenu } from '/@/components/ContextMenu';
export function useContextMenu(authRemove = true) {
    if (getCurrentInstance() && authRemove) {
        onUnmounted(() => {
            destroyContextMenu();
        });
    }
    return [createContextMenu, destroyContextMenu];
}
//# sourceMappingURL=useContextMenu.js.map