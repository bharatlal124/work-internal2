// taskStore.jsx
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import socket from "../socket";

const useTaskStore = create((set, get) => ({
  columns: {
    "column-1": { id: "column-1", title: "To Do", taskIds: [] },
    "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
    "column-3": { id: "column-3", title: "Done", taskIds: [] },
  },
  tasks: {},

  addTask: (columnId, title) => {
    const id = uuidv4();
    const newTask = {
      id,
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newState = {
      tasks: {
        ...get().tasks,
        [id]: newTask,
      },
      columns: {
        ...get().columns,
        [columnId]: {
          ...get().columns[columnId],
          taskIds: [...get().columns[columnId].taskIds, id],
        },
      },
    };

    set(newState);
    socket.emit("update_board", {
      columns: newState.columns,
      tasks: newState.tasks,
    });
  },

  editTask: (taskId, newTitle) => {
  const tasks = { ...get().tasks };
  if (tasks[taskId]) {
    tasks[taskId] = {
      ...tasks[taskId],
      title: newTitle,
      updatedAt: new Date().toISOString(),
    };

    const newState = {
      tasks,
      columns: get().columns,
    };

    set(newState);
    socket.emit("update_board", newState);
  }
},


  deleteTask: (columnId, taskId) => {
    const newTasks = { ...get().tasks };
    delete newTasks[taskId];

    const newTaskIds = get().columns[columnId].taskIds.filter(
      (id) => id !== taskId
    );

    const newState = {
      tasks: newTasks,
      columns: {
        ...get().columns,
        [columnId]: {
          ...get().columns[columnId],
          taskIds: newTaskIds,
        },
      },
    };

    set(newState);
    socket.emit("update_board", newState);
  },

  moveTask: (source, destination, taskId) => {
    const sourceCol = get().columns[source.droppableId];
    const destCol = get().columns[destination.droppableId];

    const newSourceTaskIds = [...sourceCol.taskIds];
    newSourceTaskIds.splice(source.index, 1);

    const newDestTaskIds = [...destCol.taskIds];
    newDestTaskIds.splice(destination.index, 0, taskId);

    const newState = {
      columns: {
        ...get().columns,
        [sourceCol.id]: { ...sourceCol, taskIds: newSourceTaskIds },
        [destCol.id]: { ...destCol, taskIds: newDestTaskIds },
      },
      tasks: get().tasks,
    };

    set(newState);
    socket.emit("update_board", newState);
  },

  //   ===============================
  // ...
  setBoardState: (state) => set(state),
}));

export default useTaskStore;
