import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import type { Gesture } from "../types";
import {
  determineWinner,
  getComputerGesture,
} from "../utils/gestureRecognition";
import { useGame } from "../context/GameContext";

const Game = () => {
  const { score, addResult } = useGame();
  const [gameState, setGameState] = useState<
    "idle" | "countdown" | "playing" | "result"
  >("idle");
  const [countdown, setCountdown] = useState(3);
  const [playerGesture, setPlayerGesture] = useState<Gesture>(null);
  const [computerGesture, setComputerGesture] = useState<Gesture>(null);
  const [result, setResult] = useState<"win" | "lose" | "tie" | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const startGame = () => {
    setGameState("countdown");
    setCountdown(3);
    setPlayerGesture(null);
    setComputerGesture(null);
    setResult(null);
    setCapturedImage(null);
  };

  useEffect(() => {
    if (gameState === "countdown" && countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (gameState === "countdown" && countdown === 0) {
      // Capture image and determine gestures
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc || null);

        // In a real implementation, we would analyze the image to determine the gesture
        // For now, we'll just randomly select one
        const playerGesture =
          Math.random() > 0.5
            ? Math.random() > 0.5
              ? "rock"
              : "paper"
            : "scissors";
        setPlayerGesture(playerGesture);

        const computerGesture = getComputerGesture();
        setComputerGesture(computerGesture);

        const gameResult = determineWinner(playerGesture, computerGesture);
        setResult(gameResult);

        // Save game result to history
        addResult({
          playerGesture,
          computerGesture,
          result: gameResult,
          timestamp: new Date(),
        });

        setGameState("result");
      }
    }

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
      }
    };
  }, [gameState, countdown, addResult]);

  const resetGame = () => {
    setGameState("idle");
    setCountdown(3);
    setPlayerGesture(null);
    setComputerGesture(null);
    setResult(null);
    setCapturedImage(null);
  };

  const getGestureEmoji = (gesture: Gesture) => {
    switch (gesture) {
      case "rock":
        return "✊";
      case "paper":
        return "✋";
      case "scissors":
        return "✌️";
      default:
        return "?";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Webcam Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Camera</h2>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
            {gameState === "idle" || gameState === "countdown" ? (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "user" }}
                className="w-full h-full object-cover"
              />
            ) : capturedImage ? (
              <img
                src={capturedImage}
                alt="Captured gesture"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-500">No image captured</div>
            )}

            {gameState === "countdown" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-white bg-black bg-opacity-50 rounded-full w-24 h-24 flex items-center justify-center">
                  {countdown}
                </div>
              </div>
            )}
          </div>
          <p className="mt-2 text-gray-600">
            {gameState === "idle"
              ? "Position your hand in view for the game"
              : gameState === "countdown"
              ? "Get ready to show your gesture!"
              : "Your gesture has been captured"}
          </p>
        </div>

        {/* Game Info Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Game Status
            </h2>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>
                  Wins:{" "}
                  <span className="font-bold text-green-600">{score.wins}</span>
                </span>
                <span>
                  Losses:{" "}
                  <span className="font-bold text-red-600">{score.losses}</span>
                </span>
                <span>
                  Ties:{" "}
                  <span className="font-bold text-gray-600">{score.ties}</span>
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-600 h-4 rounded-full"
                  style={{
                    width: `${
                      score.wins + score.losses + score.ties > 0
                        ? (score.wins /
                            (score.wins + score.losses + score.ties)) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-700">Your Gesture</h3>
                  <div className="text-4xl mt-2">
                    {playerGesture ? getGestureEmoji(playerGesture) : "-"}
                  </div>
                </div>
                <div className="text-2xl">
                  {playerGesture ? playerGesture : "Waiting..."}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-700">
                    Computer's Gesture
                  </h3>
                  <div className="text-4xl mt-2">
                    {computerGesture ? getGestureEmoji(computerGesture) : "-"}
                  </div>
                </div>
                <div className="text-2xl">
                  {computerGesture ? computerGesture : "Waiting..."}
                </div>
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="mt-6">
            {gameState === "result" && result && (
              <div
                className={`text-center p-4 rounded-lg ${
                  result === "win"
                    ? "bg-green-100"
                    : result === "lose"
                    ? "bg-red-100"
                    : "bg-gray-100"
                }`}
              >
                <h3 className="text-2xl font-bold">
                  {result === "win"
                    ? "You Win! 🎉"
                    : result === "lose"
                    ? "Computer Wins! 🤖"
                    : "It's a Tie! 🤝"}
                </h3>
                <p className="mt-2">
                  {result === "win"
                    ? "Great job!"
                    : result === "lose"
                    ? "Better luck next time!"
                    : "Good game!"}
                </p>
              </div>
            )}

            {/* Controls */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {gameState === "idle" ? (
                <button
                  onClick={startGame}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-black font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Play Game
                </button>
              ) : gameState === "countdown" ? (
                <button
                  disabled
                  className="flex-1 bg-gray-400 text-white font-bold py-3 px-4 rounded-lg cursor-not-allowed"
                >
                  Get Ready... {countdown}
                </button>
              ) : (
                <button
                  onClick={resetGame}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-black font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Play Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
