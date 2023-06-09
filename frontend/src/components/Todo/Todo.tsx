import { ChangeEvent, forwardRef, useCallback } from 'react';
import styles from './styles.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setTodoCompleted } from '../../api/todo';
import { TodoType } from '../../common/types';

export const Todo = forwardRef<HTMLDivElement, TodoType>(({ id, completed, content, order, ...rest }, ref) => {
  const queryClient = useQueryClient();
  const completeMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean; }) => setTodoCompleted(id, completed),
    onMutate() {
      queryClient.cancelQueries(['todos']);
    },
    onSuccess(_, variables) {
      queryClient.setQueryData<TodoType[]>(['todos'], (prev) => {
        return prev?.map(todo => todo.id == variables.id ? { ...todo, completed: variables.completed } : todo);
      });
    },
  })

  const handleCompletedChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    completeMutation.mutate({ id, completed: e.target.checked });
  }, [completeMutation, id]);

  return (
    <div className={styles.wrapper} ref={ref} {...rest}>
      <input
        type='checkbox'
        defaultChecked={completed}
        onChange={handleCompletedChange}
        className={styles.checkbox}
      />
      <span className={styles.content}>{ content }</span>
    </div>
  )
});
