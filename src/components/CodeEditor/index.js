import codeEditor from './src/CodeEditor.vue';
import jsonPreview from './src/json-preview/JsonPreview.vue';
export const CodeEditor = Object.assign(codeEditor, {
    install(app) {
        app.component(codeEditor.name, codeEditor);
    },
});
export const JsonPreview = Object.assign(jsonPreview, {
    install(app) {
        app.component(jsonPreview.name, jsonPreview);
    },
});
//# sourceMappingURL=index.js.map