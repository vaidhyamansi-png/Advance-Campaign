import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports, getPascalCaseRouteName } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import MetaLayouts from 'vite-plugin-vue-meta-layouts'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  base: '/Advance-Campaign/',  // ✅ Fixed

  plugins: [
    VueRouter({
      getRouteName: routeNode => {
        return getPascalCaseRouteName(routeNode)
          .replace(/([a-z\d])([A-Z])/g, '$1-$2')
          .toLowerCase()
      },
      routesFolder: 'resources/js/pages',
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'swiper-container' || tag === 'swiper-slide',
        },
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    // ❌ laravel() plugin removed
    vueJsx(),
    vuetify({
      styles: {
        configFile: 'resources/styles/variables/_vuetify.scss',
      },
    }),
    MetaLayouts({
      target: './resources/js/layouts',
      defaultLayout: 'default',
    }),
    Components({
      dirs: ['resources/js/@core/components', 'resources/js/views/demos', 'resources/js/components'],
      dts: true,
      resolvers: [
        componentName => {
          if (componentName === 'VueApexCharts')
            return { name: 'default', from: 'vue3-apexcharts', as: 'VueApexCharts' }
        },
      ],
    }),
    AutoImport({
      imports: ['vue', VueRouterAutoImports, '@vueuse/core', '@vueuse/math', 'vue-i18n', 'pinia'],
      dirs: [
        './resources/js/@core/utils',
        './resources/js/@core/composable/',
        './resources/js/composables/',
        './resources/js/utils/',
        './resources/js/plugins/*/composables/*',
      ],
      vueTemplate: true,
      ignore: ['useCookies', 'useStorage'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
    }),
    svgLoader(),
  ],

  define: { 'process.env': {} },

  resolve: {
    alias: {
      '@core-scss': fileURLToPath(new URL('./resources/styles/@core', import.meta.url)),
      '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
      '@themeConfig': fileURLToPath(new URL('./themeConfig.js', import.meta.url)),
      '@core': fileURLToPath(new URL('./resources/js/@core', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./resources/js/@layouts', import.meta.url)),
      '@images': fileURLToPath(new URL('./resources/images/', import.meta.url)),
      '@styles': fileURLToPath(new URL('./resources/styles/', import.meta.url)),
      '@configured-variables': fileURLToPath(new URL('./resources/styles/variables/_template.scss', import.meta.url)),
      '@db': fileURLToPath(new URL('./resources/js/plugins/fake-api/handlers/', import.meta.url)),
      '@api-utils': fileURLToPath(new URL('./resources/js/plugins/fake-api/utils/', import.meta.url)),
    },
  },

  build: {
    outDir: 'dist',  // ✅ ab dist mein jayega
    chunkSizeWarningLimit: 5000,
  },

  optimizeDeps: {
    exclude: ['vuetify'],
    entries: ['./resources/js/**/*.vue'],
  },
})
