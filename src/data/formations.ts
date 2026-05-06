import { Formation } from '@/types';

export const formations: Record<string, Formation> = {
  // 4-3-3 (1) HOLDING: CDM sits deep below LCM/RCM
  '4-3-3 (1)': {
    name: '4-3-3 (1)',
    positions: [
      { id: 'GK',  x: 50, y: 90, role: 'GK'  },
      { id: 'LB',  x: 15, y: 76, role: 'DEF' },
      { id: 'LCB', x: 35, y: 81, role: 'DEF' },
      { id: 'RCB', x: 65, y: 81, role: 'DEF' },
      { id: 'RB',  x: 85, y: 76, role: 'DEF' },
      { id: 'CDM', x: 50, y: 63, role: 'MID' },
      { id: 'LCM', x: 28, y: 50, role: 'MID' },
      { id: 'RCM', x: 72, y: 50, role: 'MID' },
      { id: 'LW',  x: 15, y: 22, role: 'FWD' },
      { id: 'ST',  x: 50, y: 16, role: 'FWD' },
      { id: 'RW',  x: 85, y: 22, role: 'FWD' },
    ],
  },
  // 4-3-3 (2) ATTACK: CAM pushes high between LCM/RCM
  '4-3-3 (2)': {
    name: '4-3-3 (2)',
    positions: [
      { id: 'GK',  x: 50, y: 90, role: 'GK'  },
      { id: 'LB',  x: 15, y: 76, role: 'DEF' },
      { id: 'LCB', x: 35, y: 81, role: 'DEF' },
      { id: 'RCB', x: 65, y: 81, role: 'DEF' },
      { id: 'RB',  x: 85, y: 76, role: 'DEF' },
      { id: 'LCM', x: 28, y: 55, role: 'MID' },
      { id: 'CAM', x: 50, y: 42, role: 'MID' },
      { id: 'RCM', x: 72, y: 55, role: 'MID' },
      { id: 'LW',  x: 15, y: 22, role: 'FWD' },
      { id: 'ST',  x: 50, y: 16, role: 'FWD' },
      { id: 'RW',  x: 85, y: 22, role: 'FWD' },
    ],
  },
  // 3-5-2: 3 CBs, 5 midfielders wide, 2 strikers
  '3-5-2': {
    name: '3-5-2',
    positions: [
      { id: 'GK',  x: 50, y: 90, role: 'GK'  },
      { id: 'LCB', x: 25, y: 78, role: 'DEF' },
      { id: 'CB',  x: 50, y: 82, role: 'DEF' },
      { id: 'RCB', x: 75, y: 78, role: 'DEF' },
      { id: 'LM',  x: 10, y: 52, role: 'MID' },
      { id: 'LCM', x: 30, y: 47, role: 'MID' },
      { id: 'CM',  x: 50, y: 52, role: 'MID' },
      { id: 'RCM', x: 70, y: 47, role: 'MID' },
      { id: 'RM',  x: 90, y: 52, role: 'MID' },
      { id: 'LST', x: 35, y: 20, role: 'FWD' },
      { id: 'RST', x: 65, y: 20, role: 'FWD' },
    ],
  },
  // 4-4-2: 4 defenders, 4 midfielders, 2 strikers
  '4-4-2': {
    name: '4-4-2',
    positions: [
      { id: 'GK',  x: 50, y: 90, role: 'GK'  },
      { id: 'LB',  x: 12, y: 78, role: 'DEF' },
      { id: 'LCB', x: 35, y: 82, role: 'DEF' },
      { id: 'RCB', x: 65, y: 82, role: 'DEF' },
      { id: 'RB',  x: 88, y: 78, role: 'DEF' },
      { id: 'LM',  x: 10, y: 55, role: 'MID' },
      { id: 'LCM', x: 35, y: 58, role: 'MID' },
      { id: 'RCM', x: 65, y: 58, role: 'MID' },
      { id: 'RM',  x: 90, y: 55, role: 'MID' },
      { id: 'LST', x: 35, y: 20, role: 'FWD' },
      { id: 'RST', x: 65, y: 20, role: 'FWD' },
    ],
  },
};
