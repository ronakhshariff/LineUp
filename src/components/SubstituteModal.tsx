'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Player } from '@/types';

interface SubstituteModalProps {
  position: any;
  existingPlayer?: Player;
  existingSubs?: Player[];
  onSelect: (action: 'replace' | 'add', player: Player) => void;
  onClose: () => void;
}

const SubstituteModal: React.FC<SubstituteModalProps> = ({
  position,
  existingPlayer,
  existingSubs = [],
  onSelect,
  onClose,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddSub = () => {
    if (newPlayerName.trim()) {
      const newSub: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
      };
      onSelect('add', newSub);
      setNewPlayerName('');
      setShowAddForm(false);
    }
  };

  const handleReplacePlayer = (player: Player) => {
    onSelect('replace', player);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {existingPlayer ? 'Manage Player' : 'Add Player'}
          </h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-2"
          >
            ✕
          </button>
        </div>

        {existingPlayer && (
          <div className="mb-6 p-4 bg-white/10 border border-white/20 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {existingPlayer.name.charAt(0)}
              </div>
              <div>
                <div className="text-white font-medium">{existingPlayer.name}</div>
                <div className="text-sm text-cyan-300">Main Player</div>
              </div>
            </div>
            <button
              onClick={() => handleReplacePlayer(existingPlayer)}
              className="w-full bg-red-500/20 border border-red-400/50 hover:bg-red-500/30 text-red-300 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Replace Player
            </button>
          </div>
        )}

        {/* Existing Substitutes */}
        {existingSubs.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-white mb-3">Current Substitutes</h4>
            <div className="space-y-2">
              {existingSubs.map((sub, index) => (
                <div
                  key={sub.id}
                  onClick={() => handleReplacePlayer(sub)}
                  className="flex items-center justify-between p-3 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      S{index + 1}
                    </div>
                    <span className="text-white font-medium">{sub.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      // Remove sub logic here
                    }}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Sub Form */}
        {!showAddForm ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter player name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewPlayerName('');
                }}
                className="flex-1 bg-white/10 text-white/80 py-2 px-4 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSub}
                disabled={!newPlayerName.trim()}
                className="flex-1 bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Sub
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-white/10 text-white/80 py-3 px-4 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
          >
            + Add Substitute
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default SubstituteModal;
