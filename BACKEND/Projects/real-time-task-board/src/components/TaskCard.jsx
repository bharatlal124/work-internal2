// TaskCard.jsx
import { useState } from "react";
import useTaskStore from "../store/taskStore";

const TaskCard = ({ taskId, columnId }) => {
  const task = useTaskStore((state) => state.tasks[taskId]);
  const editTask = useTaskStore((state) => state.editTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task?.title || "");

  if (!task) return null;

  return (
    <div className="bg-white border p-3 rounded shadow mb-2">
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-1 w-full"
        />
      ) : (
        <p>{task.title}</p>
      )}

      <div className="flex justify-end mt-2 gap-2 text-sm">
        <button
          onClick={() => {
            if (isEditing) editTask(taskId, title);
            setIsEditing(!isEditing);
          }}
          className="px-2 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <button
          onClick={() => deleteTask(columnId, taskId)}
          className="px-2 py-1 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
