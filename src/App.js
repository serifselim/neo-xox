import React, { useState, useEffect } from 'react';
import { rows, columns } from './constants';

const App = () => {
  const [squaresArray, setSquaresArray] = useState([]);

  useEffect(() => {
    let parentArr = [];
    for (let i = 0; i < columns; i++) {
      let childArr = [];
      for (let j = 0; j < rows; j++) {
        childArr.push('');
      }
      parentArr.push(childArr);
    }

    setSquaresArray(parentArr);
  }, []);

  useEffect(() => {
    console.log(squaresArray);
  }, [squaresArray]);

  const handleClick = (colIndex, rowIndex) => {
    console.log('col şu = ' + colIndex + ' row şu = ' + rowIndex);
    let newArr = [...squaresArray];
    newArr[colIndex][rowIndex] = 'x';
    setSquaresArray(newArr);
  };

  return (
    <div className='container'>
      <div className='content'>
        {
          squaresArray.map((col, colIndex) => {
            return (
              <ul key={colIndex} value={colIndex}>
                {
                  squaresArray[colIndex].map((row, rowIndex) => (
                    <li key={rowIndex} onClick={() => handleClick(colIndex, rowIndex)}>{row}</li>
                  ))
                }
              </ul>
            );
          })
        }
      </div>
    </div>
  );
};

export default App;