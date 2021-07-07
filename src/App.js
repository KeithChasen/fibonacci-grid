import React, { useState } from 'react';

const GRID_SIZE = 50;

function App() {
  const initialGrid = Array.from(
    { length: GRID_SIZE },
    () => Array.from({ length: GRID_SIZE }, () => 0)
  );
  const [grid, setGrid] = useState(initialGrid);

  const clickHandler = e => {
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
