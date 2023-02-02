import React, {useState} from 'react';

const Counter = () => {

    let [num, setNum] = useState(0);

    return (
        <div>
            <h3>{num}</h3>
            <button onClick={() => setNum(num+ 1)}>increment</button>
            <button onClick={() => setNum(num- 1)}>decrement</button>
        </div>
    );
};

export {Counter};