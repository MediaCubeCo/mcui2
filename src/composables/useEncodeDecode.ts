class UseEncodeDecode {
  static encode(value: object)  {
    if (value.constructor !== Object) return value
    try {
      return btoa(encodeURI(JSON.stringify(value)))
    } catch (e) {
      console.error(e)
      return value
    }
  }
  static decode(value: string | null)  {
    if (!value) return value
    try {
      return JSON.parse(decodeURI(atob(value)))
    } catch (e) {
      console.error(e)
      return value
    }
  }
}

export { UseEncodeDecode }