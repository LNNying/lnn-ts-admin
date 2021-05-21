import { cloneDeep } from 'lodash-es';
import { unref } from 'vue';
import { forEach } from '/@/utils/helper/treeHelper';
export function useTree(treeDataRef, getReplaceFields) {
    function getAllKeys(list) {
        const keys = [];
        const treeData = list || unref(treeDataRef);
        const { key: keyField, children: childrenField } = unref(getReplaceFields);
        if (!childrenField || !keyField)
            return keys;
        for (let index = 0; index < treeData.length; index++) {
            const node = treeData[index];
            keys.push(node[keyField]);
            const children = node[childrenField];
            if (children && children.length) {
                keys.push(...getAllKeys(children));
            }
        }
        return keys;
    }
    // Update node
    function updateNodeByKey(key, node, list) {
        if (!key)
            return;
        const treeData = list || unref(treeDataRef);
        const { key: keyField, children: childrenField } = unref(getReplaceFields);
        if (!childrenField || !keyField)
            return;
        for (let index = 0; index < treeData.length; index++) {
            const element = treeData[index];
            const children = element[childrenField];
            if (element[keyField] === key) {
                treeData[index] = { ...treeData[index], ...node };
                break;
            }
            else if (children && children.length) {
                updateNodeByKey(key, node, element[childrenField]);
            }
        }
    }
    // Expand the specified level
    function filterByLevel(level = 1, list, currentLevel = 1) {
        if (!level) {
            return [];
        }
        const res = [];
        const data = list || unref(treeDataRef) || [];
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            const { key: keyField, children: childrenField } = unref(getReplaceFields);
            const key = keyField ? item[keyField] : '';
            const children = childrenField ? item[childrenField] : [];
            res.push(key);
            if (children && children.length && currentLevel < level) {
                currentLevel += 1;
                res.push(...filterByLevel(level, children, currentLevel));
            }
        }
        return res;
    }
    /**
     * 添加节点
     */
    function insertNodeByKey({ parentKey = null, node, push = 'push' }) {
        const treeData = cloneDeep(unref(treeDataRef));
        if (!parentKey) {
            treeData[push](node);
            treeDataRef.value = treeData;
            return;
        }
        const { key: keyField, children: childrenField } = unref(getReplaceFields);
        if (!childrenField || !keyField)
            return;
        forEach(treeData, (treeItem) => {
            if (treeItem[keyField] === parentKey) {
                treeItem[childrenField] = treeItem[childrenField] || [];
                treeItem[childrenField][push](node);
            }
        });
        treeDataRef.value = treeData;
    }
    // Delete node
    function deleteNodeByKey(key, list) {
        if (!key)
            return;
        const treeData = list || unref(treeDataRef);
        const { key: keyField, children: childrenField } = unref(getReplaceFields);
        if (!childrenField || !keyField)
            return;
        for (let index = 0; index < treeData.length; index++) {
            const element = treeData[index];
            const children = element[childrenField];
            if (element[keyField] === key) {
                treeData.splice(index, 1);
                break;
            }
            else if (children && children.length) {
                deleteNodeByKey(key, element[childrenField]);
            }
        }
    }
    return { deleteNodeByKey, insertNodeByKey, filterByLevel, updateNodeByKey, getAllKeys };
}
//# sourceMappingURL=useTree.js.map