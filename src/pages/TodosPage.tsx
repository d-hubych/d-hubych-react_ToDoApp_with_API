import React, {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Todo } from '../types/Todo';
import { ErrorType } from '../types/ErrorType';
import { TodoCondition } from '../types/TodoCondition';
import { User } from '../types/User';

import { filterTodos } from '../utils/filterTodos';
import {
  deleteTodo,
  getTodos,
  changeTodo,
} from '../api/todos';

import { Header } from '../components/Header';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { Footer } from '../components/Footer/Footer';
import { ErrorMessage } from '../components/ErrorMessage';

type Props = {
  user: User,
};

export const TodosPage: FC<Props> = ({ user }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState(ErrorType.None);
  const [todoCondition, setTodoCondition]
    = useState<TodoCondition>(TodoCondition.Neutral);
  const [procesingTodosId, setProcesingTodosId] = useState<number[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const USER_ID = user.id;

  const handleError = (err: ErrorType) => {
    if (err !== ErrorType.None) {
      setTimeout(() => setErrorType(ErrorType.None), 3000);
    }

    setErrorType(err);
  };

  useEffect(() => {
    if (USER_ID) {
      const getTodosFromSrver = async () => {
        const result = await getTodos(USER_ID);

        try {
          setTodos(result);
        } catch {
          handleError(ErrorType.Load);
        }
      };

      getTodosFromSrver();
    }
  }, [USER_ID]);

  const todosStatus = useMemo(() => {
    return {
      isActive: todos.some(todo => todo.completed === false),
      isCompleted: todos.some(todo => todo.completed === true),
    };
  }, [todos]);

  const deleteTodoOnServer = async (todoId: number) => {
    deleteTodo(todoId);

    try {
      setTodos(prev => prev.filter(({ id }) => id !== todoId));
    } catch {
      handleError(ErrorType.Delete);
    } finally {
      setTodoCondition(TodoCondition.Neutral);
    }
  };

  const handleDeleteTodo = (todoId: number) => {
    setTodoCondition(TodoCondition.Deleting);
    setProcesingTodosId([todoId]);
    deleteTodoOnServer(todoId);
  };

  const clearCompleted = () => {
    setTodoCondition(TodoCondition.Deleting);

    todos?.forEach(todo => {
      if (todo.completed) {
        setProcesingTodosId((state) => [...state, todo.id]);
        deleteTodoOnServer(todo.id);
      }
    });
  };

  const toggleTodos = (curentTodos: Todo[], isCompleted?: boolean) => {
    setTodoCondition(TodoCondition.Saving);

    curentTodos.forEach(curentTodo => {
      if (curentTodo.completed !== isCompleted) {
        setProcesingTodosId((state) => [...state, curentTodo.id]);
      }

      const copyTodos = [...todos];
      const indexCurTodo = copyTodos
        .findIndex(({ id }) => id === curentTodo.id);
      const newStatus: boolean = isCompleted || !curentTodo.completed;

      copyTodos[indexCurTodo].completed = newStatus;

      const toggleTodoOnServer = async () => {
        changeTodo(curentTodo.id, { completed: newStatus });

        try {
          setTodos(copyTodos);
        } catch {
          handleError(ErrorType.Update);
        } finally {
          setProcesingTodosId([]);
          setTodoCondition(TodoCondition.Neutral);
        }
      };

      toggleTodoOnServer();
    });
  };

  const toggleAllTodos = () => {
    toggleTodos(todos, todosStatus.isActive);
  };

  const handleSubmitEditing = (todoId: number, newTitle: string) => {
    setProcesingTodosId([todoId]);
    setTodoCondition(TodoCondition.Saving);

    const changeTodoOnServer = async () => {
      changeTodo(todoId, { title: newTitle });

      try {
        setTodos(prevTodos => prevTodos.map(todo => {
          if (todo.id === todoId) {
            return {
              ...todo,
              title: newTitle,
            };
          }

          return todo;
        }));
      } catch {
        setErrorType(ErrorType.Update);
      } finally {
        setProcesingTodosId([]);
        setTodoCondition(TodoCondition.Neutral);
      }
    };

    changeTodoOnServer();
  };

  const onLogout = () => {
    localStorage.removeItem('user');
    navigate(0);
  };

  const filteredTodos = todos ? filterTodos(todos, pathname) : [];

  //  eslint-disable-next-line
  console.log('render');

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__user">
        {`Hello ${user.name.toUpperCase()} 😊`}

        <button
          type="button"
          onClick={onLogout}
          className="button is-outlined is-danger is-small"
        >
          Logout
        </button>
      </div>

      <div className="todoapp__content">

        <Header
          containsActive={todosStatus.isActive}
          handleError={handleError}
          setTodoCondition={setTodoCondition}
          onTrickTempTodo={setTempTodo}
          setTodos={setTodos}
          toggleAllTodos={toggleAllTodos}
          USER_ID={USER_ID}
        />

        {filteredTodos && (
          <>
            <section className="todoapp__main">
              <TodoList
                todos={filteredTodos}
                onDeleteTodo={handleDeleteTodo}
                todoCondition={todoCondition}
                procesingTodosId={procesingTodosId}
                toggleTodo={toggleTodos}
                handleSubmitEditing={handleSubmitEditing}
              />

              {tempTodo && (
                <TodoItem
                  todo={tempTodo}
                  todoCondition={todoCondition}
                />
              )}
            </section>
          </>
        )}

        {!!todos.length && (
          <Footer
            containsCompleted={todosStatus.isCompleted}
            onClearCompleted={clearCompleted}
            itemsLeft={todos
              .filter(({ completed }) => !completed).length}
          />
        )}
      </div>

      {
        errorType !== ErrorType.None && (
          <ErrorMessage errorType={errorType} handleError={setErrorType} />
        )
      }
    </div>
  );
};
