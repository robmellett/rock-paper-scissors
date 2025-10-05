// Mock gesture recognition utility
// In a real implementation, this would use a library like TensorFlow.js or MediaPipe Hands

export type Gesture = 'rock' | 'paper' | 'scissors' | null;

const gestureLabels: Record<number, Gesture> = {
  0: 'rock',
  1: 'paper',
  2: 'scissors',
};

export const recognizeGesture = (_imageData: ImageData): Gesture => {
  // This is a mock implementation that randomly selects a gesture
  // A real implementation would analyze the imageData to detect hand gestures
  const gestureKeys = Object.keys(gestureLabels).map(Number);
  const randomKey = gestureKeys[Math.floor(Math.random() * gestureKeys.length)];
  return gestureLabels[randomKey];
};

export const getComputerGesture = (): Gesture => {
  const gestures: Gesture[] = ['rock', 'paper', 'scissors'];
  return gestures[Math.floor(Math.random() * gestures.length)] || null;
};

export const determineWinner = (player: Gesture, computer: Gesture): 'win' | 'lose' | 'tie' | null => {
  if (!player || !computer) return null;
  
  if (player === computer) return 'tie';
  
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'win';
  }
  
  return 'lose';
};
