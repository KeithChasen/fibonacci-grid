import React, { useState, useEffect } from 'react';
import { checkFibonacci } from "./fibonacci";

const GRID_SIZE = 50;

function App() {
  const initialGrid = Array.from(
    { length: GRID_SIZE },
    () => Array.from({ length: GRID_SIZE }, () => 0)
  );
  const [grid, setGrid] = useState(initialGrid);
  const [itemsToDelete, setItemsToDelete] = useState([]);

  useEffect(() => {
    if (itemsToDelete.length) {
      let updatedGrid = [
        ...grid
      ];

      itemsToDelete.forEach((el, i) => {
        const [rowIndex, elementIndex] = el.split('-');
        updatedGrid[rowIndex][elementIndex] = 0;
      });

      setTimeout(() => {
        setGrid(updatedGrid);
        setItemsToDelete([]);
      }, 1500)
    }
  }, [itemsToDelete]);

  const clickHandler = e => {
    setItemsToDelete([]);
    e.target.style.background = "yellow";

    setTimeout(() => {
      e.target.style.background = "white"
    }, 1000);

    const [rowIndex, elementIndex] = e.target.id.split('-');

    let updatedGrid = [
      ...grid
    ];

    const updatedRow = grid[rowIndex].map((element, index) => index !== elementIndex && element + 1);

    updatedGrid.forEach(item => {
      item[elementIndex] = item[elementIndex] + 1
    });

    updatedGrid[rowIndex] = updatedRow;

    setGrid(updatedGrid);

    const deleteThese = checkFibonacci(updatedGrid);

    if (deleteThese.length) {
      setItemsToDelete(deleteThese);
    }
  };

  const markup = grid.map((element, rowIndex) => Array.isArray(element) ?
    (<div className='row' key={rowIndex}>
      {
        element.map(
          (el, elementIndex) =>
            <div
              className='square'
              key={`${rowIndex}-${elementIndex}`}
              id={`${rowIndex}-${elementIndex}`}
              onClick={clickHandler}
              style={{
                color: el > 0 && !itemsToDelete.includes(`${rowIndex}-${elementIndex}`)  ? 'black' : 'white',
                background: itemsToDelete.includes(`${rowIndex}-${elementIndex}`) ? 'green' : 'white'
              }}
            >
              {el}
            </div>
        )
      }
    </div>)  : '');

  return (
    <div className='wrapper'>
      { markup }
    </div>
  );
}

export default App;
