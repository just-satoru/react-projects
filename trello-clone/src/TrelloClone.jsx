import { useState } from 'react';
import './trelloClone.css';
import Column from './Column';
import NewColumn from './NewColumn';
import storage from './storage';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const TrelloClone = () => {
  const [store, setStore] = useState(storage);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      const newTasksList = {
        ...store.tasks
      };
      delete newTasksList[draggableId];


      const TaskIds = Array.from(store.columns[source.droppableId].taskIds);
      TaskIds.splice(source.index, 1);

      const newState = {
        ...store,
        tasks: newTasksList,
        columns: {
          ...store.columns,
          [source.droppableId]: {
            ...store.columns[source.droppableId],
            taskIds: TaskIds
          }
        }
      };

      setStore(newState);
      return;
    }

    if (
      destination.doppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }



    if (type === 'column') {
      const newColumnOrder = Array.from(store.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...store,
        columnOrder: newColumnOrder,
      };
      setStore(newState);
      return;
    }

    const start = store.columns[source.droppableId];
    const finish = store.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...store,
        columns: {
          ...store.columns,
          [newColumn.id]: newColumn,
        },
      };

      setStore(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...store,
      columns: {
        ...store.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setStore(newState);


  };


  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable
        droppableId='all-columns'
        direction='horizontal'
        type='column'
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="AppTrelloClone"
          >

            <h1 className='AppTitle'>To-Do List App</h1>
            <hr style={{ width: '30%', margin: '10px auto', borderColor: 'white' }} />
            <div className='AppWorkSpace'>


              {store.columnOrder.map((columnId, index) => {
                const column = store.columns[columnId];
                const tasks = column.taskIds.map(taskId => store.tasks[taskId]);
                return <Column
                  store={store}
                  setStore={setStore}
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}

                />
              })}
              {provided.placeholder}
              <NewColumn store={store} setStore={setStore} />
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TrelloClone;