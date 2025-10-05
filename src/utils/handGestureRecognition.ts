import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import type { Gesture } from '../types';

let model: handpose.HandPose | null = null;

// Load the handpose model
export const loadHandposeModel = async () => {
  if (!model) {
    await tf.ready();
    model = await handpose.load();
  }
  return model;
};

// Function to determine gesture based on finger positions
export const recognizeHandGesture = (landmarks: number[][]) => {
  // Extract key points
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];
  
  const thumbBase = landmarks[2];
  const indexBase = landmarks[5];
  const middleBase = landmarks[9];
  const ringBase = landmarks[13];
  const pinkyBase = landmarks[17];
  
  // Calculate distances between tips and base
  const thumbExtended = getDistance(thumbTip, thumbBase) > getDistance(landmarks[3], thumbBase) * 1.2;
  const indexExtended = getDistance(indexTip, indexBase) > getDistance(landmarks[7], indexBase) * 1.2;
  const middleExtended = getDistance(middleTip, middleBase) > getDistance(landmarks[11], middleBase) * 1.2;
  const ringExtended = getDistance(ringTip, ringBase) > getDistance(landmarks[15], ringBase) * 1.2;
  const pinkyExtended = getDistance(pinkyTip, pinkyBase) > getDistance(landmarks[19], pinkyBase) * 1.2;
  
  // Determine gesture based on which fingers are extended
  if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
    return 'scissors';
  } else if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended && thumbExtended) {
    return 'rock';
  } else if (indexExtended && middleExtended && ringExtended && pinkyExtended) {
    return 'paper';
  }
  
  return null;
};

// Helper function to calculate distance between two points
const getDistance = (point1: number[], point2: number[]) => {
  return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
};

// Function to detect hand gestures from video
export const detectHandGesture = async (video: HTMLVideoElement): Promise<Gesture> => {
  if (!model) {
    await loadHandposeModel();
  }
  
  if (!model) {
    throw new Error('Handpose model not loaded');
  }
  
  // Detect hands in the video
  const predictions = await model.estimateHands(video, true);
  
  if (predictions.length > 0) {
    // Use the first detected hand
    const landmarks = predictions[0].landmarks;
    return recognizeHandGesture(landmarks);
  }
  
  return null;
};
