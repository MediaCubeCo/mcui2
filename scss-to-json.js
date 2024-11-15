import fs from 'fs'
import path from 'path'
import sassExtract from 'sass-extract'

const scssFolder = './src/assets/tokens'

// Функция для упрощения данных
function simplifyData(data) {
  const simplified = {};
  for (const [key, value] of Object.entries(data)) {
    if (value.type === 'SassColor') {
      simplified[key] = value.value.hex;
    } else if (value.type === 'SassNumber') {
      simplified[key] = `${value.value}${value.unit || ''}`;
    } else if (value.type === 'SassString') {
      simplified[key] = value.value;
    } else if (value.type === 'SassMap') {
      simplified[key] = simplifyData(value.value);
    }
  }
  return simplified;
}

async function extractVariablesFromFile(file) {
  const options = {
    file: file,
    includePaths: [],
    plugins: ['sass-extract-js'],
  };

  try {
    const rendered = await sassExtract.render(options);
    const simplified = simplifyData(rendered.vars.global);

    // Определение имени JSON файла
    const baseName = path.basename(file, '.scss');
    const jsonFileName = `${baseName}.json`;
    const jsonOutputPath = path.join('./src/assets/tokens/', 'json', jsonFileName);

    // Запись JSON в файл
    fs.writeFileSync(jsonOutputPath, JSON.stringify(simplified, null, 2));

    console.log(`SCSS variables from ${file} exported to ${jsonOutputPath}`);
  } catch (err) {
    console.error(`Error extracting SCSS variables from ${file}:`, err);
  }
}

// Функция для обработки всех SCSS файлов в папке
async function extractVariablesFromFolder(folder) {
  const files = fs.readdirSync(folder).filter(file => file.endsWith('.scss'));

  for (const file of files) {
    const filePath = path.join(folder, file);
    await extractVariablesFromFile(filePath);
  }
}

extractVariablesFromFolder(scssFolder)