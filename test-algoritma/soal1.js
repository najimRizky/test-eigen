const TEST_CASE = [
  "Saya sangat senang mengerjakan soal algoritma",
  "Semarang adalah ibu kota provinsi Jawa Tengah",
  // Add More
]

const main = () => {
  TEST_CASE.map((sentence) => {
    console.log(findLongestWord(sentence))
  })
}

const findLongestWord = (sentence) => {
  let words = sentence.split(" ")
  let longestWord = ""

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i]
    }
  }

  return `${longestWord}: ${longestWord.length} character(s)`
}

main()