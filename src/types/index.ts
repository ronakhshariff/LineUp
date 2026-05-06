export interface Player {
  id: string;
  name: string;
  number?: number;
  position?: string;
  isSub?: boolean;
}

export interface Position {
  id: string;
  x: number;
  y: number;
  role: 'GK' | 'DEF' | 'MID' | 'FWD';
  player?: Player;
  sub?: Player;
  subs?: Player[]; // Support multiple substitutes
}

export interface Formation {
  name: string;
  positions: Position[];
}

export interface Lineup {
  id: string;
  formation: Formation;
  players: Player[];
  subs: Player[];
  createdAt: Date;
  updatedAt: Date;
}

export type FormationType = '4-3-3' | '3-5-2' | 'custom';
