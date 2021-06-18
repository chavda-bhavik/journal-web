import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './store';
import { fetchJournals } from './store/journal/APIActions';
import { decrement, increment } from './store/slice/counterSlice';

function App() {
    const count = useAppSelector((state) => state.counter.value);
    const journals = useAppSelector((state) => state.journal.journals);
    const dispatch = useAppDispatch();
    console.log(journals);
    useEffect(() => {
        dispatch(fetchJournals());
    }, []);

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
