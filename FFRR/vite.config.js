import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
// import vue2 from '@vitejs/plugin-vue2';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/site.css',
                'resources/css/style.css',
                'resources/js/site.js',

                'resources/js/extern/moment.js',

                // Control Panel assets.
                // https://statamic.dev/extending/control-panel#adding-css-and-js-assets
                // 'resources/css/cp.css',
                // 'resources/js/cp.js',
            ],
            refresh: true,
        }),

        // vue2(),
    ],
    build: {
        commonjsOptions: { transformMixedEsModules: true } // Change
    }
});
