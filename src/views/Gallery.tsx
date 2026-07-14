import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { gallery, GalleryImage } from '../data/gallery';
import { characters } from '../data/characters';
import { timeline } from '../data/timeline';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredGallery = useMemo(() => {
    if (!activeFilter) return gallery;
    return gallery.filter(img => img.characters.includes(activeFilter));
  }, [activeFilter]);

  const getCharName = (id: string) => characters.find(c => c.id === id)?.name || id;
  const getSessionTitle = (id: string) => {
    const s = timeline.find(s => s.id === id);
    return s ? `Session ${s.sessionNumber}: ${s.title}` : 'Unknown Session';
  };

  return (
    <div className="min-h-screen bg-darker py-20 px-4 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white mb-6"
          >
            Visual <span className="text-primary">Archive</span>
          </motion.h1>
          <p className="font-serif italic text-gray-400 text-xl md:text-2xl">
            Fragments of memory, frozen in time.
          </p>
        </div>

        {/* Filter Indicator */}
        <AnimatePresence>
          {activeFilter && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex items-center gap-4 bg-gray-dark px-4 py-2 border border-gray-light/30"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-gray-300">
                Filtering: <span className="text-primary font-bold">{getCharName(activeFilter)}</span>
              </span>
              <button 
                onClick={() => setActiveFilter(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div layout className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredGallery.map((img) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={img.id} 
              className="relative group cursor-pointer aspect-square overflow-hidden border border-gray-dark hover:border-primary transition-colors"
              onClick={() => setSelectedImage(img)}
            >
              <div className="absolute inset-0 bg-darker/20 z-10 group-hover:bg-transparent transition-colors"></div>
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full flex flex-col md:flex-row bg-darker border border-gray-dark shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-50 p-2 bg-darker/50 hover:bg-primary text-white transition-colors border border-gray-dark hover:border-primary"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              
              <div className="w-full md:w-2/3 max-h-[70vh] md:max-h-[85vh] bg-black flex items-center justify-center">
                <img src={selectedImage.url} alt={selectedImage.caption} className="w-full h-full object-contain" />
              </div>

              <div className="w-full md:w-1/3 p-8 flex flex-col justify-center">
                
                {selectedImage.sessionId && (
                  <div className="font-mono text-xs tracking-widest text-primary uppercase mb-4 pb-4 border-b border-gray-dark">
                    {getSessionTitle(selectedImage.sessionId)}
                  </div>
                )}
                
                <p className="font-serif text-lg md:text-xl text-gray-200 mb-12 italic">
                  "{selectedImage.caption}"
                </p>

                {selectedImage.characters.length > 0 && (
                  <div>
                    <div className="font-mono text-xs tracking-widest text-gray-500 uppercase mb-3">Subjects Identified:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.characters.map(charId => (
                        <button
                          key={charId}
                          onClick={() => {
                            setActiveFilter(charId);
                            setSelectedImage(null);
                          }}
                          className="px-3 py-1 border border-gray-light/30 text-gray-300 font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
                        >
                          {getCharName(charId)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
