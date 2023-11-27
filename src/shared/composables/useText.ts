const useText = () => {
  const limitText = (text: string, limit: number): string => {
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
    console.log(text, limitedText, words.length)
    return limitedText
  }
  return { limitText }
}

export default useText
