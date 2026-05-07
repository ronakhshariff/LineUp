'use client';

import { useState, useEffect } from 'react';
import { Player } from '@/types';
import { Search, Plus, X, User } from 'lucide-react';

interface PlayerSelectorProps {
  onSelect: (player: Player) => void;
  onClose: () => void;
  existingPlayers: Player[];
}

const defaultPlayers: Player[] = [
  { id: '1', name: 'Omar' },
  { id: '2', name: 'Shea' },
  { id: '3', name: 'Ewan' },
  { id: '4', name: 'Demetri' },
  { id: '5', name: 'Logan' },
  { id: '6', name: 'Jaisumer' },
  { id: '7', name: 'Praveen' },
  { id: '8', name: 'Kacper' },
  { id: '9', name: 'Melo' },
  { id: '10', name: 'Malhar' },
  { id: '11', name: 'Kevin' },
  { id: '12', name: 'Kyle' },
  { id: '13', name: 'Haidr' },
  { id: '14', name: 'Kiano' },
  { id: '15', name: 'Karan' },
  { id: '16', name: 'Firdause' },
  { id: '17', name: 'Ronakh' },
  { id: '18', name: 'Tamim' },
  { id: '19', name: 'Zach' },
  { id: '20', name: 'Aidan' },
  { id: '21', name: 'Easton' },
  { id: '22', name: 'Samim' },
  { id: '23', name: 'Ray' },
  { id: '24', name: 'Brad' },
];

const PlayerSelector: React.FC<PlayerSelectorProps> = ({
  onSelect,
  onClose,
  existingPlayers,
}) => {
  const [search, setSearch] = useState('');
  const [players, setPlayers] = useState<Player[]>(defaultPlayers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerNumber, setNewPlayerNumber] = useState('');

  const filteredPlayers = players.filter(
    (player) =>
      !existingPlayers.some((p) => p.id === player.id) &&
      player.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        number: newPlayerNumber ? parseInt(newPlayerNumber) : undefined,
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
      setNewPlayerNumber('');
      setShowAddForm(false);
      onSelect(newPlayer);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-lg max-h-[85vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Select Player</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search players..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </div>
        
        {/* Players List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {filteredPlayers.length === 0 ? (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No players found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredPlayers.map((player) => (
                <button
                  key={player.id}
                  onClick={() => onSelect(player)}
                  className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <User className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">{player.name}</div>
                      {player.number && (
                        <div className="text-sm text-gray-500">#{player.number}</div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Add Player Section */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Player</span>
            </button>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Player name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                autoFocus
              />
              <input
                type="number"
                placeholder="Jersey number (optional)"
                value={newPlayerNumber}
                onChange={(e) => setNewPlayerNumber(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleAddPlayer}
                  disabled={!newPlayerName.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
                >
                  Add Player
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewPlayerName('');
                    setNewPlayerNumber('');
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerSelector;
