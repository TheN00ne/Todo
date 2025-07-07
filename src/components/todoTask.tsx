import { ITodoTask } from "../reducers/todoTaskReducer";
import { TodoBlock } from "./todoBlock";

export const TodoTask: React.FC<ITodoTask> = (props) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <div>
        {props.todoBlocksArr.map((el) => (
          <TodoBlock
            id={el.id}
            key={el.id}
            title={el.title}
            description={el.description}
            priority={el.priority}
          />
        ))}
      </div>
    </div>
  );
};
