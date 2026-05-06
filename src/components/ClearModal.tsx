'use client';

import { Trash2, X } from 'lucide-react';

interface ClearModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ClearModal: React.FC<ClearModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-full">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Clear Lineup</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Are you sure you would like to clear the lineup?
          </p>
          <p className="text-sm text-gray-500">
            This will remove all players from their positions and cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log('Clear modal confirm clicked!');
              onConfirm();
            }}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearModal;
