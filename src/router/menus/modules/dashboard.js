import { t } from '/@/hooks/web/useI18n';
const menu = {
    orderNo: 10,
    menu: {
        name: t('routes.dashboard.dashboard'),
        path: '/dashboard',
        children: [
            {
                path: 'analysis',
                name: t('routes.dashboard.analysis'),
            },
            {
                path: 'workbench',
                name: t('routes.dashboard.workbench'),
            },
        ],
    },
};
export default menu;
//# sourceMappingURL=dashboard.js.map