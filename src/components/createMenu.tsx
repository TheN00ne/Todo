import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGroup } from "../reducers/todoAppReducer";
import { addTasks, ITodoGroup } from "../reducers/todoGroupReducer";
import { addTodo, ITodoTask } from "../reducers/todoTaskReducer";
import { useSelector } from "react-redux";
import { rootState } from "..";

export interface ICreateMenu {
  targerElementId: number;
  targetElementInerface: "ITodoGroup" | "ITodoTask" | "ITodoBlock";
  isMenuClose?: (arg: boolean) => void;
}

export const CreateMenu: React.FC<ICreateMenu> = (props) => {
  const [titleField, setTitleField] = useState<string>("");
  const [descriptionField, setDescriptionField] = useState<string>("");
  const [priorityField, setPriorityField] = useState<"low" | "medium" | "high">(
    "low"
  );

  const parentGroup = useSelector((state: rootState) => {
    return state.todoAppSlice.todoGroupsArr.find(
      (el) => el.id == props.targerElementId
    );
  });

  const parentTask = useSelector((state: rootState) => {
    return state.todoGroupSlice.todoTasksArr.find(
      (el) => el.id == props.targerElementId
    );
  });

  const dispatch = useDispatch();

  return (
    <div>
      <h2>Create Todo</h2>
      <input
        placeholder="Enter title"
        value={titleField}
        type="text"
        onInput={(e: React.KeyboardEvent<HTMLInputElement>) => {
          setTitleField(e.currentTarget.value);
        }}
      />
      <input
        placeholder="Enter description"
        value={descriptionField}
        type="text"
        onInput={(e: React.KeyboardEvent<HTMLInputElement>) => {
          setDescriptionField(e.currentTarget.value);
        }}
      />
      {props.targetElementInerface === "ITodoBlock" ? (
        <label>
          Choose priority
          <select>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      ) : null}
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          props.isMenuClose?.(false);
        }}
      >
        Cancel
      </button>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          let uniqueId = Date.now();
          dispatch(
            props.targetElementInerface == "ITodoGroup"
              ? addGroup({
                  id: uniqueId,
                  title: titleField,
                  description: descriptionField,
                  todoTasksArr: [],
                })
              : props.targetElementInerface == "ITodoTask"
              ? addTasks({
                  id: uniqueId,
                  title: titleField,
                  description: descriptionField,
                  todoBlocksArr: [],
                })
              : props.targetElementInerface == "ITodoBlock"
              ? addTodo({
                  id: uniqueId,
                  title: titleField,
                  description: descriptionField,
                  priority: priorityField,
                })
              : { type: "NO_ACTION" }
          );
          console.log(parentGroup);
          switch (props.targetElementInerface) {
            case "ITodoTask":
              if (parentGroup !== undefined) {
                parentGroup.todoTasksArr = [
                  ...parentGroup.todoTasksArr,
                  {
                    id: uniqueId,
                    title: titleField,
                    description: descriptionField,
                    todoBlocksArr: [],
                  },
                ];
              }
              break;
            case "ITodoBlock":
              if (parentTask !== undefined) {
                parentTask.todoBlocksArr.push({
                  id: uniqueId,
                  title: titleField,
                  description: descriptionField,
                  priority: priorityField,
                });
              }
              break;
          }
          setTitleField("");
          setDescriptionField("");
          setPriorityField("low");
        }}
      >
        Create
      </button>
    </div>
  );
};
