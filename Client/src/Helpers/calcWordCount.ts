export default function calcWordCount(text: string) {
    const wordsArr: Array<string> = text.trim().split(" ");
    return wordsArr.filter((word: string) => word !== "").length;
  }
