import { useDispatch } from "react-redux";
import { removeTodo } from "../reducers/todoTaskReducer";

export interface ITodoBlock {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

export const TodoBlock: React.FC<ITodoBlock> = (props) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        width: "500px",
        border: `2px solid ${
          props.priority == "low"
            ? "blue"
            : props.priority == "medium"
            ? "yellow"
            : props.priority == "high"
            ? "red"
            : "gray"
        }`,
      }}
    >
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          dispatch(removeTodo(props.id));
        }}
      >
        Remove
      </button>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};
