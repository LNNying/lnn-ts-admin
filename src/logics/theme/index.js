import { getThemeColors, generateColors } from '../../../build/config/themeConfig';
import { replaceStyleVariables } from 'vite-plugin-theme/es/client';
import { mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme/es/colorUtils';
export async function changeTheme(color) {
    const colors = generateColors({
        mixDarken,
        mixLighten,
        tinycolor,
        color,
    });
    return await replaceStyleVariables({
        colorVariables: [...getThemeColors(color), ...colors],
    });
}
//# sourceMappingURL=index.js.map