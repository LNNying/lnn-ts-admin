export const searchList = (() => {
    const result = [];
    for (let i = 0; i < 6; i++) {
        result.push({
            id: i,
            title: 'Vben Admin',
            description: ['Vben', '设计语言', 'Typescript'],
            content: '基于Vue Next, TypeScript, Ant Design实现的一套完整的企业级后台管理系统。',
            time: '2020-11-14 11:20',
        });
    }
    return result;
})();
export const actions = [
    { icon: 'clarity:star-line', text: '156', color: '#018ffb' },
    { icon: 'bx:bxs-like', text: '156', color: '#459ae8' },
    { icon: 'bx:bxs-message-dots', text: '2', color: '#42d27d' },
];
export const schemas = [
    {
        field: 'field1',
        component: 'InputSearch',
        label: '项目名',
        colProps: {
            span: 8,
        },
        componentProps: {
            onChange: (e) => {
                console.log(e);
            },
        },
    },
];
//# sourceMappingURL=data.jsx.map