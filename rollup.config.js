export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/ng-smart-tabs.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng-smart-tabs',
    globals: {
        '@angular/core': 'ng.core',
    }
}