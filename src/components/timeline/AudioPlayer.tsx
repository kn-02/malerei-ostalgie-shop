
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  isPlaying: boolean;
  onToggle: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, isPlaying, onToggle }) => {
  return (
    <motion.div
      className="bg-black/70 rounded-lg p-6 backdrop-blur-sm border border-red-800/30 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={onToggle}
          className="w-12 h-12 rounded-full bg-red-800 hover:bg-red-700 transition-colors flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 text-white" />
          ) : (
            <Play className="h-6 w-6 text-white ml-1" />
          )}
        </button>
        
        <div className="flex-1">
          <h4 className="text-white font-mono text-sm mb-1">{title}</h4>
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-red-400" />
            <div className="flex space-x-1">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-red-400 rounded-full"
                  style={{ height: Math.random() * 20 + 8 }}
                  animate={{
                    scaleY: isPlaying ? [1, 0.3, 1] : 1,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: isPlaying ? Infinity : 0,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-400 text-center font-mono">
        Originalaufnahme • Privatarchiv
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
