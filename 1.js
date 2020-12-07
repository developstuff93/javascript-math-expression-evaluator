function extractNumber(str, currentPos) {
  if (str[currentPos] === '(') {
    const { value, pos } = extractExpression(str, currentPos + 1)
    
    if (str[pos] !== ')') {
      throw new Error('Invalid parenthesis')
    }
    
    return {
      num: value,
      pos: pos + 1
    }
  } else {
    let i = currentPos;
    let num = '';

    while (str[i] >= '0' && str[i] <= '9' && i < str.length) {
      num += str[i]
      i += 1
    }
  
    if (num === '') {
      throw new Error('Invalid expression')
    }
  
    return {
      num: parseInt(num),
      pos: i
    }
  }
}

const MUL_OPERANDS = ['*', '/']
const SUM_OPERANDS = ['+', '-']

function extractTerm(str, currentPos) {
  let i = currentPos;
  let value = 1;
  let op = '*'
  
  while (i < str.length) {
    const { num, pos } = extractNumber(str, i)
    i = pos

    if (op === '*') {
      value *= num
    } else {
      value /= num
    }

    if (!MUL_OPERANDS.includes(str[i])) {
      break;
    }

    op = str[i]
    i += 1
  }

  return {
    value,
    pos: i
  }
}

function extractExpression(str, currentPos) {
  let i = currentPos;
  let value = 0;
  let op = '+';
  
  while (i < str.length) {
    const { value: num, pos } = extractTerm(str, i)
    i = pos
  
    if (op === '+') {
      value += num
    } else {
      value -= num
    }
  
    if (!SUM_OPERANDS.includes(str[i])) {
      break;
    }

    op = str[i]
    i += 1
  }

  return {
    value,
    pos: i
  }
}

function calculate(str) {
  const { value, pos } = extractExpression(str, 0)

  if (pos !== str.length) {
    throw new Error('Invalid expression')
  }

  return value
}

// console.log(calculate('2+3*4-100*23/2'))
// console.log(calculate('22*3*4+100*23/2'))
// console.log(calculate('(((2+3)))'))
// console.log(calculate('2+'))
console.log(calculate('(3+(4+10)*12)/(6-12)+12'));
