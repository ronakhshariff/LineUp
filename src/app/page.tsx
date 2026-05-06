'use client';

import { useState, useCallback } from 'react';
import { Position, Player, Formation } from '@/types';
import { formations } from '@/data/formations';
import SoccerField from '@/components/SoccerField';
import PlayerSelector from '@/components/PlayerSelector';
import FormationSelector from '@/components/FormationSelector';
import SubstituteModal from '@/components/SubstituteModal';
import { motion } from 'framer-motion';
import ActionModal from '@/components/ActionModal';
import ClearModal from '@/components/ClearModal';
import SubstituteActionModal from '@/components/SubstituteActionModal';
import { useRealtimeLineup } from '@/hooks/useRealtimeLineup';

export default function Home() {
  const {
    positions,
    currentFormation,
    isConnected,
    updatePositions,
    updateFormation,
    clearAll
  } = useRealtimeLineup(formations['4-3-3 (1)']);

  const [selectedPosition, setSelectedPosition] = useState<string | undefined>();
  const [showPlayerSelector, setShowPlayerSelector] = useState(false);
  const [selectedPositionForPlayer, setSelectedPositionForPlayer] = useState<Position | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSubstituteModal, setShowSubstituteModal] = useState(false);
  const [substitutePosition, setSubstitutePosition] = useState<Position | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionPosition, setActionPosition] = useState<Position | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showSubstituteActionModal, setShowSubstituteActionModal] = useState(false);
  const [selectedSubstitute, setSelectedSubstitute] = useState<{positionId: string, subIndex: number, sub: Player} | null>(null);

  const handleFormationChange = useCallback((formation: Formation) => {
    updateFormation(formation);
  }, [updateFormation]);

  const handlePositionClick = useCallback((position: Position) => {
    setSelectedPosition(position.id);
    
    if (position.player) {
      // Show action modal for positions with existing players
      setActionPosition(position);
      setShowActionModal(true);
    } else {
      // Show player selector for empty positions
      setSelectedPositionForPlayer(position);
      setShowPlayerSelector(true);
    }
  }, []);

  const handlePositionUpdate = useCallback((id: string, x: number, y: number) => {
    updatePositions(prev => prev.map((pos: Position) => 
      pos.id === id ? { ...pos, x, y } : pos
    ));
  }, [updatePositions]);

  const handleSubstituteAction = useCallback((action: 'replace' | 'add', player: Player) => {
    if (action === 'replace') {
      // Replace existing player with substitute
      updatePositions(prev => prev.map((pos: Position) => 
        pos.id === substitutePosition?.id ? { ...pos, sub: player } : pos
      ));
    } else if (action === 'add') {
      // Add new substitute to the position
      updatePositions(prev => prev.map((pos: Position) => 
        pos.id === substitutePosition?.id ? { ...pos, subs: [...(pos.subs || []), player] } : pos
      ));
    }
    setShowSubstituteModal(false);
  }, [substitutePosition, updatePositions]);

  const handleSaveFormation = useCallback(() => {
    // Save current formation and positions to custom formation
    const customFormation = {
      name: 'custom',
      positions: positions,
    };
    updateFormation(customFormation);
  }, [positions, updateFormation]);

  const handlePlayerSelect = useCallback((player: Player) => {
    if (!selectedPositionForPlayer) return;

    updatePositions(prev => prev.map((pos: Position) => {
      if (pos.id === selectedPositionForPlayer.id) {
        // If position already has a player, move them to sub
        if (pos.player) {
          return { ...pos, sub: player };
        }
        return { ...pos, player };
      }
      return pos;
    }));

    setShowPlayerSelector(false);
    setSelectedPosition(undefined);
    setSelectedPositionForPlayer(null);
  }, [selectedPositionForPlayer, updatePositions]);

  const handleRemovePlayer = useCallback((positionId: string) => {
    updatePositions(prev => prev.map((pos: Position) => {
      if (pos.id === positionId) {
        // Move sub to main position if exists, otherwise clear
        if (pos.sub) {
          return { ...pos, player: pos.sub, sub: undefined };
        }
        return { ...pos, player: undefined, sub: undefined };
      }
      return pos;
    }));
  }, [updatePositions]);

  const handleClearAll = useCallback(() => {
    clearAll();
    setSelectedPosition(undefined);
  }, [clearAll]);

  const handleReplacePlayer = useCallback((newPlayer: Player) => {
    if (!actionPosition) return;
    
    updatePositions(prev => prev.map((pos: Position) => {
      if (pos.id === actionPosition.id) {
        // Move current player to subs if they exist
        const currentSubs = pos.subs || [];
        if (pos.player) {
          return { ...pos, player: newPlayer, subs: [...currentSubs, pos.player] };
        }
        return { ...pos, player: newPlayer };
      }
      return pos;
    }));
    
    setShowActionModal(false);
    setActionPosition(null);
  }, [actionPosition, updatePositions]);

  const handleSubstituteClick = useCallback((positionId: string, subIndex: number, sub: Player) => {
    setSelectedSubstitute({ positionId, subIndex, sub });
    setShowSubstituteActionModal(true);
  }, []);

  const handleReplaceSubstitute = useCallback((newPlayer: Player) => {
    if (!selectedSubstitute) return;
    
    updatePositions(prev => prev.map((pos: Position) => {
      if (pos.id === selectedSubstitute.positionId && pos.subs) {
        const newSubs = [...pos.subs];
        newSubs[selectedSubstitute.subIndex] = newPlayer;
        return { ...pos, subs: newSubs };
      }
      return pos;
    }));
    
    setShowSubstituteActionModal(false);
    setSelectedSubstitute(null);
  }, [selectedSubstitute, updatePositions]);

  const handleAddSubstitute = useCallback((newPlayer: Player) => {
    if (!selectedSubstitute) return;
    
    updatePositions(prev => prev.map((pos: Position) => {
      if (pos.id === selectedSubstitute.positionId && pos.subs) {
        const currentSubs = [...pos.subs];
        if (currentSubs.length < 4) {
          return { ...pos, subs: [...currentSubs, newPlayer] };
        }
      }
      return pos;
    }));
    
    setShowSubstituteActionModal(false);
    setSelectedSubstitute(null);
  }, [selectedSubstitute, updatePositions]);

  const handleRemoveSubstitute = useCallback(() => {
    if (!selectedSubstitute) return;
    
    updatePositions(prev => prev.map((pos: Position) => {
      if (pos.id === selectedSubstitute.positionId && pos.subs) {
        const newSubs = [...pos.subs];
        newSubs.splice(selectedSubstitute.subIndex, 1);
        return { ...pos, subs: newSubs };
      }
      return pos;
    }));
    
    setShowSubstituteActionModal(false);
    setSelectedSubstitute(null);
  }, [selectedSubstitute, updatePositions]);

  const generateLineupText = useCallback(() => {
    let text = `Formation: ${currentFormation.name}\n`;
    text += `Generated: ${new Date().toLocaleString()}\n\n`;
    text += 'STARTING XI:\n';
    text += '=============\n\n';
    
    positions.forEach((pos) => {
      if (pos.player) {
        text += `${pos.role}: ${pos.player.name}\n`;
      }
    });
    
    text += '\nSUBSTITUTES:\n';
    text += '=============\n\n';
    
    positions.forEach((pos) => {
      if (pos.subs && pos.subs.length > 0) {
        text += `${pos.role} (${pos.player?.name || 'Empty'}):\n`;
        pos.subs.forEach((sub, index) => {
          text += `  S${index + 1}: ${sub.name}\n`;
        });
      }
    });
    
    return text;
  }, [currentFormation.name, positions]);

  const handleDownload = useCallback(() => {
    // Create a clean version of the field without controls
    const element = document.getElementById('soccer-field');
    if (!element) return;

    // Use html2canvas to capture the field
    import('html2canvas').then((html2canvas) => {
      html2canvas.default(element, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
      }).then((canvas: HTMLCanvasElement) => {
        // Convert to blob and download
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `lineup-${currentFormation.name}-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        }, 'image/png');
      });
    }).catch(() => {
      // Fallback: create a simple text export
      const lineupText = generateLineupText();
      const blob = new Blob([lineupText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lineup-${currentFormation.name}-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }, [currentFormation.name, positions, generateLineupText]);

  const allPlayers = positions
    .map(pos => [pos.player, pos.sub, ...(pos.subs || [])])
    .flat()
    .filter((player): player is Player => player !== undefined);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Connection Status */}
      {isConnected && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium z-30">
          🟢 Connected
        </div>
      )}
      
      {/* Clear Button - Top Left */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          console.log('Clear button clicked!');
          setShowClearModal(true);
        }}
        className="fixed top-6 left-6 bg-red-500 hover:bg-red-600 text-white rounded-lg p-3 z-30 shadow-sm"
        title="Clear Lineup"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </motion.button>

      {/* Edit Mode Toggle */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsEditMode(!isEditMode)}
        className="fixed top-6 right-6 bg-white border border-gray-200 rounded-lg p-3 text-gray-700 font-medium z-30 shadow-sm"
      >
        {isEditMode ? 'Done' : 'Edit'}
      </motion.button>

        <div className="flex-1 container mx-auto px-4 py-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <SoccerField
                  positions={positions}
                  onPositionClick={handlePositionClick}
                  onPositionUpdate={handlePositionUpdate}
                  onSubstituteClick={handleSubstituteClick}
                  selectedPosition={selectedPosition}
                  isEditMode={isEditMode}
                />
              </motion.div>
            </div>

            <div className="space-y-6">
              {/* Formation selector only in edit mode */}
              {isEditMode && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-4"
                >
                  <h3 className="text-sm font-medium text-white mb-3">Formation</h3>
                  <div className="flex gap-2">
                    {Object.values(formations).map((formation) => (
                      <motion.button
                        key={formation.name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleFormationChange(formation)}
                        className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                          currentFormation.name === formation.name
                            ? 'bg-cyan-500 text-white'
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                      >
                        {formation.name}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Player list only in edit mode */}
              {isEditMode && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-4"
                >
                  <h3 className="text-sm font-medium text-white mb-3">Players</h3>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {allPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center p-2 bg-white/5 border border-white/10 rounded"
                      >
                        <span className="text-white text-sm">{player.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {allPlayers.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="w-full mt-3 bg-white/10 text-white/70 text-xs py-2 rounded border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </motion.div>
              )}

              {showPlayerSelector && (
                <PlayerSelector
                  onSelect={handlePlayerSelect}
                  onClose={() => {
                    setShowPlayerSelector(false);
                    setSelectedPosition(undefined);
                    setSelectedPositionForPlayer(null);
                  }}
                  existingPlayers={allPlayers}
                />
              )}

              {showSubstituteModal && (
                <SubstituteModal
                  position={substitutePosition}
                  existingPlayer={substitutePosition?.player}
                  existingSubs={substitutePosition?.subs || []}
                  onSelect={handleSubstituteAction}
                  onClose={() => {
                    setShowSubstituteModal(false);
                    setSubstitutePosition(null);
                  }}
                />
              )}

              {/* Edit mode controls */}
              {isEditMode && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-4"
                >
                  <h3 className="text-sm font-medium text-white mb-3">Edit Mode</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        updateFormation(formations['4-3-3 (1)']);
                      }}
                      className="w-full bg-white/10 text-white/80 py-2 px-4 rounded border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      Reset to 4-3-3 (1)
                    </button>
                    <button
                      onClick={() => {
                        updateFormation(formations['3-5-2']);
                      }}
                      className="w-full bg-white/10 text-white/80 py-2 px-4 rounded border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      Reset to 3-5-2
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Simple Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3">
            <div className="flex items-center space-x-6 text-white text-sm">
              <span>{currentFormation.name}</span>
              <span className="w-px h-4 bg-white/20"></span>
              <span>{allPlayers.length}/11</span>
            </div>
          </div>
        </motion.div>

        {/* Download Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-30 transition-colors duration-200"
          title="Download Lineup"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </motion.button>

      {/* Action Modal */}
      {showActionModal && actionPosition && (
        <ActionModal
          position={actionPosition}
          onClose={() => {
            setShowActionModal(false);
            setActionPosition(null);
          }}
          onReplace={handleReplacePlayer}
          onAddSub={handleAddSubstitute}
        />
      )}

      {/* Clear Modal */}
      <ClearModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={() => {
          clearAll();
          setShowClearModal(false);
        }}
      />

      {/* Substitute Action Modal */}
      {showSubstituteActionModal && selectedSubstitute && (
        <SubstituteActionModal
          isOpen={showSubstituteActionModal}
          onClose={() => {
            setShowSubstituteActionModal(false);
            setSelectedSubstitute(null);
          }}
          substitute={selectedSubstitute.sub}
          positionId={selectedSubstitute.positionId}
          subIndex={selectedSubstitute.subIndex}
          onReplace={handleReplaceSubstitute}
          onAdd={handleAddSubstitute}
          onRemove={handleRemoveSubstitute}
        />
      )}
      </div>
  );
}
