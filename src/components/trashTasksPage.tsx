import { useSelector } from "react-redux";
import { rootState } from "..";
import { TodoTrashTask } from "./todoTrashTask";
import { useParams } from "react-router-dom";
import UIStyles from "../styles/uiStyles.module.css";

export const TrashTasksPage: React.FC = () => {
  const todoTrashTasksArr = useSelector(
    (state: rootState) => state.todoAppSlice.trashTasks
  );

  const todoTrashGroupsArr = useSelector(
    (state: rootState) => state.todoAppSlice.trashGroups
  );

  const { groupId } = useParams();

  const group = todoTrashGroupsArr.find((el) => el.id === Number(groupId));

  return (
    <div>
      <h1 className={UIStyles.pageTitle}>{group?.title}</h1>
      <p className={UIStyles.pageDescription}>{group?.description}</p>
      <div className={UIStyles.todoGrid}>
        {group !== undefined ? (
          group?.todoTasksArr.length === 0 ? (
            <h1 className={UIStyles.empty}>Тут нічого немає</h1>
          ) : (
            group?.todoTasksArr.map((el) => (
              <TodoTrashTask
                key={el.id}
                id={el.id}
                title={el.title}
                description={el.description}
                todoBlocksArr={el.todoBlocksArr}
                parentId={el.parentId}
                isChild={true}
              />
            ))
          )
        ) : todoTrashTasksArr.length > 0 ? (
          todoTrashTasksArr.map((el) => (
            <TodoTrashTask
              key={el.id}
              id={el.id}
              title={el.title}
              description={el.description}
              todoBlocksArr={el.todoBlocksArr}
              parentId={el.parentId}
              isChild={false}
            />
          ))
        ) : (
          <h1 className={UIStyles.empty}>Тут нічого немає</h1>
        )}
      </div>
    </div>
  );
};
