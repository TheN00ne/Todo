import React from "react";
import { Routes, Route } from "react-router-dom";
import { TrashBlocksPage } from "./trashBlocksPage";
import { TrashTasksPage } from "./trashTasksPage";
import { TrashGroupsPage } from "./trashGroupsPage";
import { TrashPage } from "./trashPage";

export const TrashRouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route index element={<TrashPage />} />
        <Route path="groups" element={<TrashGroupsPage />} />
        <Route path="tasks" element={<TrashTasksPage />} />
        <Route path="blocks" element={<TrashBlocksPage />} />
        <Route path="group/:groupId" element={<TrashTasksPage />} />
        <Route
          path="group/:groupId/task/:taskId"
          element={<TrashBlocksPage />}
        />
        <Route path="tasks/:taskId" element={<TrashBlocksPage />} />
      </Routes>
    </div>
  );
};
