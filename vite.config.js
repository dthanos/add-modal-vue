import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: './src/AddModal.vue',
            name: 'AddModalVue',
            fileName: (format) => `add-modal-vue.${format}.js`,
        },
        rollupOptions: {
            // External dependencies
            external: ['vue', 'pinia', 'vue-i18n'], // Add 'vue-i18n' here
            output: {
                globals: {
                    vue: 'Vue',
                    pinia: 'Pinia',
                    'vue-i18n': 'VueI18n' // Add a global variable name for vue-i18n
                },
            },
        },
    },
});
