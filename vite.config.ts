import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
// @ts-ignore
import { SPRITE_FILES } from './src/consts/iconsSpriteIds.js'
import path from 'path'
import { resolveLibEntries } from './scripts/resolveLibEntries'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  plugins: [
    vue(),
    /** ESM `import './…css'` в чанки компонентов (library + preserveModules), без style-inject в DOM */
    libInjectCss(),
    /**
     * Генерация деклараций для всей папки src.
     * Что бы подсказки работали в IDE, обязательно указание в package.json ("types": "./dist/types/index.d.ts",)
     * */
    dts({
      outDir: 'dist/types',
      insertTypesEntry: true,
      include: ['src'],
      exclude: ["node_modules", "src/**/*.stories.ts", "src/**/*.stories.js", "src/**/*.stories.vue", "dist", "src/mocks", "src/App.vue", "src/main.*"]
    }),
    /**
     * Перенос файлов которые не задеваются сборкой
     * */
    viteStaticCopy({
      targets: [
        ...[
          ...Object.values(SPRITE_FILES).map(sf => `src/assets/${sf}`),
          'src/assets/img',
          'src/assets/fonts',
          'src/assets/variables.scss',
          'src/assets/base.scss'
        ].map((src) => ({ src, dest: '' })),
        {
          src: 'src/assets/styles/*.scss',
          dest: 'styles'
        },
        {
          src: 'src/assets/tokens/*.scss',
          dest: 'tokens'
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: false,
    cssMinify: true,
    cssCodeSplit: true,
    lib: {
      entry: resolveLibEntries(),
      name: 'mediacube-ui-v2',
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ['es'],
    },
    /**
     * external — не включать в бандл; приложение подтянет из своих зависимостей (меньше дублирования и размер).
     * preserveModules — сохраняет дерево модулей для tree-shaking: потребитель тянет только импортируемые компоненты.
     */
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/shared',
        'dayjs',
        'vue-multiselect',
        '@vuepic/vue-datepicker',
        'vue3-cropperjs',
        'vue-3-slider-component',
        'vue-imask',
        'xss'
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: path.resolve(__dirname, 'src'),
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name][extname]',
      },
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    dedupe: ['vue']
  }
})
