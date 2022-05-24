import React, { useState } from 'react';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CloseIcon from '@mui/icons-material/Close';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import AddIcon from '@mui/icons-material/Add';

const Column = (props) => {
    const [valueInput, setValueInput] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        const size = Object.keys(props.store.tasks).length;
        const task = {
            id: `task-${size + 1}`,
            content: valueInput,
        };

        const newState = {
            ...props.store,
            tasks: {
                ...props.store.tasks, [task.id]: task
            },
            columns: {
                ...props.store.columns, [props.column.id]: {
                    ...props.store.columns[props.column.id], taskIds: [...props.store.columns[props.column.id].taskIds, task.id]
                }
            },
        };

        if (valueInput) {
            props.setStore(newState);
        }
        setValueInput('');
    };


    const handleDelete = () => {
        const Tasks = props.store.columns[props.column.id].taskIds;
        const NewTasks = { ...props.store.tasks };
        for (let i = Tasks.length; i >= 0; i--) {
            delete NewTasks[Tasks[i]];
        }
        const newColumns = { ...props.store.columns };
        delete newColumns[props.column.id];

        props.setStore({
            ...props.store,
            tasks: {
                ...NewTasks
            },
            columns: {
                ...newColumns
            },
            columnOrder: [...props.store.columnOrder.filter(column => column !== props.column.id)]

        });
    };

    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className='AppColumn'
                >
                    <div className='AppButtons'>
                        <span {...provided.dragHandleProps}><OpenWithIcon className='btnMove' /></span>
                        <span><CloseIcon className='btnDelete' onClick={handleDelete} /></span>
                    </div>
                    <h1>
                        {props.column.title}
                    </h1>
                    <form className='AppForm' onSubmit={addTask}>
                        <input value={valueInput} onChange={(e) => setValueInput(e.target.value)} placeholder='Add a new task' />
                        <AddIcon onClick={addTask} className='icon' />
                    </form>
                    <Droppable droppableId={props.column.id} type='task'>
                        {(provided) => (
                            <div
                                className='AppTaskList'
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {props.tasks.map((task, index) =>
                                    <Task store={props.store} setStore={props.setStore} key={task.id} task={task} index={index} />
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};

export default Column;