import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { SPRITE_FILES } from './src/consts/iconsSpriteIds.js'
import path from 'path'

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
    /**
     * Генерация деклараций для всей папки src.
     * Что бы подсказки работали в IDE, обязательно указание в package.json ("types": "./dist/types/index.d.ts",)
     * */
    dts({
      outDir: 'dist/types',
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['src/mocks']
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
    /**
     * Папка куда будет билдиться
     * */
    outDir: 'dist',
    /**
     * Блок указывающий что билд будет как библиотека
     * */
    lib: {
      // Точка входа
      entry: './src/index.ts',
      // Название
      name: 'mediacube-ui-v2',
      // Название файлов скриптов
      fileName: 'mediacube-ui-v2',
      // Форматы скриптов es - ECMAScript Modules, umd - Universal Module Definition
      formats: ['es'] // , 'umd'
    },
    /**
     * Управление зависимостями
     * */
    rollupOptions: {
      external: ['vue', 'src/mocks'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    dedupe: ['vue']
  }
})
