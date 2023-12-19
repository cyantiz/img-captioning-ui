import React from "react";

import ChatBox from "./components/Chat/Box";

const App: React.FC = () => {
  return (
    <div className="h-screen p-4">
      <div className="flex h-full rounded-xl border-solid border-[2px] border-gray-400 bg-white p-4 shadow-lg">
        <ChatBox />
      </div>
    </div>
  );
};
export default App;
