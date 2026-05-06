'use client';

import { motion } from 'framer-motion';
import { Position } from '@/types';

interface DraggablePositionProps {
  position: Position;
  onPositionClick: (position: Position) => void;
  onPositionUpdate: (id: string, x: number, y: number) => void;
  isSelected?: boolean;
  isEditMode?: boolean;
}

const DraggablePosition: React.FC<DraggablePositionProps> = ({
  position,
  onPositionClick,
  onPositionUpdate,
  isSelected,
  isEditMode,
}) => {
  return (
    <motion.div
      drag={isEditMode}
      dragMomentum={false}
      dragElastic={0.1}
      onDragEnd={(event, info) => {
        if (!isEditMode) return;
        
        const fieldElement = event.target as HTMLElement;
        const fieldRect = fieldElement.parentElement?.getBoundingClientRect();
        if (fieldRect) {
          const newX = ((info.point.x - fieldRect.left) / fieldRect.width) * 100;
          const newY = ((info.point.y - fieldRect.top) / fieldRect.height) * 100;
          
          // Constrain to field bounds
          const constrainedX = Math.max(5, Math.min(95, newX));
          const constrainedY = Math.max(5, Math.min(95, newY));
          
          onPositionUpdate(position.id, constrainedX, constrainedY);
        }
      }}
      onClick={() => onPositionClick && onPositionClick(position)}
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      whileDrag={{ scale: 1.1 }}
    >
      {position.player ? (
        <div className="relative min-w-14 h-14 sm:min-w-12 sm:h-12 px-3 py-2 rounded-full flex flex-col items-center justify-center text-white font-bold text-xs shadow-lg transition-all duration-200 border border-white/40 backdrop-blur-sm">
          <div className="text-xs font-medium text-center drop-shadow-md whitespace-normal">{position.player.name}</div>
        </div>
      ) : (
        <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/40 flex items-center justify-center text-white/80 text-xs font-medium cursor-pointer hover:bg-white/20 active:bg-white/30">
          {position.id}
        </div>
      )}
      
      {/* Substitutes visible on field */}
      {position.subs && position.subs.length > 0 && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-center space-y-0.5">
          {position.subs.slice(0, 4).map((sub, index) => (
            <div
              key={sub.id}
              className="text-xs font-medium text-cyan-100 whitespace-normal text-center"
            >
              S{index + 1}: {sub.name}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default DraggablePosition;
