export type Gesture = 'rock' | 'paper' | 'scissors' | null;

export interface GameResult {
  playerGesture: Gesture;
  computerGesture: Gesture;
  result: 'win' | 'lose' | 'tie' | null;
  timestamp: Date;
}

export interface GameContextType {
  score: {
    wins: number;
    losses: number;
    ties: number;
  };
  history: GameResult[];
  addResult: (result: GameResult) => void;
  resetScore: () => void;
}
