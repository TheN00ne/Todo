import { useSelector } from "react-redux";
import { rootState } from "..";
import { TodoTrashBlock } from "./todoTrashBlock";
import { useParams } from "react-router-dom";
import UIStyles from "../styles/uiStyles.module.css";
import todoStyles from "../styles/todoStyles.module.css";

export const TrashBlocksPage: React.FC = () => {
  const todoTrashGroupsArr = useSelector(
    (state: rootState) => state.todoAppSlice.trashGroups
  );

  const todoTrashTasksArr = useSelector(
    (state: rootState) => state.todoAppSlice.trashTasks
  );

  const todoTrashBlocksArr = useSelector(
    (state: rootState) => state.todoAppSlice.trashBlocks
  );

  const params = useParams();
  console.log(params.groupId, params.taskId);

  const group = todoTrashGroupsArr.find(
    (el) => el.id === Number(params.groupId)
  );

  const task = todoTrashTasksArr.find((el) => el.id === Number(params.taskId));

  const taskInGroup = group?.todoTasksArr.find(
    (el) => el.id === Number(params.taskId)
  );

  return (
    <div>
      {!params.groupId && params.taskId ? (
        <div>
          <h1 className={UIStyles.pageTitle}>{task?.title}</h1>
          <p className={UIStyles.pageDescription}>{task?.description}</p>
        </div>
      ) : params.groupId && params.taskId ? (
        <div>
          <h1 className={UIStyles.pageTitle}>{taskInGroup?.title}</h1>
          <p className={UIStyles.pageDescription}>{taskInGroup?.description}</p>
        </div>
      ) : null}
      <div className={todoStyles.blockGrid}>
        {!params.groupId && !params.taskId ? (
          todoTrashBlocksArr.length === 0 ? (
            <h1 className={UIStyles.empty}>Тут нічого немає</h1>
          ) : (
            todoTrashBlocksArr.map((el) => (
              <TodoTrashBlock
                key={el.id}
                id={el.id}
                title={el.title}
                description={el.description}
                parentId={el.parentId}
                priority={el.priority}
                completed={el.completed}
                isChild={false}
              />
            ))
          )
        ) : !params.groupId && params.taskId ? (
          task?.todoBlocksArr.length === 0 ? (
            <h1 className={UIStyles.empty}>Тут нічого немає</h1>
          ) : (
            task?.todoBlocksArr.map((el) => (
              <TodoTrashBlock
                key={el.id}
                id={el.id}
                title={el.title}
                description={el.description}
                parentId={el.parentId}
                priority={el.priority}
                completed={el.completed}
                isChild={true}
              />
            ))
          )
        ) : params.groupId && params.taskId ? (
          taskInGroup?.todoBlocksArr.length === 0 ? (
            <h1 className={UIStyles.empty}>Тут нічого немає</h1>
          ) : (
            taskInGroup?.todoBlocksArr.map((el) => (
              <TodoTrashBlock
                key={el.id}
                id={el.id}
                title={el.title}
                description={el.description}
                parentId={el.parentId}
                priority={el.priority}
                completed={el.completed}
                isChild={true}
              />
            ))
          )
        ) : null}
      </div>
    </div>
  );
};
