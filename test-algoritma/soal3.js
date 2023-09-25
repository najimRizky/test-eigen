const case1 = {
  INPUT: ['xc', 'dz', 'bbb', 'dz'],
  QUERY: ['bbb', 'ac', 'dz']
}

const case2 = {
  INPUT: ['x', 'y', 'z'],
  QUERY: ['x', 'y', 'z']
}

const TEST_CASE = [
  case1,
  case2
  // Add More
]

const main = () => {
  TEST_CASE.map((testCase) => {
    console.log(countQuery(testCase.INPUT, testCase.QUERY))
  })
}

const countQuery = (input, query) => {
  const result = []
  let count = 0

  for (let i = 0; i < query.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (query[i] === input[j]) {
        count++
      }
    }

    result.push(count)
    count = 0
  }

  return result
}

main()