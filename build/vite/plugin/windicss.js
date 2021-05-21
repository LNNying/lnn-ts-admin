import windiCSS from 'vite-plugin-windicss';
export function configWindiCssPlugin() {
    return windiCSS({
        safelist: 'no-select',
        preflight: {
            enableAll: true,
        },
    });
}
//# sourceMappingURL=windicss.js.map