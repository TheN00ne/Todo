import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITodoGroup {
  id: number;
  title: string;
  description: string;
  todoTasksArr: ITodoTask[];
}

export interface ITodoTask {
  id: number;
  title: string;
  description: string;
  todoBlocksArr: ITodoBlock[];
  parentId: number;
}

export interface ITodoBlock {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  parentId: number;
}

export interface ITodoTrashTask {
  id: number;
  title: string;
  description: string;
  todoBlocksArr: ITodoBlock[];
  parentId: number;
  isChild: boolean;
}

export interface ITodoTrashBlock {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  parentId: number;
  completed: boolean;
  isChild: boolean;
}

interface ITodoApp {
  groups: ITodoGroup[];
  tasks: ITodoTask[];
  blocks: ITodoBlock[];
  trashGroups: ITodoGroup[];
  trashTasks: ITodoTrashTask[];
  trashBlocks: ITodoTrashBlock[];
}

const initialState: ITodoApp = {
  groups: [],
  tasks: [],
  blocks: [],
  trashGroups: [],
  trashTasks: [],
  trashBlocks: [],
};

const todoAppSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<ITodoGroup>) => {
      state.groups.push(action.payload);
    },

    removeGroupe: (state, action: PayloadAction<ITodoGroup>) => {
      const childTasks = state.tasks.filter(
        (el) => el.parentId === action.payload.id
      );

      childTasks.forEach((task) => {
        state.blocks = state.blocks.filter(
          (block) => block.parentId !== task.id
        );
      });

      state.tasks = state.tasks.filter(
        (el) => el.parentId !== action.payload.id
      );

      state.groups = state.groups.filter((el) => el.id !== action.payload.id);
      state.trashGroups.push(action.payload);
    },

    addTask: (state, action: PayloadAction<ITodoTask>) => {
      const group = state.groups.find(
        (el) => el.id === action.payload.parentId
      );
      if (group) {
        state.tasks.push(action.payload);
        group.todoTasksArr.push(action.payload);
      }
    },

    removeTask: (state, action: PayloadAction<ITodoTask>) => {
      const parentGroup = state.groups.find(
        (el) => el.id === action.payload.parentId
      );
      if (parentGroup) {
        parentGroup.todoTasksArr = parentGroup.todoTasksArr.filter(
          (el) => el.id !== action.payload.id
        );

        state.blocks = state.blocks.filter(
          (el) => el.parentId !== action.payload.id
        );

        state.tasks = state.tasks.filter((el) => el.id !== action.payload.id);
        state.trashTasks.push({ ...action.payload, isChild: false });
      }
    },

    addBlock: (state, action: PayloadAction<ITodoBlock>) => {
      const parentTaskIndex = state.tasks.findIndex(
        (el) => el.id === action.payload.parentId
      );

      const parentGroupIndex = state.groups.findIndex(
        (el) => el.id === state.tasks[parentTaskIndex].parentId
      );

      const parentTaskIndexInGroup = state.groups[
        parentGroupIndex
      ].todoTasksArr.findIndex((el) => el.id === action.payload.parentId);

      if (
        parentGroupIndex !== -1 &&
        parentTaskIndex !== -1 &&
        parentTaskIndexInGroup !== -1
      ) {
        state.blocks.push(action.payload);

        state.tasks[parentTaskIndex].todoBlocksArr.push(action.payload);

        state.groups[parentGroupIndex].todoTasksArr[
          parentTaskIndexInGroup
        ].todoBlocksArr.push(action.payload);
      }
    },

    removeBlock: (state, action: PayloadAction<ITodoBlock>) => {
      const parentTaskIndex = state.tasks.findIndex(
        (el) => el.id === action.payload.parentId
      );

      const parentGroupIndex = state.groups.findIndex(
        (el) => el.id === state.tasks[parentTaskIndex].parentId
      );

      const parentTaskIndexInGroup = state.groups[
        parentGroupIndex
      ].todoTasksArr.findIndex((el) => el.id === action.payload.parentId);

      if (
        parentTaskIndex !== -1 &&
        parentGroupIndex !== -1 &&
        parentTaskIndexInGroup !== -1
      ) {
        state.blocks = state.blocks.filter((el) => el.id !== action.payload.id);
        state.trashBlocks.push({ ...action.payload, isChild: false });

        state.tasks[parentTaskIndex].todoBlocksArr = state.tasks[
          parentTaskIndex
        ].todoBlocksArr.filter((el) => el.id !== action.payload.id);

        state.groups[parentGroupIndex].todoTasksArr[
          parentTaskIndexInGroup
        ].todoBlocksArr = state.groups[parentGroupIndex].todoTasksArr[
          parentTaskIndexInGroup
        ].todoBlocksArr.filter((el) => el.id !== action.payload.id);
      }
    },

    toggleBlock: (state, action: PayloadAction<ITodoBlock>) => {
      const parentTaskIndex = state.tasks.findIndex(
        (el) => el.id === action.payload.parentId
      );

      const parentGroupIndex = state.groups.findIndex(
        (el) => el.id === state.tasks[parentTaskIndex].parentId
      );

      const parentTaskIndexInGroup = state.groups[
        parentGroupIndex
      ].todoTasksArr.findIndex((el) => el.id === action.payload.parentId);

      const blockIndex = state.blocks.findIndex(
        (el) => el.id === action.payload.id
      );

      const blockIndexInTask = state.tasks[
        parentTaskIndex
      ].todoBlocksArr.findIndex((el) => el.id === action.payload.id);

      const blockIndexInGroup = state.groups[parentGroupIndex].todoTasksArr[
        parentTaskIndexInGroup
      ].todoBlocksArr.findIndex((el) => el.id === action.payload.id);

      if (
        parentTaskIndex !== -1 &&
        parentGroupIndex !== -1 &&
        parentTaskIndexInGroup !== -1 &&
        blockIndex !== -1 &&
        blockIndexInTask !== -1 &&
        blockIndexInGroup !== -1
      ) {
        state.blocks[blockIndex].completed =
          !state.blocks[blockIndex].completed;

        state.tasks[parentTaskIndex].todoBlocksArr[blockIndexInTask].completed =
          !state.tasks[parentTaskIndex].todoBlocksArr[blockIndexInTask]
            .completed;

        state.groups[parentGroupIndex].todoTasksArr[
          parentTaskIndexInGroup
        ].todoBlocksArr[blockIndexInGroup].completed =
          !state.groups[parentGroupIndex].todoTasksArr[parentTaskIndexInGroup]
            .todoBlocksArr[blockIndexInGroup].completed;
      }
    },

    changeGroup: (
      state,
      action: PayloadAction<{ id: number; title: string; description: string }>
    ) => {
      const groupIndex = state.groups.findIndex(
        (el) => el.id === action.payload.id
      );

      if (groupIndex !== -1) {
        state.groups[groupIndex] = {
          ...state.groups[groupIndex],
          ...action.payload,
        };
      }
    },

    changeTask: (
      state,
      action: PayloadAction<{ id: number; title: string; description: string }>
    ) => {
      const taskIndex = state.tasks.findIndex(
        (el) => el.id === action.payload.id
      );

      const parentGroupIndex = state.groups.findIndex(
        (el) => el.id === state.tasks[taskIndex].parentId
      );

      const taskInGroupIndex = state.groups[
        parentGroupIndex
      ].todoTasksArr.findIndex((el) => el.id === action.payload.id);

      if (taskIndex !== -1 && parentGroupIndex !== -1) {
        const newTask = {
          ...state.tasks[taskIndex],
          ...action.payload,
        };

        state.tasks[taskIndex] = newTask;
        state.groups[parentGroupIndex].todoTasksArr[taskInGroupIndex] = newTask;
      }
    },

    changeBlock: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        description: string;
        priority: "low" | "medium" | "high";
      }>
    ) => {
      const blockIndex = state.blocks.findIndex(
        (el) => el.id === action.payload.id
      );

      const parentTaskIndex = state.tasks.findIndex(
        (el) => el.id === state.blocks[blockIndex].parentId
      );

      const parentGroupIndex = state.groups.findIndex(
        (el) => el.id === state.tasks[parentTaskIndex].parentId
      );

      const parentTaskInGroupIndex = state.groups[
        parentGroupIndex
      ].todoTasksArr.findIndex(
        (el) => el.id === state.blocks[blockIndex].parentId
      );

      const blockInTaskIndex = state.tasks[
        parentTaskIndex
      ].todoBlocksArr.findIndex((el) => el.id == action.payload.id);

      const blockInGroupIndex = state.groups[parentGroupIndex].todoTasksArr[
        parentTaskInGroupIndex
      ].todoBlocksArr.findIndex((el) => el.id === action.payload.id);

      if (
        blockIndex !== -1 &&
        parentTaskIndex !== -1 &&
        parentGroupIndex !== -1
      ) {
        const newBlock = {
          ...state.blocks[blockIndex],
          ...action.payload,
        };

        state.blocks[blockIndex] = newBlock;

        state.tasks[parentTaskIndex].todoBlocksArr[blockInTaskIndex] = newBlock;

        state.groups[parentGroupIndex].todoTasksArr[
          parentTaskInGroupIndex
        ].todoBlocksArr[blockInGroupIndex] = newBlock;
      }
    },

    removeTrashGroup: (state, action: PayloadAction<ITodoGroup>) => {
      state.trashGroups = state.trashGroups.filter(
        (el) => el.id !== action.payload.id
      );

      const parentTasks = state.trashTasks.filter(
        (el) => el.parentId === action.payload.id
      );

      state.trashBlocks = state.trashBlocks.filter((el) => {
        parentTasks.filter((task) => {
          if (el.parentId === task.id) {
            return false;
          }
        });
      });

      state.trashTasks = state.trashTasks.filter(
        (el) => el.parentId !== action.payload.id
      );
    },

    removeTrashTask: (state, action: PayloadAction<ITodoTrashTask>) => {
      state.trashTasks = state.trashTasks.filter(
        (el) => el.id !== action.payload.id
      );
      state.trashBlocks = state.trashBlocks.filter(
        (el) => el.parentId !== action.payload.id
      );
    },

    removeTrashBlock: (state, action: PayloadAction<ITodoTrashBlock>) => {
      state.trashBlocks = state.trashBlocks.filter(
        (el) => el.id !== action.payload.id
      );
    },

    returnTrashBlock: (state, action: PayloadAction<ITodoBlock>) => {
      const parentTaskIndex = state.tasks.findIndex(
        (el) => el.id == action.payload.parentId
      );

      const parentGroupIndex = state.groups.findIndex(
        (el) => el.id == state.tasks[parentTaskIndex].parentId
      );

      const parentTaskInGroupIndex = state.groups[
        parentGroupIndex
      ].todoTasksArr.findIndex((el) => el.id === action.payload.parentId);

      if (
        parentTaskIndex !== -1 &&
        parentGroupIndex !== -1 &&
        parentTaskInGroupIndex !== -1
      ) {
        state.blocks.push(action.payload);

        state.tasks[parentTaskIndex].todoBlocksArr.push(action.payload);

        state.groups[parentGroupIndex].todoTasksArr[
          parentTaskInGroupIndex
        ].todoBlocksArr.push(action.payload);

        state.trashBlocks = state.trashBlocks.filter(
          (el) => el.id !== action.payload.id
        );
      }
    },

    returnTrashTask: (state, action: PayloadAction<ITodoTask>) => {
      const parentGroupIndex = state.groups.findIndex(
        (el) => el.id == action.payload.parentId
      );

      if (parentGroupIndex !== -1) {
        state.tasks.push(action.payload);
        state.groups[parentGroupIndex].todoTasksArr.push(action.payload);

        state.blocks = [...state.blocks, ...action.payload.todoBlocksArr];

        state.trashTasks = state.trashTasks.filter(
          (el) => el.id !== action.payload.id
        );
      }
    },

    returnTrashGroup: (state, action: PayloadAction<ITodoGroup>) => {
      state.groups.push(action.payload);

      state.tasks = [...state.tasks, ...action.payload.todoTasksArr];

      const blocks: ITodoBlock[] = [];

      action.payload.todoTasksArr.forEach((task) => {
        task.todoBlocksArr.forEach((el) => {
          blocks.push(el);
        });
      });

      state.blocks = [...state.blocks, ...blocks];

      state.trashGroups = state.trashGroups.filter(
        (el) => el.id !== action.payload.id
      );
    },
  },
});

export default todoAppSlice.reducer;
export const {
  addGroup,
  removeGroupe,
  addTask,
  removeTask,
  addBlock,
  removeBlock,
  toggleBlock,
  changeGroup,
  changeTask,
  changeBlock,
  removeTrashGroup,
  removeTrashTask,
  removeTrashBlock,
  returnTrashBlock,
  returnTrashTask,
  returnTrashGroup,
} = todoAppSlice.actions;
