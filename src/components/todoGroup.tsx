import { useDispatch } from "react-redux";
import { ITodoGroup } from "../reducers/todoGroupReducer";
import { removeGroupe } from "../reducers/todoAppReducer";
import { useState } from "react";
import { CreateMenu } from "./createMenu";
import { useSelector } from "react-redux";
import { rootState } from "..";
import { TodoTask } from "./todoTask";

export const TodoGroup: React.FC<ITodoGroup> = (props) => {
  const dispatch = useDispatch();
  const todoTasksArr = useSelector(
    (state: rootState) => state.todoGroupSlice.todoTasksArr
  );

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  return (
    <div>
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          dispatch(removeGroupe(props.id));
        }}
      >
        x
      </div>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <span>{props.todoTasksArr.length}</span>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setIsShowMenu(true);
        }}
      >
        +
      </button>
      {isShowMenu ? (
        <CreateMenu
          targetElementInerface="ITodoTask"
          isMenuClose={setIsShowMenu}
          targerElementId={props.id}
        />
      ) : null}
      <div>
        {todoTasksArr.map((el) => (
          <TodoTask
            key={el.id}
            id={el.id}
            title={el.title}
            description={el.description}
            todoBlocksArr={el.todoBlocksArr}
          />
        ))}
      </div>
    </div>
  );
};
