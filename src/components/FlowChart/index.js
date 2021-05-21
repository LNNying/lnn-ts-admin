import flowChart from './src/index.vue';
export const FlowChart = Object.assign(flowChart, {
    install(app) {
        app.component(flowChart.name, flowChart);
    },
});
//# sourceMappingURL=index.js.map