import { useState } from 'react';
import { createPortal } from 'react-dom';
import { LoreEntry } from '../data/lore';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface LoreTooltipProps {
  text: string;
  loreData: LoreEntry[];
}

export default function LoreTooltip({ text, loreData }: LoreTooltipProps) {
  const [activeLore, setActiveLore] = useState<LoreEntry | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  
  // Parse text for [[lore_id|Display Text]]
  const parseText = (content: string) => {
    const parts = [];
    const regex = /\[\[([^|\]]+)\|?([^\]]+)?\]\]/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }

      const loreId = match[1];
      const displayText = match[2] || loreId;
      const loreEntry = loreData.find(l => l.id === loreId);

      if (loreEntry) {
        parts.push(
          <span 
            key={match.index}
            className="text-primary hover:text-white cursor-pointer border-b border-primary border-dotted transition-colors relative"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPosition({ x: rect.left, y: rect.bottom });
              setActiveLore(loreEntry);
            }}
            onMouseLeave={() => setActiveLore(null)}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/lore', { state: { selectedLoreId: loreEntry.id } });
            }}
          >
            {displayText}
          </span>
        );
      } else {
        parts.push(displayText);
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts;
  };

  return (
    <>
      {parseText(text)}
      
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeLore && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed z-[9999] pointer-events-none"
              style={{ 
                left: Math.min(position.x, window.innerWidth - 320 - 16), // keep in viewport
                top: position.y + 8 
              }}
            >
              <div className="bg-darker border border-primary p-4 shadow-2xl shadow-primary/20 w-80 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
                  Запись из Архива
                </div>
                <h4 className="font-display font-bold text-lg text-white mb-2 uppercase">
                  {activeLore.title}
                </h4>
                <p className="text-sm font-sans text-gray-300 leading-tight">
                  {activeLore.shortDescription}
                </p>
                <div className="text-primary font-mono text-[10px] mt-4 opacity-70 border-t border-gray-dark pt-2">
                  [КЛИКНИТЕ ДЛЯ ПОДРОБНОСТЕЙ]
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
