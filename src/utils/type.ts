import {EffectsCommandMap} from "dva";
import {History} from "history";
import {Dispatch} from "redux";

interface Reducers<State, Action> {
  [key: string]: (state: State, action: Action) => State;
}

interface Effects<Action> {
  [key: string]: (action: Action, effects: EffectsCommandMap) => void
}

interface Subscript<Action> {
  dispatch: Dispatch<Action>;
  history: History;
}

interface Subscriptions<Action> {
  [key: string]: (sub: Subscript<Action>) => void;
}

export interface Action<P> {
  type: string;
  payload: P;
}

export interface Model<State, Action> {
  namespace: string;
  state: State;
  reducers: Reducers<State, Action>;
  effects?: Effects<Action>;
  subscriptions?:Subscriptions<Action>;
}
