import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = (props) => {
    const [taskOn, setTaskOn] = useState(true);

    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => setTaskOn(!taskOn)}
                    className={taskOn ? 'AppTask' : 'AppTask off'}
                >
                    {props.task.content}
                </div>
            )}
        </Draggable>

    );
};

export default Task;