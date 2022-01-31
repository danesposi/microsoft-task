import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs'

const SortableExample = () => {

    const [state, setState] = useState([
        { id: 1, name: "shrek" },
        { id: 2, name: "fiona" },
      ]);

    return (
        <ReactSortable list={state} setList={setState} animation={300} ghostClass='blue-background-class'>
            {state.map((item) => (
            <div key={item.id}>{item.name}</div>
            ))}
        </ReactSortable>
    )
}

export default SortableExample
