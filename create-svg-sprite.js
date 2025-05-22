import fs from 'fs'
import path from 'path'
import svgstore from 'svgstore'

// Конфигурация папок и спрайтов
const icons_folders = ['icons']
const spriteConfigs = icons_folders.map(i_folder => ({
    iconsFolder: `./src/assets/${i_folder}`,
    outputFolder: `./src/assets/`,
    spriteName: `iconsSprite.svg`,
}))

// Создание спрайтов из разных папок
spriteConfigs.forEach(spriteConfig => {
    const { iconsFolder, outputFolder, spriteName } = spriteConfig

    // Создание экземпляра svgstore для каждого спрайта
    const sprites = svgstore()

    // Чтение файлов из папки с иконками
    fs.readdir(iconsFolder, async (err, files) => {
        if (err) {
            console.error('Ошибка чтения папки:', err)
            return
        }

        // Фильтрация файлов только с расширением .svg
        const svgFiles = files.filter(file => path.extname(file) === '.svg')

        // Добавление иконок в спрайт
        svgFiles.forEach(svgFile => {
            const filePath = path.join(iconsFolder, svgFile)
            const iconName = path.basename(`mcSvgIconSprite-${svgFile}`, '.svg')
            const svgContent = fs.readFileSync(filePath, 'utf8')
            sprites.add(iconName, svgContent, { copyAttrs: true, renameDefs: true })
        })

        // Генерация спрайта
        const spriteContent = sprites.toString()?.replace(/(\r\n|\n|\r)/gm, '')

        // Создание файла спрайта
        const outputFilePath = path.join(outputFolder, spriteName)

        if (!fs.existsSync(outputFolder)) await fs.mkdirSync(outputFolder, { recursive: true })
        fs.writeFileSync(outputFilePath, spriteContent)
        console.log('\x1b[35m', '\nSPRITE SUCCESSFULLY CREATED:', outputFilePath)


        // Создание файла со списком икнок
        const iconsListJson = Object.assign({}, svgFiles);
        let iconsList = {}
        for (let key in iconsListJson) {
            iconsList[iconsListJson[key].replace('.svg', '')] = iconsListJson[key]
        }
        const outputIconsListPath = path.join(`./src/mocks/`, 'icons.json')
        if (!fs.existsSync(`./src/mocks/`)) await fs.mkdirSync(outputIconsListPath, { recursive: true })
        fs.writeFileSync(outputIconsListPath, JSON.stringify(iconsList))
        console.log('\x1b[35m', '\nICONS LIST SUCCESSFULLY CREATED:', outputIconsListPath, '\n')
    })
})
