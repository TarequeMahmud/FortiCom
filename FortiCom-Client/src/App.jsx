import React from "react";
import SocketProvider from "./context/SocketContext";
import Chat from "./components/Chat";

const App = () => {
  return (
    <SocketProvider>
      <div className="App">
        <Chat />
      </div>
    </SocketProvider>
  );
};

export default App;
