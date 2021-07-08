export const checkFibonacci = (updatedGrid) => {
  const collectedNumbers = collectCellNumbers(updatedGrid);
  const fiboNums = checkSequenceExists(collectedNumbers);

  if (fiboNums.length) {
    const deleteThese = [];
    fiboNums.forEach((el, i) => {
      if (collectedNumbers.length && collectedNumbers[el].length) {
        deleteThese.push(collectedNumbers[el].shift())
      }
    });

    return deleteThese
  }
};

const collectCellNumbers = (updatedGrid) => {
  const fiboArr = [];
  updatedGrid.forEach((element, index) => {
    Array.isArray(element) && element.map(
      (item, i) => {
        if (fiboArr[item]) {
          fiboArr[item].push(`${index}-${i}`)
        } else {
          fiboArr[item] = [];
          fiboArr[item][0] = `${index}-${i}`
        }
      }
    );
  });

  return fiboArr;
};

const checkSequenceExists = collectedNumbers => {
  // means we have 0 1 1 2 3
  if (collectedNumbers.length >= 4) {
    const fiboNums = [...collectedNumbers.keys()];

    if (
      !(typeof collectedNumbers[0] === undefined) && !(typeof collectedNumbers[1] === undefined)
    ) {
      fiboNums.splice(1, 0,  1)
    }

    return checkFib(fiboNums);
  }

  return [];
};

const isPerfectSquare = num => {
  let n = parseInt(Math.sqrt(num));
  return (n * n == num);
};

const checkFib = arr => {
  const fiboArr = [];
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (isPerfectSquare(5 * arr[i] * arr[i] + 4) || isPerfectSquare(5 * arr[i] * arr[i] - 4)) {
      fiboArr.push(arr[i]);
      count++;
    }
  }

  return fiboArr;
};
