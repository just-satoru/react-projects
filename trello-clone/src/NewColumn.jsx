import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

const NewColumn = ({ store, setStore }) => {
    const [valueInput, setValueInput] = useState('');

    const addColumn = (e) => {
        e.preventDefault();
        const column = {
            id: `column-${store.columnOrder.length + 1}`,
            title: valueInput,
            taskIds: [],
        };
        const newState = {
            ...store,
            columns: {
                ...store.columns,
                [column.id]: column
            },
            columnOrder: [...store.columnOrder, column.id],
        };
        if (valueInput) {
            setStore(newState);
        }
        setValueInput('');
    };

    return (
        <div className='AppColumn'>
                            <h1>Add a new column</h1>
            <form className='AppForm newColumn' onSubmit={addColumn}>
                <input value={valueInput} onChange={(e) => setValueInput(e.target.value)} placeholder='Enter the title'/>
                <AddIcon onClick={addColumn} className='icon'/>
            </form>
        </div>
    );
};

export default NewColumn;