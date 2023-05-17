import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { TodoCondition } from '../../types/TodoCondition';

type Props = {
  todos: Todo[],
  onDeleteTodo: (todoId: number) => void,
  procesingTodosId: number[],
  todoCondition: TodoCondition,
  toggleTodo: (curentTodo: Todo[], isCompleted?: boolean) => void,
  handleSubmitEditing: (id: number, updatedTitle: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onDeleteTodo,
  procesingTodosId,
  todoCondition,
  toggleTodo,
  handleSubmitEditing,
}) => {
  return (
    <>
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          todoCondition={procesingTodosId.includes(todo.id)
            ? todoCondition
            : TodoCondition.Neutral}
          toggleTodo={toggleTodo}
          handleSubmitEditing={handleSubmitEditing}
        />
      ))}
    </>
  );
};
