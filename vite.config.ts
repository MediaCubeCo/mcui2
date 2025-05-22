import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

export default defineConfig({
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
        {
          src: 'src/assets/iconsSprite.svg',
          dest: 'assets'
        },
        {
          src: 'src/assets/img',
          dest: 'assets'
        },
        {
          src: 'src/assets/styles/*.scss',
          dest: 'assets/styles'
        },
        {
          src: 'src/assets/tokens/*.scss',
          dest: 'assets/tokens'
        },
        {
          src: 'src/assets/fonts',
          dest: 'assets'
        },
        {
          src: 'src/assets/variables.scss',
          dest: 'assets'
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
      formats: ['es', 'umd']
    },
    /**
     * Управление зависимостями
     * */
    rollupOptions: {
      external: ['vue', 'src/mocks'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
