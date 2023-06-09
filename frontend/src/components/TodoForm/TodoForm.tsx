import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useState } from 'react';
import { createTodo } from '../../api/todo';
import { TodoType } from '../../common/types';
import styles from './styles.module.css';

export const TodoForm: React.FC<{ maxOrder?: number }> = ({ maxOrder }) => {
  const [content, setContent] = useState('');

  const queryClient = useQueryClient();
  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onMutate() {
      queryClient.cancelQueries(['todos']);
    },
    onSuccess(newTodo) {
      queryClient.setQueryData<TodoType[]>(['todos'], (prev) => {
        return prev?.concat([newTodo]);
      });
    },
  });

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value), []);

  const handleButtonClick = useCallback(() => {
    if (content.trim()) {
      createTodoMutation.mutate({ order: Number(maxOrder) + 1, content });
      setContent('');
    }
  }, [createTodoMutation, maxOrder, content]);

  return (
    <div className={styles.wrapper}>
      <input type='text' value={content} onChange={handleInputChange} className={styles.input} />
      <button className={styles.btn} onClick={handleButtonClick}>Save</button>
    </div>
  );
}
