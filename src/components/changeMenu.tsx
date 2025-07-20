//ЗРОБИ ТАК, ЩОБ В ПОЛЯХ БУЛИ ЗНАЧЕННЯ ПОТОЧНІ ЕЛЕМЕНТІВ TITLE. DESCRIPTION ТА PRIORITY

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeBlock,
  changeGroup,
  changeTask,
} from "../reducers/todoAppReducer";
import UIStyles from "../styles/uiStyles.module.css";

interface IChangeMenu {
  targetElementId: number;
  targetElementInterface: "ITodoGroup" | "ITodoTask" | "ITodoBlock";
  isMenuClose?: (arg: boolean) => void;
  title: string;
  description: string;
  priority?: "low" | "medium" | "high";
}

export const ChangeMenu: React.FC<IChangeMenu> = (props) => {
  const dispatch = useDispatch();

  enum Priority {
    low = "low",
    medium = "medium",
    high = "high",
  }

  const [titleField, setTitleField] = useState<string>(props.title);
  const [descriptionField, setDescriptionField] = useState<string>(
    props.description
  );
  const [priorityField, setPriorityField] = useState<"low" | "medium" | "high">(
    props.priority !== undefined ? props.priority : "low"
  );

  return (
    <div className={UIStyles.menu}>
      <h2>Change Menu</h2>

      <div className={UIStyles.fields}>
        <input
          placeholder="Title"
          type="text"
          value={titleField}
          onInput={(e: React.KeyboardEvent<HTMLInputElement>) => {
            setTitleField(e.currentTarget.value);
          }}
        />
        <input
          placeholder="Description"
          type="text"
          value={descriptionField}
          onInput={(e: React.KeyboardEvent<HTMLInputElement>) => {
            setDescriptionField(e.currentTarget.value);
          }}
        />
        {props.targetElementInterface === "ITodoBlock" ? (
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
              if (props.targetElementInterface === "ITodoBlock") {
                dispatch(
                  changeBlock({
                    id: props.targetElementId,
                    title: titleField,
                    description: descriptionField,
                    priority: priorityField,
                  })
                );
              }
              if (props.targetElementInterface === "ITodoTask") {
                dispatch(
                  changeTask({
                    id: props.targetElementId,
                    title: titleField,
                    description: descriptionField,
                  })
                );
              }
              if (props.targetElementInterface === "ITodoGroup") {
                dispatch(
                  changeGroup({
                    id: props.targetElementId,
                    title: titleField,
                    description: descriptionField,
                  })
                );
              }
            }}
          >
            Change
          </button>
        ) : (
          <button className={UIStyles.blockedMenuBtn}>Change</button>
        )}
      </div>
    </div>
  );
};
