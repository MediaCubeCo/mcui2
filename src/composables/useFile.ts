import { FileContentType } from '@/enums/File'

class UseFile {
  static loadAsString(url: string, type: FileContentType): string {
    if (!url || !type) return url

    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, false)
    xhr.setRequestHeader('Content-Type', type)
    xhr.send()

    if (xhr.status === 200) {
      return xhr.responseText
    } else {
      console.error(`Ошибка загрузки SVG: ${xhr.status}`)
      return ''
    }
  }
}

export { UseFile }