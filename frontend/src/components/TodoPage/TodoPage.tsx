import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TodoForm } from '../TodoForm/TodoForm'
import { TodoList } from '../TodoList/TodoList'
import { getAllTodos } from '../../api/todo';
import { TodoType } from '../../common/types';
import styles from './styles.module.css';

export const TodoPage: React.FC = () => {
  const { data: todos } = useQuery<TodoType[]>({
    queryKey: ['todos'],
    queryFn: getAllTodos,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const maxOrder = useMemo(() => todos?.[todos?.length - 1]?.order, [todos]);

  return (<div className={styles.container}>
    <TodoForm maxOrder={maxOrder} />
    <TodoList todos={todos} />
  </div>);
};
