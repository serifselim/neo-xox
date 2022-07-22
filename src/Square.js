import React from 'react';

const Square = ({ row, rowIndex, colIndex, handleClick }) => {
    return (
        <li
            className={`
                      ${row.isMyFinished ? 'my-finished' : 'not-finished'} 
                      ${row.isCpuFinished ? 'cpu-finished' : null} 
                      ${!row.isVisible && 'display-none'}
                      `}
            key={rowIndex}
            onClick={() => handleClick(colIndex, rowIndex)}>{row.value}
        </li>
    );
};

export default Square;