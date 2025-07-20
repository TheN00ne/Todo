import { useSelector } from "react-redux";
import { rootState } from "..";
import { TodoTrashGroup } from "./todoTrashGroup";
import UIStyles from "../styles/uiStyles.module.css";

export const TrashGroupsPage: React.FC = () => {
  const todoTrashGroupsArr = useSelector(
    (state: rootState) => state.todoAppSlice.trashGroups
  );

  return (
    <div>
      {todoTrashGroupsArr.length > 0 ? (
        <div className={UIStyles.todoGrid}>
          {todoTrashGroupsArr.map((el) => (
            <TodoTrashGroup
              key={el.id}
              id={el.id}
              title={el.title}
              description={el.description}
              todoTasksArr={el.todoTasksArr}
            />
          ))}
        </div>
      ) : (
        <h1 className={UIStyles.empty}>Тут нічого немає</h1>
      )}
    </div>
  );
};
