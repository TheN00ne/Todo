import { useSelector } from "react-redux";
import { rootState } from "..";
import React, { useState } from "react";
import { TodoGroup } from "./todoGroup";
import { CreateMenu } from "./createMenu";
import UIStyles from "../styles/uiStyles.module.css";

export const MainPage: React.FC = () => {
  const todoGroupsArr = useSelector(
    (state: rootState) => state.todoAppSlice.groups
  );

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  return (
    <div>
      <button
        className={UIStyles.addTodoBlock}
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
          targetElementId={0}
        />
      ) : null}

      <div className={UIStyles.todoGrid}>
        {todoGroupsArr.length === 0 ? (
          <h1 className={UIStyles.empty}>Тут нічого немає</h1>
        ) : (
          todoGroupsArr.map((el) => (
            <TodoGroup
              key={el.id}
              id={el.id}
              title={el.title}
              description={el.description}
              todoTasksArr={el.todoTasksArr}
            />
          ))
        )}
      </div>
    </div>
  );
};
