import { useDispatch } from "react-redux";
import {
  ITodoGroup,
  removeTrashGroup,
  returnTrashGroup,
} from "../reducers/todoAppReducer";
import { Link } from "react-router-dom";
import UIStyles from "../styles/uiStyles.module.css";
import todoStyles from "../styles/todoStyles.module.css";
import { useState } from "react";

export const TodoTrashGroup: React.FC<ITodoGroup> = (props) => {
  const dispatch = useDispatch();

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  return (
    <div className={todoStyles.todoElement}>
      <div className={todoStyles.todoHeader}>
        <Link
          to={`/trash/group/${props.id}`}
          title={props.title}
          className={todoStyles.title}
        >
          {props.title}
        </Link>
        <div
          className={todoStyles.todoMenuButton}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            setIsShowMenu(!isShowMenu);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              stroke="currentColor"
              stroke-width="2"
              fill="#e4e4e4"
            />

            <circle cx="12" cy="8" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="16" r="1.5" />
          </svg>
        </div>
      </div>
      <div className={todoStyles.todoBody}>
        <p className={todoStyles.description}>{props.description}</p>
      </div>
      <div className={todoStyles.todoFooter}>
        <div className={todoStyles.childCount}>
          Tasks: {props.todoTasksArr.length}
        </div>
      </div>

      {isShowMenu ? (
        <div className={todoStyles.todoHiddenMenus}>
          <button
            className={`${todoStyles.trashBtn} ${todoStyles.menuButton}`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              dispatch(removeTrashGroup(props));
            }}
          >
            <svg
              className={UIStyles.trash}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <g className={UIStyles.lid}>
                <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z" />
              </g>
              <g className={UIStyles.bin}>
                <path d="M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z" />
              </g>
            </svg>
          </button>
          <button
            className={`${todoStyles.menuButton}`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              dispatch(
                returnTrashGroup({
                  id: props.id,
                  title: props.title,
                  description: props.description,
                  todoTasksArr: props.todoTasksArr,
                })
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              >
                <path d="M12.9998 8L6 14L12.9998 21" />
                <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" />
              </g>
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
};
