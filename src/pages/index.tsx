import * as React from 'react';
import {connect} from 'dva';
import {TodoAction, TodoState} from "../models/todo";
import {Dispatch} from "redux";

interface Props extends TodoState {
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  addTodoAsync: (text: string) => void;
}

interface State {
  text: string;
}

@connect(({todo}: { todo: TodoState }) => ({...todo}), (dispatch: Dispatch<TodoAction>) => ({
  addTodo: (text: string) => dispatch({type: 'todo/addTodo', payload: {text}}),
  toggleTodo: (id: number) => dispatch({type: 'todo/toggleTodo', payload: {id}}),
  addTodoAsync: (text: string) => dispatch(({type: 'todo/addTodoAsync', payload: {text}}))
}))
export default class Index extends React.Component<Props, State> {
  readonly state: Readonly<State> = {
    text: ''
  };
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({text: event.target.value.toString()});
  };

  handleCheckboxChange(id: number) {
    this.props.toggleTodo(id)
  }

  handleAddTodo = () => {
    this.props.addTodo(this.state.text);
  };

  handleAddTodoAsync = () => {
    this.props.addTodoAsync(this.state.text);
  };

  render() {
    const {todos} = this.props;
    return (
      <div>
        <h1>Welcome to react-dva!</h1>
        <input type="text" onChange={this.handleInputChange}/>
        <button onClick={this.handleAddTodo}>+</button>
        <button onClick={this.handleAddTodoAsync}>async</button>
        <ul>
          {todos.map(todo => <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={this.handleCheckboxChange.bind(this, todo.id)}/>
            <span>{todo.text}</span>
          </li>)}
        </ul>
      </div>
    );
  }
}
