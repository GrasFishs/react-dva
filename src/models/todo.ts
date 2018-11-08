import { Model, Action } from "../utils/type";

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(() => resolve(), ms));

let uuid = 0;

interface Todo {
  text: string;
  completed: boolean;
  id: number;
}

export interface TodoState {
  todos: Array<Todo>;
}

interface Payload {
  id: number;
  text: string;
}

export interface TodoAction extends Action<Payload> {}

export default {
  namespace: "todo",
  state: {
    todos: []
  },
  reducers: {
    addTodo(state, { payload: { text } }) {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuid++,
            text,
            completed: false
          }
        ]
      };
    },
    toggleTodo(state, { payload: { id } }) {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !todo.completed
            };
          }
          return todo;
        })
      };
    }
  },
  effects: {
    *addTodoAsync({ payload: { text } }, { put, call }) {
      yield delay(1000);
      yield put({ type: "addTodo", payload: { text } });
    }
  },
  subscriptions: {}
} as Model<TodoState, TodoAction>;
