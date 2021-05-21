import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
const dashboard = {
    path: '/about',
    name: 'About',
    component: LAYOUT,
    redirect: '/about/index',
    meta: {
        icon: 'simple-icons:about-dot-me',
        title: t('routes.dashboard.about'),
    },
    children: [
        {
            path: 'index',
            name: 'AboutPage',
            component: () => import('/@/views/sys/about/index.vue'),
            meta: {
                title: t('routes.dashboard.about'),
                icon: 'simple-icons:about-dot-me',
            },
        },
    ],
};
export default dashboard;
//# sourceMappingURL=about.js.map