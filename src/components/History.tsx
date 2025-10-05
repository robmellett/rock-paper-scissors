import { useState } from 'react';

// Mock data for history
const mockHistory = [
  {
    id: 1,
    playerGesture: 'rock',
    computerGesture: 'scissors',
    result: 'win',
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: 2,
    playerGesture: 'paper',
    computerGesture: 'rock',
    result: 'win',
    timestamp: new Date(Date.now() - 1000 * 60 * 15)
  },
  {
    id: 3,
    playerGesture: 'scissors',
    computerGesture: 'rock',
    result: 'lose',
    timestamp: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: 4,
    playerGesture: 'rock',
    computerGesture: 'rock',
    result: 'tie',
    timestamp: new Date(Date.now() - 1000 * 60 * 60)
  },
];

const History = () => {
  const [history] = useState(mockHistory);
  
  const getGestureEmoji = (gesture: string) => {
    switch (gesture) {
      case 'rock': return '✊';
      case 'paper': return '✋';
      case 'scissors': return '✌️';
      default: return '?';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'win': return 'bg-green-100 text-green-800';
      case 'lose': return 'bg-red-100 text-red-800';
      case 'tie': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Game History</h2>
      
      {history.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No game history yet. Play a game to see your results here!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((game) => (
            <div 
              key={game.id} 
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">
                  {getGestureEmoji(game.playerGesture)}
                </div>
                <div className="text-lg font-semibold text-gray-700">You</div>
              </div>
              
              <div className="text-gray-400">vs</div>
              
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold text-gray-700">Computer</div>
                <div className="text-3xl">
                  {getGestureEmoji(game.computerGesture)}
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(game.result)}`}>
                {game.result.charAt(0).toUpperCase() + game.result.slice(1)}
              </div>
              
              <div className="text-gray-500 text-sm">
                {formatTime(game.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {history.length > 0 && (
        <div className="mt-6 text-center">
          <button 
            className="text-indigo-600 hover:text-indigo-800 font-medium"
            onClick={() => alert('In a full implementation, this would clear your history')}
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
};

export default History;
