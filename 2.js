const calculate = (str) => {
  const terms = [];
  const operators = ["+"];
  let i, j;
  for (i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      const { res, pos } = calculate(str.slice(i + 1));
      i += pos + 1;
      terms.push(res);
      if (str[i + 1] === "(") {
        operators.push("*");
      }
      continue;
    } else if (str[i] === ")") {
      break;
    }

    if (!isNaN(str[i])) {
      for (j = i; !isNaN(str[j]); j++);
      terms.push(parseInt(str.slice(i, j).join("")));
      i = j - 1;
    } else {
      operators.push(str[i]);
    }
  }
  const lastPos = i;

  let result = 0;
  for (i = 0; i < operators.length; i++) {
    let term = terms[i];
    for (j = i + 1; operators[j] === "*" || operators[j] === "/"; j++) {
      if (operators[j] === "*") term *= terms[j];
      else term /= terms[j];
    }
    if (i === 0 || operators[i] === "+") result += term;
    else result -= term;

    i = j - 1;
  }

  return {
    res: result,
    pos: lastPos,
  };
};