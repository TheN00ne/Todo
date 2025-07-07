import { useDispatch, useSelector } from "react-redux";
import { rootState } from "..";
import React, { useState } from "react";
import { TodoGroup } from "./todoGroup";
import { CreateMenu } from "./createMenu";

export const App: React.FC = () => {
  const todoGroupsArr = useSelector(
    (state: rootState) => state.todoAppSlice.todoGroupsArr
  );
  const dispatch = useDispatch();

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setIsShowMenu(true);
        }}
      >
        +
      </button>
      {isShowMenu ? (
        <CreateMenu
          targetElementInerface="ITodoGroup"
          isMenuClose={setIsShowMenu}
          targerElementId={0}
        />
      ) : null}
      <>
        {todoGroupsArr.map((el) => (
          <TodoGroup
            key={el.id}
            id={el.id}
            title={el.title}
            description={el.description}
            todoTasksArr={el.todoTasksArr}
          />
        ))}
      </>
    </div>
  );
};
