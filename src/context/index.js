import { createContext, useState } from 'react';

export const Context = createContext();

const Provider = ({ children }) => {
    const [squares, setSquares] = useState([]);
    const [test, setTest] = useState('test');

    return (
        <Context.Provider
            value={{
                test
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;