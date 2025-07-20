import { useSelector } from "react-redux";
import { rootState } from "..";
import React, { useState } from "react";
import { TodoBlock } from "./todoBlock";
import { CreateMenu } from "./createMenu";
import { useParams } from "react-router-dom";
import UIStyles from "../styles/uiStyles.module.css";
import todoStyles from "../styles/todoStyles.module.css";

export const TaskPage: React.FC = () => {
  const todoGroupArr = useSelector(
    (state: rootState) => state.todoAppSlice.groups
  );

  const { groupId, taskId } = useParams();

  const group = todoGroupArr.find((el) => el.id === Number(groupId));
  const task = group?.todoTasksArr.find((el) => el.id === Number(taskId));

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

      {isShowMenu && task !== undefined ? (
        <CreateMenu
          targetElementInerface="ITodoBlock"
          isMenuClose={setIsShowMenu}
          targetElementId={task.id}
        />
      ) : null}

      <h1 className={UIStyles.pageTitle}>{task?.title}</h1>
      <p className={UIStyles.pageDescription}>{task?.description}</p>
      <div className={todoStyles.blockGrid}>
        {task?.todoBlocksArr.length === 0 ? (
          <h1 className={UIStyles.empty}>Тут нічого немає</h1>
        ) : (
          task?.todoBlocksArr.map((el) => (
            <TodoBlock
              key={el.id}
              id={el.id}
              title={el.title}
              description={el.description}
              parentId={el.parentId}
              priority={el.priority}
              completed={el.completed}
            />
          ))
        )}
      </div>
    </div>
  );
};
