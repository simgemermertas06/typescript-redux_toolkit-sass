import Todo from "./Todo";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TodoType } from "../types/Types";

function TodoList() {
  //useSelector ile state içindeki todo'ları çekicez
  const { todos } = useSelector((state: RootState) => state.todo);
  //bu todos = initialState'saki todos , state.todo'daki bu todo store içindeki reducers'daki todo

  return (
    <div>
      {todos &&
        todos.map((todo: TodoType) => <Todo key={todo.id} todoProps={todo} />)}
    </div>
  );
}

export default TodoList;
