'use client';

import { motion } from 'framer-motion';
import { Position, Player } from '@/types';
import { cn } from '@/lib/utils';
import DraggablePosition from './DraggablePosition';

interface SoccerFieldProps {
  positions: Position[];
  onPositionClick: (position: Position) => void;
  onPositionUpdate: (id: string, x: number, y: number) => void;
  selectedPosition?: string;
  isEditMode?: boolean;
}

const SoccerField: React.FC<SoccerFieldProps> = ({
  positions,
  onPositionClick,
  onPositionUpdate,
  selectedPosition,
  isEditMode,
}) => {
  const getFieldColor = (role: Position['role']) => {
    switch (role) {
      case 'GK': return 'from-yellow-400 to-orange-500';
      case 'DEF': return 'from-blue-400 to-blue-600';
      case 'MID': return 'from-green-400 to-green-600';
      case 'FWD': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div id="soccer-field" className="relative w-full max-w-5xl mx-auto aspect-[3/4] sm:aspect-[4/3] bg-green-600 rounded-2xl overflow-hidden shadow-xl">
      {/* Clean field lines */}
      <div className="absolute inset-0">
        {/* Outer boundary */}
        <div className="absolute inset-2 border-2 border-white/80 rounded-xl" />
        {/* Center line */}
        <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-white/80" />
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/80 rounded-full" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/90 rounded-full" />
        {/* Penalty areas */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-48 h-20 border-2 border-white/80" />
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-20 border-2 border-white/80" />
        {/* Goal areas */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-12 border-2 border-white/80" />
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-12 border-2 border-white/80" />
        {/* Penalty spots */}
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white/90 rounded-full" />
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white/90 rounded-full" />
      </div>

      {/* Positions */}
      {positions.map((position) => (
        <DraggablePosition
          key={position.id}
          position={position}
          onPositionClick={onPositionClick}
          onPositionUpdate={onPositionUpdate}
          isSelected={selectedPosition === position.id}
          isEditMode={isEditMode}
        />
      ))}
    </div>
  );
};

export default SoccerField;
