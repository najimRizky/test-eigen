const TEST_CASE = [
  "NEGIE1",
  "KJOKKENMODINGER",
  // Add More
]

const main = () => {
  TEST_CASE.map((word) => {
    console.log(reverseWord(word))
  })
}

const reverseWord = (word) => {
  let reversedWord = ""
  
  for (let i = word.length - 1; i >= 0; i--) {
    reversedWord += word[i]
  }
  
  return reversedWord
}

main()