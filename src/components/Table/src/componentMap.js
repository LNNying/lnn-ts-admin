import { Input, Select, Checkbox, InputNumber, Switch } from 'ant-design-vue';
import { ApiSelect } from '/@/components/Form';
const componentMap = new Map();
componentMap.set('Input', Input);
componentMap.set('InputNumber', InputNumber);
componentMap.set('Select', Select);
componentMap.set('ApiSelect', ApiSelect);
componentMap.set('Switch', Switch);
componentMap.set('Checkbox', Checkbox);
export function add(compName, component) {
    componentMap.set(compName, component);
}
export function del(compName) {
    componentMap.delete(compName);
}
export { componentMap };
//# sourceMappingURL=componentMap.js.map