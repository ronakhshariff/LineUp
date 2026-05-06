'use client';

import { Formation } from '@/types';
import { formations } from '@/data/formations';
import { motion } from 'framer-motion';

interface FormationSelectorProps {
  currentFormation: Formation;
  onFormationChange: (formation: Formation) => void;
}

const FormationSelector: React.FC<FormationSelectorProps> = ({
  currentFormation,
  onFormationChange,
}) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Formation</h3>
      <div className="flex gap-2">
        {Object.values(formations).map((formation) => (
          <motion.button
            key={formation.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFormationChange(formation)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentFormation.name === formation.name
                ? 'bg-cyan-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {formation.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FormationSelector;
