import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import UIStyles from "../styles/uiStyles.module.css";

export const TrashPage: React.FC = () => {
  return (
    <div>
      <h1 className={UIStyles.pageTitle}>Trash</h1>

      <nav className={UIStyles.navMenu}>
        <NavLink
          className={({ isActive }) => (isActive ? `${UIStyles.active}` : ``)}
          to="groups"
        >
          Groups
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${UIStyles.active}` : ``)}
          to="tasks"
        >
          Tasks
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${UIStyles.active}` : ``)}
          to="blocks"
        >
          Blocks
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};
