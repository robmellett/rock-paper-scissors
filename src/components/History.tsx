import { useGame } from '../context/GameContext';

const History = () => {
  const { history } = useGame();
  
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
          {history.map((game, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">
                  {getGestureEmoji(game.playerGesture || '')}
                </div>
                <div className="text-lg font-semibold text-gray-700">You</div>
              </div>
              
              <div className="text-gray-400">vs</div>
              
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold text-gray-700">Computer</div>
                <div className="text-3xl">
                  {getGestureEmoji(game.computerGesture || '')}
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(game.result || 'tie')}`}>
                {game.result ? game.result.charAt(0).toUpperCase() + game.result.slice(1) : 'Unknown'}
              </div>
              
              <div className="text-gray-500 text-sm">
                {formatTime(game.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
