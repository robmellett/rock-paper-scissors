import { createContext, useContext, useState } from "react";
import type { GameContextType, GameResult } from "../types";

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });
  const [history, setHistory] = useState<GameResult[]>([]);

  const addResult = (result: GameResult) => {
    // Add to history
    setHistory((prev) => [result, ...prev]);

    // Update score
    if (result.result === "win") {
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else if (result.result === "lose") {
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
    } else if (result.result === "tie") {
      setScore((prev) => ({ ...prev, ties: prev.ties + 1 }));
    }
  };

  const resetScore = () => {
    setScore({ wins: 0, losses: 0, ties: 0 });
  };

  return (
    <GameContext.Provider value={{ score, history, addResult, resetScore }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
