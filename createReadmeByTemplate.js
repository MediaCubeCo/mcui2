import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const typesDir = path.resolve(__dirname, 'src/types')
const readmeTemplatePath = path.resolve(__dirname, 'README.template.md')
const readmePath = path.resolve(__dirname, 'README.md')

const typesFiles = fs.readdirSync(typesDir).filter((file) => file.endsWith('.d.ts'))

let typesContent = '&mdash;'
//TODO
let tokensContent = '&mdash;'

// typesFiles.forEach((file) => {
//   const filePath = path.join(typesDir, file)
//   const fileContent = fs.readFileSync(filePath, 'utf-8')
//   typesContent += `### ${file}\n\n\`\`\`typescript\n${fileContent}\n\`\`\`\n\n`
// })

let readmeContent = fs.readFileSync(readmeTemplatePath, 'utf-8')
readmeContent = readmeContent.replace('{{types}}', typesContent)
readmeContent = readmeContent.replace('{{tokens}}', tokensContent)

fs.writeFileSync(readmePath, readmeContent, 'utf-8')
console.log('README.md updated')
