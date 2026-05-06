import { useState, useEffect, useCallback } from 'react';
import { database, ref, onValue, set, update } from '@/lib/firebase';
import { Position, Formation } from '@/types';

export const useRealtimeLineup = (initialFormation: Formation) => {
  const [positions, setPositions] = useState<Position[]>(initialFormation.positions);
  const [currentFormation, setCurrentFormation] = useState<Formation>(initialFormation);
  const [isConnected, setIsConnected] = useState(false);

  // Listen for real-time updates
  useEffect(() => {
    const lineupRef = ref(database, 'lineup');
    
    const unsubscribe = onValue(lineupRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPositions(data.positions || initialFormation.positions);
        setCurrentFormation(data.currentFormation || initialFormation);
        setIsConnected(true);
      }
    }, (error) => {
      console.error('Firebase connection error:', error);
      setIsConnected(false);
    });

    return () => unsubscribe();
  }, [initialFormation]);

  // Update positions in real-time
  const updatePositions = useCallback((updater: (prev: Position[]) => Position[]) => {
    const newPositions = updater(positions);
    const lineupRef = ref(database, 'lineup');
    update(lineupRef, {
      positions: newPositions,
      lastUpdated: Date.now()
    }).catch(error => {
      console.error('Error updating positions:', error);
    });
  }, [positions]);

  // Update formation in real-time
  const updateFormation = useCallback((newFormation: Formation) => {
    const lineupRef = ref(database, 'lineup');
    update(lineupRef, {
      currentFormation: newFormation,
      positions: newFormation.positions,
      lastUpdated: Date.now()
    }).catch(error => {
      console.error('Error updating formation:', error);
    });
  }, []);

  // Clear all positions
  const clearAll = useCallback(() => {
    const lineupRef = ref(database, 'lineup');
    const clearedPositions = currentFormation.positions.map(pos => ({ 
      ...pos, 
      player: undefined, 
      sub: undefined, 
      subs: [] 
    }));
    update(lineupRef, {
      positions: clearedPositions,
      lastUpdated: Date.now()
    }).catch(error => {
      console.error('Error clearing lineup:', error);
    });
  }, [currentFormation]);

  return {
    positions,
    currentFormation,
    isConnected,
    updatePositions,
    updateFormation,
    clearAll
  };
};
