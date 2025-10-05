import { Hands, type Results } from "@mediapipe/hands";
import type { Gesture } from "../types";

let hands: Hands | null = null;
let isModelLoading = false;
let isModelLoaded = false;

// Load the MediaPipe Hands model
export const loadHandposeModel = async () => {
  if (isModelLoaded) {
    return;
  }

  if (isModelLoading) {
    // Wait for the model to finish loading
    while (isModelLoading) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return;
  }

  isModelLoading = true;

  try {
    hands = new Hands({
      locateFile: (file) => {
        // Use npm-installed package instead of jsDelivr CDN
        return `../node_modules/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    // We don't need to set up onResults here since we'll handle results in detectHandGesture
    isModelLoaded = true;
  } catch (error) {
    console.error("Error loading MediaPipe Hands model:", error);
    throw error;
  } finally {
    isModelLoading = false;
  }

  return hands;
};

// Function to determine gesture based on finger positions
export const recognizeHandGesture = (results: Results): Gesture => {
  if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
    return null;
  }

  // Get landmarks for the first detected hand
  const landmarks = results.multiHandLandmarks[0];

  // Extract key points
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];

  const indexBase = landmarks[5];
  const middleBase = landmarks[9];
  const ringBase = landmarks[13];
  const pinkyBase = landmarks[17];
  const wrist = landmarks[0];

  // Calculate distances between tips and base
  const indexExtended =
    getDistance(indexTip, wrist) > getDistance(indexBase, wrist);
  const middleExtended =
    getDistance(middleTip, wrist) > getDistance(middleBase, wrist);
  const ringExtended =
    getDistance(ringTip, wrist) > getDistance(ringBase, wrist);
  const pinkyExtended =
    getDistance(pinkyTip, wrist) > getDistance(pinkyBase, wrist);

  // Determine gesture based on which fingers are extended
  if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
    return "scissors";
  } else if (
    !indexExtended &&
    !middleExtended &&
    !ringExtended &&
    !pinkyExtended
  ) {
    return "rock";
  } else if (indexExtended && middleExtended && ringExtended && pinkyExtended) {
    return "paper";
  }

  return null;
};

// Helper function to calculate distance between two points
const getDistance = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
) => {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  );
};

// Function to detect hand gestures from video
export const detectHandGesture = async (
  video: HTMLVideoElement
): Promise<Gesture> => {
  if (!isModelLoaded) {
    await loadHandposeModel();
  }

  if (!hands) {
    throw new Error("MediaPipe Hands model not loaded");
  }

  return new Promise((resolve) => {
    // Set up a temporary listener for results
    const onResultsCallback = (results: Results) => {
      const gesture = recognizeHandGesture(results);
      resolve(gesture);

      // Remove the temporary listener
      hands!.onResults(() => {});
    };

    // Set the temporary listener
    if (hands) {
      hands.onResults(onResultsCallback);

      // Process the current video frame
      hands.send({ image: video }).catch((error) => {
        console.error("Error processing video frame:", error);
        resolve(null);
      });
    } else {
      console.error("MediaPipe Hands model not loaded");
      resolve(null);
    }
  });
};
