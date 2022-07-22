import React, { useState, useEffect } from 'react';
import { rows, columns, squaresObject, emptyObject } from './constants';

const App = () => {
  const [squaresArray, setSquaresArray] = useState([]);

  useEffect(() => {
    let parentArr = [];
    for (let i = 0; i < columns + 4; i++) {
      let childArr = [];

      if (i > 1 && i < columns + 2) {
        for (let j = 0; j < rows + 4; j++) {
          if (j > 1 && j < rows + 2) {
            childArr.push({ ...squaresObject });
          } else {
            childArr.push({ ...emptyObject });
          }
        }
        parentArr.push(childArr);
      } else {
        for (let j = 0; j < rows + 4; j++) {
          childArr.push({ ...emptyObject });
        }
        parentArr.push(childArr);
      }
    }

    setSquaresArray(parentArr);
  }, []);

  // useEffect(() => {
  //   console.log(squaresArray);
  // }, [squaresArray]);

  const handleClick = (col, row) => {
    console.log('col şu = ' + col + ' row şu = ' + row);
    let newArr = [...squaresArray];

    if (newArr[col][row].isActive) {
      newArr[col][row].value = 'X';
      newArr[col][row].isActive = false;
      checkWin(col, row, newArr, true);
      setSquaresArray(newArr);
    }

    // the computer;
    let colRandom = Math.floor(Math.random() * 20);
    let rowRandom = Math.floor(Math.random() * 11);
    let cpuArr = [...squaresArray];

    if (cpuArr[colRandom][rowRandom].isActive) {
      cpuArr[colRandom][rowRandom].value = 'O';
      cpuArr[colRandom][rowRandom].isActive = false;
      checkWin(colRandom, rowRandom, cpuArr, false);
      setSquaresArray(cpuArr);
    }

  };

  const getSquare = (col, row) => squaresArray[col][row].value;
  const myFinishedCheck = (col, row) => squaresArray[col][row].isMyFinished;
  const cpuFinishedCheck = (col, row) => squaresArray[col][row].isCpuFinished;

  const resultQuery = (param1, param2, param3) => {
    if (
      (!myFinishedCheck(param1[0], param1[1]) && !myFinishedCheck(param2[0], param2[1]) && !myFinishedCheck(param3[0], param3[1]))
      &&
      (!cpuFinishedCheck(param1[0], param1[1]) && !cpuFinishedCheck(param2[0], param2[1]) && !cpuFinishedCheck(param3[0], param3[1]))
      &&
      getSquare(param1[0], param1[1]) === getSquare(param2[0], param2[1])
      &&
      getSquare(param1[0], param1[1]) === getSquare(param3[0], param3[1])
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkWin = (col, row, newArr, isMy) => {
    const rowChecks = [
      {
        values: [[col, row], [col, row + 1], [col, row + 2]],
        query: resultQuery([col, row], [col, row + 1], [col, row + 2])
      },
      {
        values: [[col, row], [col, row - 1], [col, row + 1]],
        query: resultQuery([col, row], [col, row - 1], [col, row + 1])
      },
      {
        values: [[col, row], [col, row - 1], [col, row - 2]],
        query: resultQuery([col, row], [col, row - 1], [col, row - 2])
      }
    ];

    const colChecks = [
      {
        values: [[col, row], [col + 1, row], [col + 2, row]],
        query: resultQuery([col, row], [col + 1, row], [col + 2, row])
      },
      {
        values: [[col, row], [col - 1, row], [col + 1, row]],
        query: resultQuery([col, row], [col - 1, row], [col + 1, row])
      },
      {
        values: [[col, row], [col - 1, row], [col - 2, row]],
        query: resultQuery([col, row], [col - 1, row], [col - 2, row])
      }
    ];

    const rightDiagonalCheck = [
      {
        values: [[col, row], [col + 1, row - 1], [col + 2, row - 2]],
        query: resultQuery([col, row], [col + 1, row - 1], [col + 2, row - 2])
      },
      {
        values: [[col, row], [col - 1, row + 1], [col + 1, row - 1]],
        query: resultQuery([col, row], [col - 1, row + 1], [col + 1, row - 1])
      },
      {
        values: [[col, row], [col - 1, row + 1], [col - 2, row + 2]],
        query: resultQuery([col, row], [col - 1, row + 1], [col - 2, row + 2])
      },
    ];

    const leftDiagonalCheck = [
      {
        values: [[col, row], [col + 1, row + 1], [col + 2, row + 2]],
        query: resultQuery([col, row], [col + 1, row + 1], [col + 2, row + 2])
      },
      {
        values: [[col, row], [col - 1, row - 1], [col + 1, row + 1]],
        query: resultQuery([col, row], [col - 1, row - 1], [col + 1, row + 1])
      },
      {
        values: [[col, row], [col - 1, row - 1], [col - 2, row - 2]],
        query: resultQuery([col, row], [col - 1, row - 1], [col - 2, row - 2])
      },
    ];

    rowChecks.forEach(item => {
      if (item.query) {
        item.values.forEach(value => {
          if (isMy) {
            newArr[value[0]][value[1]].isMyFinished = true;
          } else {
            newArr[value[0]][value[1]].isCpuFinished = true;
          }
          return;
        });
      }
    });

    colChecks.forEach(item => {
      if (item.query) {
        item.values.forEach(value => {
          if (isMy) {
            newArr[value[0]][value[1]].isMyFinished = true;
          } else {
            newArr[value[0]][value[1]].isCpuFinished = true;
          }
          return;
        });
      }
    });

    rightDiagonalCheck.forEach(item => {
      if (item.query) {
        item.values.forEach(value => {
          if (isMy) {
            newArr[value[0]][value[1]].isMyFinished = true;
          } else {
            newArr[value[0]][value[1]].isCpuFinished = true;
          }
          return;
        });
      }
    });

    leftDiagonalCheck.forEach(item => {
      if (item.query) {
        item.values.forEach(value => {
          if (isMy) {
            newArr[value[0]][value[1]].isMyFinished = true;
          } else {
            newArr[value[0]][value[1]].isCpuFinished = true;
          }
          return;
        });
      }
    });
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
                    <li
                      className={`
                      ${row.isMyFinished ? 'my-finished' : 'not-finished'} 
                      ${row.isCpuFinished ? 'cpu-finished' : null} 
                      ${!row.isVisible && 'display-none'}
                      `}
                      key={rowIndex}
                      onClick={() => handleClick(colIndex, rowIndex)}>{row.value}</li>
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