import { DragDropContext, OnDragEndResponder, Droppable, Draggable } from 'react-beautiful-dnd';
import { TodoType } from '../../common/types';
import { Todo } from '../Todo/Todo';
import styles from './styles.module.css';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeTodoOrder } from '../../api/todo';

export const TodoList: React.FC<{ todos?: TodoType[] }> = ({ todos }) => {
  const queryClient = useQueryClient();
  const changeOrderMutation = useMutation(changeTodoOrder);

  const handleDragEnd = useCallback<OnDragEndResponder>(result => {
    const todos = queryClient.getQueryData<TodoType[]>(['todos']);

    if (!result.destination || !todos) return;

    const destinationIdx = result.destination?.index;
    const sourceIdx = result.source.index;

    if (sourceIdx === destinationIdx) return;

    if (sourceIdx < destinationIdx) {
      const startIdx = sourceIdx + 1;
      const endIdx = destinationIdx + 1;

      const affectedTodos = todos.slice(startIdx, endIdx);

      queryClient.setQueryData<TodoType[]>(['todos'], (prev) => {
        if (!prev) return;

        return [
          ...prev.slice(0, startIdx - 1),
          ...affectedTodos.map(todo => ({ ...todo, order: todo.order - 1 })),
          { ...todos[sourceIdx], order: todos[destinationIdx].order },
          ...prev.slice(endIdx),
        ];
      });

      changeOrderMutation.mutate(
        affectedTodos
          .map(({ id, order }) => ({ id, order: order - 1 }))
          .concat([{ id: todos[sourceIdx].id, order: todos[destinationIdx].order }])
      );
    } else {
      const startIdx = destinationIdx;
      const endIdx = sourceIdx;

      const affectedTodos = todos.slice(startIdx, endIdx);

      queryClient.setQueryData<TodoType[]>(['todos'], (prev) => {
        if (!prev) return;

        return [
          ...prev.slice(0, startIdx),
          { ...todos[sourceIdx], order: todos[destinationIdx].order },
          ...affectedTodos.map(todo => ({ ...todo, order: todo.order + 1 })),
          ...prev.slice(endIdx + 1),
        ];
      });

      changeOrderMutation.mutate(
        affectedTodos
          .map(({ id, order }) => ({ id, order: order + 1 }))
          .concat([{ id: todos[sourceIdx].id, order: todos[destinationIdx].order }])
      );
    }
  }, [changeOrderMutation, queryClient]);

  return todos?.length
    ? (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, idx) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={idx}
                >
                  {(provided) => (
                    <Todo
                      key={todo.id}
                      {...todo}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                    />)}

                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
    : <h1>There are no todos...</h1>;
};
