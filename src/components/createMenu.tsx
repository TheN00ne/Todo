import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlock, addGroup, addTask } from "../reducers/todoAppReducer";
import UIStyles from "../styles/uiStyles.module.css";

export interface ICreateMenu {
  targetElementId: number;
  targetElementInerface: "ITodoGroup" | "ITodoTask" | "ITodoBlock";
  isMenuClose?: (arg: boolean) => void;
}

export const CreateMenu: React.FC<ICreateMenu> = (props) => {
  enum Priority {
    low = "low",
    medium = "medium",
    high = "high",
  }

  const [titleField, setTitleField] = useState<string>("");
  const [descriptionField, setDescriptionField] = useState<string>("");
  const [priorityField, setPriorityField] = useState<Priority>(Priority.low);

  const dispatch = useDispatch();

  return (
    <div className={UIStyles.menu}>
      <h2>Create Todo</h2>
      <div className={UIStyles.fields}>
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
            <select
              value={priorityField}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setPriorityField(e.target.value as Priority);
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        ) : null}
      </div>
      <div className={UIStyles.buttons}>
        <button
          className={UIStyles.menuBtn}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            props.isMenuClose?.(false);
          }}
        >
          Cancel
        </button>
        {titleField.length > 0 ? (
          <button
            className={UIStyles.menuBtn}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              let uniqueId = Date.now();
              dispatch(
                props.targetElementInerface === "ITodoGroup"
                  ? addGroup({
                      id: uniqueId,
                      title: titleField,
                      description: descriptionField,
                      todoTasksArr: [],
                    })
                  : props.targetElementInerface === "ITodoTask"
                  ? addTask({
                      id: uniqueId,
                      title: titleField,
                      description: descriptionField,
                      todoBlocksArr: [],
                      parentId: props.targetElementId,
                    })
                  : props.targetElementInerface === "ITodoBlock"
                  ? addBlock({
                      id: uniqueId,
                      title: titleField,
                      description: descriptionField,
                      priority: priorityField,
                      completed: false,
                      parentId: props.targetElementId,
                    })
                  : { type: "NO_ACTION" }
              );
              setTitleField("");
              setDescriptionField("");
              setPriorityField(Priority.low);
            }}
          >
            Create
          </button>
        ) : (
          <button className={UIStyles.blockedMenuBtn}>Create</button>
        )}
      </div>
    </div>
  );
};
