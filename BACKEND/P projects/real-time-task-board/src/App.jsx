// App.jsx
import './App.css'

import { useEffect, useState } from "react";
import socket from "./socket";
import useTaskStore from "./store/taskStore";
import Board from "./components/Board";

function App() {
  const setBoardState = useTaskStore((state) => state.setBoardState);
  const [onlineUsers, setOnlineUsers] = useState(0);  

  useEffect(() => {
    socket.on("board_state", (state) => {
      setBoardState(state);
    });

    socket.on("online_users", (count) => {
      setOnlineUsers(count);
    });

    return () => {
      socket.off("board_state");
      socket.off("online_users");
    };
  }, [setBoardState]);

  return (
    <div className="p-4">
      <div className="text-sm text-gray-600 mb-2">
        👥 <strong>{onlineUsers}</strong> user{onlineUsers !== 1 && "s"} online
      </div>
      <Board />
    </div>
  );
}

export default App;
