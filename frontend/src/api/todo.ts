import { Id, TodoType } from '../common/types';

const BASE_URL = 'http://localhost:3000/todo'

export const getAllTodos = async () => {
  return fetch(BASE_URL).then(res => res.json());
}

export const setTodoCompleted = (id: number, completed: boolean) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed })
  })
}

export const createTodo = (todo: { order: number;  content: string; }): Promise<TodoType> => {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo),
  }).then(res => res.json());
}

export const changeTodoOrder = (changeTodoOrder: { id: Id; order: number}[]) => {
  return fetch(BASE_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(changeTodoOrder),
  })
}
