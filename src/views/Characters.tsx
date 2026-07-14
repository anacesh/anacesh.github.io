import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { characters, Character } from '../data/characters';
import { X, Plus, ArrowRight } from 'lucide-react';

export default function Characters() {
  const [expandedChar, setExpandedChar] = useState<string | null>(null);

  const getPartner = (partnerId?: string): Character | undefined => {
    if (!partnerId) return undefined;
    return characters.find(c => c.id === partnerId);
  };

  return (
    <div className="min-h-screen bg-darker py-20 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto mb-32">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white mb-6"
        >
          Отважные <br/> <span className="text-primary">Авантюристы</span>
        </motion.h1>
        <p className="font-serif italic text-gray-400 text-xl md:text-2xl max-w-2xl">
          Странствующие души, чьи судьбы брошены на алтарь случая.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-32 md:gap-48 pb-32">
        {characters.map((char) => {
          const isExpanded = expandedChar === char.id;
          const isRight = char.layout === 'right';
          const partner = getPartner(char.partnerId);

          return (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              key={char.id} 
              className={`flex flex-col ${isRight ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch gap-12 md:gap-24`}
            >
              <div 
                className="w-full md:w-1/2 relative group overflow-hidden cursor-pointer h-[60vh] md:h-auto"
                onClick={() => setExpandedChar(isExpanded ? null : char.id)}
              >
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 font-mono text-xs text-white mix-blend-difference z-20">ID: {char.id.toUpperCase()}</div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 m-4 transition-all duration-300" style={{ borderColor: char.accentColor }}></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20">
                    {isExpanded ? <X className="text-white" /> : <Plus className="text-white" />}
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter mb-2" style={{ color: char.accentColor }}>
                  {char.name}
                </h2>
                
                <div className="flex gap-4 font-mono text-sm tracking-widest text-gray-400 uppercase mb-8 pb-4 border-b border-gray-dark">
                  <span>{char.race}</span>
                  <span>//</span>
                  <span>{char.class}</span>
                </div>
                
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {!isExpanded ? (
                      <motion.div
                        key="short"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-lg text-gray-300 leading-relaxed font-sans mb-8">
                          {char.backstoryShort}
                        </p>
                        <button 
                          onClick={() => setExpandedChar(char.id)}
                          className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-primary hover:text-white transition-colors"
                        >
                          <Plus size={16} /> Читать Подробнее
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col gap-6"
                      >
                        <p className="text-lg text-gray-200 leading-relaxed font-sans pb-6 border-b border-gray-dark/50 whitespace-pre-wrap">
                          {char.backstoryFull}
                        </p>
                        
                        {partner && (
                          <div className="bg-gray-dark/30 p-6 border-l-2" style={{ borderColor: partner.accentColor }}>
                            <div className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                              Связан с <ArrowRight size={12} />
                            </div>
                            <div className="flex items-center gap-4">
                              <img src={partner.imageUrl} alt={partner.name} className="w-12 h-12 object-cover rounded-full grayscale" />
                              <div>
                                <div className="font-display font-bold text-xl uppercase tracking-tight" style={{ color: partner.accentColor }}>{partner.name}</div>
                                <div className="font-mono text-xs text-gray-400">{partner.class}</div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <button 
                          onClick={() => setExpandedChar(null)}
                          className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-gray-500 hover:text-white transition-colors mt-4 self-start"
                        >
                          <X size={16} /> Свернуть
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
