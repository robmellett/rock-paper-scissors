import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import History from "./components/History";

function App() {
  const [activeTab, setActiveTab] = useState<"game" | "history">("game");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">
            Rock Paper Scissors
          </h1>
          <p className="text-lg text-indigo-600">
            Play against the computer using hand gestures!
          </p>
        </header>

        <nav className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 flex">
            <button
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === "game"
                  ? "bg-indigo-600 text-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("game")}
            >
              Game
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === "history"
                  ? "bg-indigo-600 text-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
          </div>
        </nav>

        <main>{activeTab === "game" ? <Game /> : <History />}</main>

        <footer className="text-center py-8 text-gray-600">
          <p>Made with React, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
