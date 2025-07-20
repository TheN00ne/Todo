import { useSelector } from "react-redux";
import { rootState } from "..";
import React, { useState } from "react";
import { TodoTask } from "./todoTask";
import { CreateMenu } from "./createMenu";
import { useParams } from "react-router-dom";
import UIStyles from "../styles/uiStyles.module.css";

export const GroupPage: React.FC = () => {
  const todoGroupsArr = useSelector(
    (state: rootState) => state.todoAppSlice.groups
  );

  const { groupId } = useParams();

  const group = todoGroupsArr.find((el) => el.id === Number(groupId));

  const [isShowCreateMenu, setIsShowCreateMenu] = useState<boolean>(false);

  return (
    <div>
      <button
        className={UIStyles.addTodoBlock}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setIsShowCreateMenu(true);
        }}
      >
        +
      </button>

      {isShowCreateMenu && group !== undefined ? (
        <CreateMenu
          targetElementInerface="ITodoTask"
          isMenuClose={setIsShowCreateMenu}
          targetElementId={group.id}
        />
      ) : null}

      <h1 className={UIStyles.pageTitle}>{group?.title}</h1>
      <p className={UIStyles.pageDescription}>{group?.description}</p>
      <div className={UIStyles.todoGrid}>
        {group?.todoTasksArr.length === 0 ? (
          <h1 className={UIStyles.empty}>Тут нічого немає</h1>
        ) : (
          group?.todoTasksArr.map((el) => (
            <TodoTask
              key={el.id}
              id={el.id}
              title={el.title}
              description={el.description}
              todoBlocksArr={el.todoBlocksArr}
              parentId={el.parentId}
            />
          ))
        )}
      </div>
    </div>
  );
};
