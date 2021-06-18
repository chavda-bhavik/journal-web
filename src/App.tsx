import React from 'react';
import { useAppSelector, useAppDispatch } from './store';
import { decrement, increment } from './store/slice/counterSlice';

function App() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <div className="bg-gray-400">
            {count}
            <button className="bg-red-300" onClick={() => dispatch(increment())}>
                Increment
            </button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
}

export default App;
