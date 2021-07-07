import React from 'react';

const GRID_SIZE = 50;

function App() {
  const grid = Array.from(
    { length: GRID_SIZE },
    () => Array.from({ length: GRID_SIZE }, () => 0)
  );

  const markup = grid.map((element, rowIndex) => Array.isArray(element) ?
    (<div className='row' key={rowIndex}>
      {
        element.map(
          (el, elementIndex) =>
            <div
              className='square'
              key={`${rowIndex}-${elementIndex}`}
              id={`${rowIndex}-${elementIndex}`}
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
