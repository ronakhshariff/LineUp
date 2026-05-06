'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Player, Position } from '@/types';
import { Search, X, User } from 'lucide-react';

interface ActionModalProps {
  position: Position;
  onClose: () => void;
  onReplace: (player: Player) => void;
  onAddSub: (player: Player) => void;
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
  { id: '21', name: 'Seif' },
];

const ActionModal: React.FC<ActionModalProps> = ({
  position,
  onClose,
  onReplace,
  onAddSub,
}) => {
  const [action, setAction] = useState<'replace' | 'addsub' | null>(null);
  const [search, setSearch] = useState('');

  const filteredPlayers = defaultPlayers.filter(
    (player) =>
      player.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePlayerSelect = (player: Player) => {
    if (action === 'replace') {
      onReplace(player);
    } else if (action === 'addsub') {
      onAddSub(player);
    }
    setAction(null);
    setSearch('');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-lg max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {position.player?.name} - {position.role}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {!action ? (
          <div className="p-6 space-y-3">
            <button
              onClick={() => setAction('replace')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
            >
              Replace Player
            </button>
            <button
              onClick={() => setAction('addsub')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
            >
              Add Substitute
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            {/* Search Bar */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search players..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                  autoFocus
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
                      onClick={() => handlePlayerSelect(player)}
                      className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                          <User className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 truncate">{player.name}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Back Button */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => {
                  setAction(null);
                  setSearch('');
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionModal;
