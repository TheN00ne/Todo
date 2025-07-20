import { useDispatch } from "react-redux";
import { ITodoTask, removeTask } from "../reducers/todoAppReducer";
import { useState } from "react";
import { ChangeMenu } from "./changeMenu";
import { Link } from "react-router-dom";
import UIStyles from "../styles/uiStyles.module.css";
import todoStyle from "../styles/todoStyles.module.css";

export const TodoTask: React.FC<ITodoTask> = (props) => {
  const dispatch = useDispatch();

  const [isShowChangeMenu, setIsShowChangeMenu] = useState<boolean>(false);
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  return (
    <div className={todoStyle.todoElement}>
      <div className={todoStyle.todoHeader}>
        <Link
          to={`/group/${props.parentId}/task/${props.id}`}
          title={props.title}
          className={todoStyle.title}
        >
          {props.title}
        </Link>

        <div
          className={todoStyle.todoMenuButton}
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
      <div className={todoStyle.todoBody}>
        <p className={todoStyle.description}>{props.description}</p>
      </div>
      <div className={todoStyle.todoFooter}>
        <div className={todoStyle.childCount}>
          Blocks: {props.todoBlocksArr.length}
        </div>
      </div>
      {isShowMenu ? (
        <div className={todoStyle.todoHiddenMenus}>
          <button
            className={`${todoStyle.trashBtn} ${todoStyle.menuButton}`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              dispatch(removeTask(props));
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
            className={`${todoStyle.menuButton}`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setIsShowChangeMenu(true);
            }}
          >
            <svg
              className={UIStyles.paint}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
                <path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1-5 5h-5v2m-2 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
              </g>
            </svg>
          </button>
          {isShowChangeMenu ? (
            <ChangeMenu
              targetElementId={props.id}
              targetElementInterface="ITodoTask"
              isMenuClose={setIsShowChangeMenu}
              title={props.title}
              description={props.description}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
