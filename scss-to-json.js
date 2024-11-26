import fs from 'fs'
import path from 'path'

const scssFolder = './src/assets/tokens'

const extractVariablesAndMaps = (scssFilePath) => {
  const data = fs.readFileSync(scssFilePath, 'utf8')
  const variables = {}

  // регулярка для обычных переменнных
  const simple_variable_regex = /\$(\w+(-\w+)*):\s*(.*?);/g
  let match

  while ((match = simple_variable_regex.exec(data)) !== null) {
    const variable_name = match[1]
    const variable_value = match[3].trim()
    variables[`$${variable_name}`] = variable_value
  }

  // регулярка для мапов $token-... : (...)
  const map_regex = /\$(token-[\w-]+):\s*\(\s*([\s\S]*?)\s*\);/g
  let map_match

  while ((map_match = map_regex.exec(data)) !== null) {
    const map_name = map_match[1]
    const map_content = map_match[2]

    const map_item_regex = /(["']?)(\w+(-\w+)*|\d+)\1\s*:\s*\$(\w+(-\w+)*)(\s*,)?/g
    let map_item_match
    const map_object = {}

    while ((map_item_match = map_item_regex.exec(map_content)) !== null) {
      const map_key = map_item_match[2]
      const map_var = `$${map_item_match[4]}`

      const map_value = variables[map_var] || map_var

      map_object[map_key] = map_value
    }

    if (Object.keys(map_object).length > 0) {
      variables[`$${map_name}`] = map_object
    }
  }

  return variables
}

async function extractVariablesFromFolder(folder) {
  const files = fs.readdirSync(folder).filter((file) => file.endsWith('.scss'))

  for (const file of files) {
    const file_path = path.join(folder, file)
    const extracted_vars = extractVariablesAndMaps(file_path)

    const base_name = path.basename(file, '.scss')
    const json_file_name = `${base_name}.json`
    const json_output_path = path.join('./src/assets/tokens/', 'json', json_file_name)

    fs.writeFileSync(json_output_path, JSON.stringify(extracted_vars, null, 2))
    console.log(`SCSS variables from ${file} exported to ${json_output_path}`);
  }
}

extractVariablesFromFolder(scssFolder)
