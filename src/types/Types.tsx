export interface TodoInitialState {
  todos: TodoType[]; //todos, TodoType tipinde bir Array'dir
  loading?: boolean;
}

export interface TodoType {
  id: number;
  content: string;
}
