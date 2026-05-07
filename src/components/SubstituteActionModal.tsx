'use client';

import { useState, useCallback } from 'react';
import { User, Users, UserMinus, X } from 'lucide-react';
import { Player, Position } from '@/types';
import PlayerSelector from './PlayerSelector';

interface SubstituteActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  substitute: Player;
  positionId: string;
  subIndex: number;
  onReplace: (newPlayer: Player) => void;
  onAdd: (newPlayer: Player) => void;
  onRemove: () => void;
}

const SubstituteActionModal: React.FC<SubstituteActionModalProps> = ({
  isOpen,
  onClose,
  substitute,
  positionId,
  subIndex,
  onReplace,
  onAdd,
  onRemove,
}) => {
  const [showPlayerSelector, setShowPlayerSelector] = useState(false);
  const [action, setAction] = useState<'replace' | 'add' | null>(null);

  const handleReplaceSub = useCallback((newPlayer: Player) => {
    console.log('SubstituteActionModal: handleReplaceSub called with', newPlayer);
    if (!substitute) return;
    
    onReplace(newPlayer);
    setShowPlayerSelector(false);
  }, [substitute, onReplace]);

  const handleAddSub = useCallback((newPlayer: Player) => {
    console.log('SubstituteActionModal: handleAddSub called with', newPlayer);
    if (!substitute) return;
    
    onAdd(newPlayer);
    setShowPlayerSelector(false);
  }, [substitute, onAdd]);

  const handleRemoveSub = useCallback(() => {
    console.log('SubstituteActionModal: handleRemoveSub called');
    if (!substitute) return;
    
    onRemove();
    onClose();
  }, [substitute, onRemove, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Substitute Actions</h2>
              <p className="text-sm text-gray-500">S{subIndex + 1}: {substitute.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Player Selector for Replace/Add */}
        {showPlayerSelector && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <PlayerSelector
              onSelect={(newPlayer) => {
                if (action === 'replace') {
                  onReplace(newPlayer);
                } else if (action === 'add') {
                  onAdd(newPlayer);
                }
                setShowPlayerSelector(false);
                setAction(null);
              }}
              onClose={() => {
                setShowPlayerSelector(false);
                setAction(null);
              }}
              existingPlayers={[]}
            />
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => {
              setAction('replace');
              setShowPlayerSelector(true);
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <User className="w-5 h-5" />
            <span>Replace Sub</span>
          </button>

          <button
            onClick={() => {
              setAction('add');
              setShowPlayerSelector(true);
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Users className="w-5 h-5" />
            <span>Add Sub</span>
          </button>

          <button
            onClick={() => {
              onRemove();
              onClose();
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <UserMinus className="w-5 h-5" />
            <span>Remove Sub</span>
          </button>
        </div>

        {/* Cancel */}
        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubstituteActionModal;
