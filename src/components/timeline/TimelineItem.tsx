
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Globe } from 'lucide-react';

interface TimelineItemProps {
  item: {
    year: string;
    title: string;
    description: string;
    type: 'personal' | 'historical';
    side: 'left' | 'right';
    image?: string;
    quote?: string;
    isAnchor?: boolean;
  };
  index: number;
  isActive: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, isActive }) => {
  const { year, title, description, type, side, image, quote, isAnchor } = item;

  return (
    <div
      className={`timeline-item relative grid grid-cols-2 gap-8 mb-16 ${
        side === 'left' ? 'timeline-left' : 'timeline-right'
      }`}
    >
      {side === 'left' ? (
        <>
          {/* Content - Left Side */}
          <div className="text-right pr-8">
            <motion.div
              className={`inline-block p-6 rounded-lg shadow-2xl transition-all duration-500 ${
                type === 'personal' 
                  ? 'bg-gradient-to-br from-red-900/40 to-red-800/20 border border-red-800/50' 
                  : 'bg-gradient-to-br from-gray-800/40 to-gray-700/20 border border-gray-600/50'
              } ${isActive ? 'scale-105 shadow-red-500/20' : ''}`}
              whileHover={{ scale: 1.02 }}
            >
              {/* Year Badge */}
              <div className={`inline-flex items-center space-x-2 mb-4 px-3 py-1 rounded-full text-sm font-mono ${
                type === 'personal' ? 'bg-red-800 text-white' : 'bg-gray-700 text-gray-300'
              }`}>
                {type === 'personal' ? <User className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                <span>{year}</span>
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-bold mb-3 font-mono ${
                type === 'personal' ? 'text-red-400' : 'text-gray-300'
              }`}>
                {title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mb-4 leading-relaxed font-serif">
                {description}
              </p>

              {/* Quote */}
              {quote && (
                <blockquote className="italic text-gray-400 border-l-2 border-red-800 pl-4 mt-4">
                  "{quote}"
                </blockquote>
              )}

              {/* Image */}
              {image && (
                <div className="mt-4 relative overflow-hidden rounded-lg">
                  <img 
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover ddr-vintage-filter opacity-80 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}
            </motion.div>
          </div>
          <div /> {/* Empty right column */}
        </>
      ) : (
        <>
          <div /> {/* Empty left column */}
          {/* Content - Right Side */}
          <div className="pl-8">
            <motion.div
              className={`inline-block p-6 rounded-lg shadow-2xl transition-all duration-500 ${
                type === 'personal' 
                  ? 'bg-gradient-to-br from-red-900/40 to-red-800/20 border border-red-800/50' 
                  : 'bg-gradient-to-br from-gray-800/40 to-gray-700/20 border border-gray-600/50'
              } ${isActive ? 'scale-105 shadow-red-500/20' : ''}`}
              whileHover={{ scale: 1.02 }}
            >
              {/* Year Badge */}
              <div className={`inline-flex items-center space-x-2 mb-4 px-3 py-1 rounded-full text-sm font-mono ${
                type === 'personal' ? 'bg-red-800 text-white' : 'bg-gray-700 text-gray-300'
              }`}>
                {type === 'personal' ? <User className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                <span>{year}</span>
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-bold mb-3 font-mono ${
                type === 'personal' ? 'text-red-400' : 'text-gray-300'
              }`}>
                {title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mb-4 leading-relaxed font-serif">
                {description}
              </p>

              {/* Quote */}
              {quote && (
                <blockquote className="italic text-gray-400 border-l-2 border-red-800 pl-4 mt-4">
                  "{quote}"
                </blockquote>
              )}

              {/* Image */}
              {image && (
                <div className="mt-4 relative overflow-hidden rounded-lg">
                  <img 
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover ddr-vintage-filter opacity-80 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}

      {/* Timeline Dot */}
      <motion.div 
        className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-gray-800 shadow-lg transition-all duration-500 ${
          type === 'personal' ? 'bg-red-800' : 'bg-gray-600'
        } ${isActive ? 'scale-125 shadow-red-500/50' : ''}`}
        style={{ top: '2rem' }}
        animate={isActive ? { scale: 1.25 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Anchor indicator */}
      {isAnchor && (
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2"
          style={{ top: '2rem' }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity 
          }}
        >
          <div className="w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-red-500" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TimelineItem;
