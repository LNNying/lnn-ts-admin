import compressPlugin from 'vite-plugin-compression';
export function configCompressPlugin(compress, deleteOriginFile = false) {
    const compressList = compress.split(',');
    const plugins = [];
    if (compressList.includes('gzip')) {
        plugins.push(compressPlugin({
            ext: '.gz',
            deleteOriginFile,
        }));
    }
    if (compressList.includes('brotli')) {
        plugins.push(compressPlugin({
            ext: '.br',
            algorithm: 'brotliCompress',
            deleteOriginFile,
        }));
    }
    return plugins;
}
//# sourceMappingURL=compress.js.map