import { t } from '/@/hooks/web/useI18n';
const menu = {
    orderNo: 5000,
    menu: {
        name: t('routes.demo.flow.name'),
        path: '/flow',
        tag: {
            dot: true,
        },
        children: [
            {
                path: 'flowChart',
                name: t('routes.demo.flow.flowChart'),
                tag: {
                    content: 'new',
                },
            },
        ],
    },
};
export default menu;
//# sourceMappingURL=flow.js.map