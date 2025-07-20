import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./mainPage";
import { GroupPage } from "./groupPage";
import { TaskPage } from "./taskPage";
import { TrashGroupsPage } from "./trashGroupsPage";
import { TrashTasksPage } from "./trashTasksPage";
import { TrashBlocksPage } from "./trashBlocksPage";
import { TrashPage } from "./trashPage";
import { Static } from "./static";

export const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Static />}>
            <Route index element={<MainPage />} />
            <Route path="group/:groupId" element={<GroupPage />} />
            <Route path="group/:groupId/task/:taskId" element={<TaskPage />} />
            <Route path="trash" element={<TrashPage />}>
              <Route path="groups" element={<TrashGroupsPage />} />
              <Route path="tasks" element={<TrashTasksPage />} />
              <Route path="blocks" element={<TrashBlocksPage />} />
              <Route path="group/:groupId" element={<TrashTasksPage />} />
              <Route
                path="group/:groupId/task/:taskId"
                element={<TrashBlocksPage />}
              />
              <Route path="tasks/:taskId" element={<TrashBlocksPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
