const matrix1 = [
  [1, 2, 0], 
  [4, 5, 6], 
  [7, 8, 9]
]

const matrix2 = [ // 5 x 5
  [1, 2, 3, 4, 5], 
  [6, 7, 8, 9, 10], 
  [11, 12, 13, 14, 15], 
  [16, 17, 18, 19, 20], 
  [21, 22, 23, 24, 25]
]

const TEST_CASE = [
  matrix1,
  matrix2
  // Add More
]

const main = () => {
  TEST_CASE.map((matrix) => {
    console.log(countMatrixDiagonalDifference(matrix))
  })
}

const countMatrixDiagonalDifference = (matrix) => {
  let leftDiagonal = 0
  let rightDiagonal = 0
  
  for (let i = 0; i < matrix.length; i++) {
    leftDiagonal += matrix[i][i]
    rightDiagonal += matrix[i][matrix.length - 1 - i]
  }

  const result = leftDiagonal - rightDiagonal

  return `${leftDiagonal} - ${rightDiagonal} = ${result}`
}

main()