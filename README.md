# Rock Paper Scissors Game

A vibe coded app using [Goose](https://block.github.io/goose/) and the [Qwen 3](qwen/qwen3-coder) model. 

You can find the original prompt [here](prompt.md), and you can find the tailored [.goosehints](.goosehints) to assit the model.

---

A modern web-based Rock Paper Scissors game built with React 19, TypeScript, and Tailwind CSS featuring webcam gesture recognition.

## Features

- Play Rock Paper Scissors against the computer
- Webcam-based gesture recognition (simulated in this implementation)
- 3-second countdown before capturing your gesture
- Game history tracking with emojis for gestures
- Responsive design that works on all devices
- Real-time score tracking

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Webcam Integration**: react-webcam
- **Gesture Recognition**: Simulated (would use TensorFlow.js or MediaPipe in production)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd rock-paper-scissors
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## How to Play

1. Click the "Play Game" button to start
2. Position your hand in view of your webcam
3. When the countdown begins, show one of the following gestures:
   - **Rock**: Make a fist (✊)
   - **Paper**: Open your hand flat (✋)
   - **Scissors**: Extend your index and middle fingers (✌️)
4. The computer will randomly select its gesture
5. The winner will be determined by the classic rules:
   - Rock beats Scissors
   - Paper beats Rock
   - Scissors beats Paper
6. View your game history in the History tab

## Project Structure

```
src/
├── components/
│   ├── Game.tsx          # Main game component
│   └── History.tsx       # Game history component
├── types/
│   └── index.ts          # Type definitions
├── utils/
│   └── gestureRecognition.ts # Gesture recognition logic
├── App.tsx               # Main App component
├── App.css               # Additional styling
└── main.tsx              # Entry point
```

## Implementation Notes

This implementation includes a simulated gesture recognition system. In a production environment, you would integrate with a real computer vision library such as:

- **TensorFlow.js** with a pre-trained hand gesture model
- **MediaPipe Hands** solution
- **ML5.js** with a custom trained model

The webcam integration is functional and captures images during gameplay, but the gesture recognition is currently randomized for demonstration purposes.

## Future Enhancements

- Integrate with TensorFlow.js or MediaPipe for real gesture recognition
- Add multiplayer functionality
- Implement different difficulty levels
- Add sound effects and animations
- Include statistics and analytics
- Add user profiles and authentication

## License

This project is licensed under the MIT License.
