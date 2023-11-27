const useText = () => {
  const limitText = (text: string, limit: number): string | string[] => {
    let limitedText = ''
    let countBytes = 0
    const words: string[] = text.split(' ')
    if (text.length <= limit) return text

    words.forEach((word) => {
      if (countBytes + word.length + limitedText.length <= limit) {
        limitedText += word + ' '
        countBytes += word.length
      } else {
        return
      }
    })
    return limitedText
  }

  const paragraph = (text: string): string[] => {
    const regexQuebraParagraph = /[\n\r]+/
    const paragraphs = text.split(regexQuebraParagraph)

    return paragraphs
  }
  return { limitText, paragraph }
}

export default useText
