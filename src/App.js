import React, { useState, useEffect } from 'react';
import { rows, columns, squaresObject, emptyObject } from './constants';
import Square from './Square';

const App = () => {
  const [squaresArray, setSquaresArray] = useState([]); // Oyun tablosundaki arrayimizin state'i

  useEffect(() => { // Component render edildiğinde oyun tahtasının oluşturulması
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

  const handleClick = (col, row) => { // Kareye tıkladığımız zaman çalışacak method
    let newArr = [...squaresArray];
    if (newArr[col][row].isActive) { // Eğer daha önce o karaye tıklanmamışsa
      newArr[col][row].value = 'X';
      newArr[col][row].isActive = false;
      checkWin(col, row, newArr, true);
      setSquaresArray(newArr);
    } else {
      return;
    }

    // the computer;
    // bilgisayarın random bir değer seçmesi
    let colRandom, rowRandom;

    do {
      colRandom = Math.floor(Math.random() * 20);
      rowRandom = Math.floor(Math.random() * 11);
    } while (!squaresArray[colRandom][rowRandom].isActive);

    let cpuArr = [...squaresArray];

    if (cpuArr[colRandom][rowRandom].isActive) {
      cpuArr[colRandom][rowRandom].value = 'O';
      cpuArr[colRandom][rowRandom].isActive = false;
      checkWin(colRandom, rowRandom, cpuArr, false);
      setSquaresArray(cpuArr);
    }
  };

  // Spesifik değerlerin array üzerinden getirilmesi
  const getSquare = (col, row) => squaresArray[col][row].value;
  const myFinishedCheck = (col, row) => squaresArray[col][row].isMyFinished;
  const cpuFinishedCheck = (col, row) => squaresArray[col][row].isCpuFinished;

  const resultQuery = (param1, param2, param3) => { // Sorgu parametrelerinin kontrolü
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

  const checkObject = (param1, param2, param3) => { // üç yönün ayrı ayrı kontrolü
    return {
      values: [[param1[0], param1[1]], [param2[0], param2[1]], [param3[0], param3[1]]],
      query: resultQuery([param1[0], param1[1]], [param2[0], param2[1]], [param3[0], param3[1]])
    };
  };

  const checkWin = (col, row, newArr, isMy) => { // kazanan var mı methodu

    const allChecksArr = [ // kontrol şemamızın listesi
      // Horizontal
      [
        checkObject([col, row], [col, row + 1], [col, row + 2]),
        checkObject([col, row], [col, row - 1], [col, row + 1]),
        checkObject([col, row], [col, row - 1], [col, row - 2])
      ],
      // Vertical
      [
        checkObject([col, row], [col + 1, row], [col + 2, row]),
        checkObject([col, row], [col - 1, row], [col + 1, row]),
        checkObject([col, row], [col - 1, row], [col - 2, row])
      ],
      // RightDiagonalCheck
      [
        checkObject([col, row], [col + 1, row - 1], [col + 2, row - 2]),
        checkObject([col, row], [col - 1, row + 1], [col + 1, row - 1]),
        checkObject([col, row], [col - 1, row + 1], [col - 2, row + 2]),
      ],
      // leftDiagonalCheck
      [
        checkObject([col, row], [col + 1, row + 1], [col + 2, row + 2]),
        checkObject([col, row], [col - 1, row - 1], [col + 1, row + 1]),
        checkObject([col, row], [col - 1, row - 1], [col - 2, row - 2]),
      ]
    ];

    allChecksArr.forEach(checkTypes => { // şemanın dönmesi ve sonucun bize gelmesi
      checkTypes.forEach(item => {
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
    });
  };
  return (
    <div className='container'>
      <header>
        <h1>NEO XOX</h1>
      </header>
      <div className='content'>
        {
          squaresArray.map((col, colIndex) => {
            return (
              <ul key={colIndex} value={colIndex}>
                {
                  squaresArray[colIndex].map((row, rowIndex) => (
                    <Square
                      key={rowIndex + colIndex}
                      row={row}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      handleClick={handleClick}
                    />
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