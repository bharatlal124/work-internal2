//Board.jsx
import useTaskStore from "../store/taskStore";
import Column from "./Column";
import { DragDropContext } from "@hello-pangea/dnd";

const Board = () => {
  const columns = useTaskStore((state) => state.columns);
  const moveTask = useTaskStore((state) => state.moveTask);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    moveTask(source, destination, draggableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto">
        {Object.values(columns).map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
