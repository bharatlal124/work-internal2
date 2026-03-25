//Column.jsx
import { Droppable } from "@hello-pangea/dnd";
import { Draggable } from "@hello-pangea/dnd";
import useTaskStore from "../store/taskStore";
import TaskCard from "./TaskCard";

const Column = ({ column }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);

  return (
    <div className="bg-gray-100 rounded-lg p-4 w-64 shadow shrink-0">
      <h2 className="text-lg font-semibold mb-2">{column.title}</h2>
      <button
        onClick={() => {
          const title = prompt("Enter task title");
          if (title) addTask(column.id, title);
        }}
        className="bg-blue-500 text-white px-2 py-1 rounded mb-2 text-sm"
      >
        + Add Task
      </button>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="flex flex-col gap-2 min-h-[50px]"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.taskIds.map((taskId, index) => (
  <Draggable key={taskId} draggableId={taskId} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <TaskCard taskId={taskId} columnId={column.id} />
      </div>
    )}
  </Draggable>
))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
