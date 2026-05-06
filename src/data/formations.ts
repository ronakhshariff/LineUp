import { Formation, Position } from '@/types';

export const formations: Record<string, Formation> = {
  '4-3-3 (1)': {
    name: '4-3-3 (1)',
    positions: [
      // Goalkeeper
      { id: 'gk', x: 50, y: 90, role: 'GK' },
      // Defense
      { id: 'lb', x: 15, y: 70, role: 'DEF' },
      { id: 'lcb', x: 30, y: 75, role: 'DEF' },
      { id: 'rcb', x: 70, y: 75, role: 'DEF' },
      { id: 'rb', x: 85, y: 70, role: 'DEF' },
      // Midfield
      { id: 'lm', x: 20, y: 50, role: 'MID' },
      { id: 'cm', x: 35, y: 55, role: 'MID' },
      { id: 'rm', x: 80, y: 50, role: 'MID' },
      { id: 'cdm', x: 50, y: 40, role: 'MID' },
      // Attack
      { id: 'lw', x: 25, y: 25, role: 'FWD' },
      { id: 'st', x: 50, y: 20, role: 'FWD' },
      { id: 'rw', x: 75, y: 25, role: 'FWD' },
    ],
  },
  '4-3-3 (2)': {
    name: '4-3-3 (2)',
    positions: [
      // Goalkeeper
      { id: 'gk', x: 50, y: 90, role: 'GK' },
      // Defense
      { id: 'lb', x: 15, y: 70, role: 'DEF' },
      { id: 'lcb', x: 30, y: 75, role: 'DEF' },
      { id: 'rcb', x: 70, y: 75, role: 'DEF' },
      { id: 'rb', x: 85, y: 70, role: 'DEF' },
      // Midfield
      { id: 'lm', x: 25, y: 50, role: 'MID' },
      { id: 'cm', x: 50, y: 55, role: 'MID' },
      { id: 'rm', x: 75, y: 50, role: 'MID' },
      { id: 'cdm', x: 50, y: 40, role: 'MID' },
      // Attack
      { id: 'lw', x: 20, y: 25, role: 'FWD' },
      { id: 'st', x: 50, y: 20, role: 'FWD' },
      { id: 'rw', x: 80, y: 25, role: 'FWD' },
    ],
  },
  '3-5-2': {
    name: '3-5-2',
    positions: [
      // Goalkeeper
      { id: 'gk', x: 50, y: 90, role: 'GK' },
      // Defense
      { id: 'lcb', x: 25, y: 75, role: 'DEF' },
      { id: 'cb1', x: 40, y: 80, role: 'DEF' },
      { id: 'cb2', x: 60, y: 80, role: 'DEF' },
      { id: 'rcb', x: 75, y: 75, role: 'DEF' },
      // Midfield
      { id: 'cdm', x: 50, y: 55, role: 'MID' },
      { id: 'lm', x: 20, y: 45, role: 'MID' },
      { id: 'cm1', x: 35, y: 50, role: 'MID' },
      { id: 'cm2', x: 65, y: 50, role: 'MID' },
      { id: 'rm', x: 80, y: 45, role: 'MID' },
      // Attack
      { id: 'lw', x: 30, y: 25, role: 'FWD' },
      { id: 'st', x: 50, y: 20, role: 'FWD' },
      { id: 'rw', x: 70, y: 25, role: 'FWD' },
    ],
  },
  '4-4-2': {
    name: '4-4-2',
    positions: [
      // Goalkeeper
      { id: 'gk', x: 50, y: 90, role: 'GK' },
      // Defense
      { id: 'lb', x: 20, y: 75, role: 'DEF' },
      { id: 'lcb1', x: 35, y: 80, role: 'DEF' },
      { id: 'lcb2', x: 50, y: 85, role: 'DEF' },
      { id: 'rcb1', x: 65, y: 80, role: 'DEF' },
      { id: 'rb', x: 80, y: 75, role: 'DEF' },
      // Midfield
      { id: 'lm', x: 25, y: 55, role: 'MID' },
      { id: 'cm1', x: 40, y: 60, role: 'MID' },
      { id: 'cm2', x: 60, y: 60, role: 'MID' },
      { id: 'rm', x: 75, y: 55, role: 'MID' },
      // Attack
      { id: 'lw', x: 35, y: 25, role: 'FWD' },
      { id: 'st', x: 50, y: 15, role: 'FWD' },
      { id: 'rw', x: 65, y: 25, role: 'FWD' },
    ],
  },
};
