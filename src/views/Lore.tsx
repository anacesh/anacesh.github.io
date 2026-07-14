import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import { loreData, LoreEntry } from '../data/lore';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Lore() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'characters' | 'factions' | 'locations' | 'history'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLore, setSelectedLore] = useState<LoreEntry | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.selectedLoreId) {
      const lore = loreData.find(l => l.id === location.state.selectedLoreId);
      if (lore) {
        setSelectedLore(lore);
        setActiveCategory('all');
        // Clear state by replacing the history entry so it doesn't re-trigger on refresh/back
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location.state, navigate, location.pathname]);

  const categories = [
    { id: 'all', label: 'ВСЕ' },
    { id: 'characters', label: 'ПЕРСОНАЖИ' },
    { id: 'factions', label: 'ОБЪЕДИНЕНИЯ' },
    { id: 'locations', label: 'ЛОКАЦИИ' },
    { id: 'history', label: 'ИСТОРИЯ' },
  ] as const;

  const filteredLore = loreData.filter(lore => {
    const matchesCategory = activeCategory === 'all' || lore.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      lore.title.toLowerCase().includes(searchLower) || 
      lore.tags.some(tag => tag.toLowerCase().includes(searchLower));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-darker py-20 px-4 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto mb-16 flex flex-col gap-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white mb-6"
          >
            Галерея <span className="text-primary">Мира</span>
          </motion.h1>
          <p className="font-serif italic text-gray-400 text-xl md:text-2xl">
            Знания, собранные по крупицам в умирающем мире.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-gray-dark">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-mono text-sm tracking-widest uppercase pb-2 transition-colors border-b-2 ${
                  activeCategory === cat.id 
                    ? 'border-primary text-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="ПОИСК..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-dark/50 border border-gray-dark text-white font-mono text-sm px-10 py-2 focus:outline-none focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lore Grid */}
      <motion.div layout className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredLore.map(lore => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={lore.id}
              onClick={() => setSelectedLore(lore)}
              className="group bg-darker border border-gray-dark p-6 cursor-pointer hover:border-primary transition-colors flex flex-col h-full"
            >
              {lore.imageUrl && (
                <div className="w-full h-48 mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity"></div>
                  <img src={lore.imageUrl} alt={lore.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                </div>
              )}
              
              <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
                {categories.find(c => c.id === lore.category)?.label}
              </div>
              <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-white mb-4 group-hover:text-primary transition-colors">
                {lore.title}
              </h3>
              <p className="text-gray-400 font-sans text-sm flex-grow mb-6">
                {lore.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {lore.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-dark text-gray-300 font-mono text-[10px] uppercase tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Full Lore Modal */}
      <AnimatePresence>
        {selectedLore && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedLore(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative max-w-4xl w-full bg-darker border border-gray-dark shadow-2xl my-auto"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-50 p-2 bg-darker/50 hover:bg-primary text-white transition-colors border border-gray-dark hover:border-primary"
                onClick={() => setSelectedLore(null)}
              >
                <X size={24} />
              </button>
              
              {selectedLore.imageUrl && (
                <div className="w-full h-64 md:h-96 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-darker to-transparent z-10"></div>
                  <img src={selectedLore.imageUrl} alt={selectedLore.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="p-8 md:p-12 -mt-20 relative z-20">
                <div className="font-mono text-sm uppercase tracking-widest text-primary mb-4">
                  {categories.find(c => c.id === selectedLore.category)?.label}
                </div>
                <h2 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter text-white mb-8">
                  {selectedLore.title}
                </h2>
                
                <div className="flex flex-wrap gap-3 mb-12 pb-8 border-b border-gray-dark">
                  {selectedLore.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-dark/50 border border-gray-dark text-gray-300 font-mono text-xs uppercase tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="prose prose-invert prose-p:text-gray-300 prose-p:leading-relaxed max-w-none font-sans whitespace-pre-wrap">
                  {selectedLore.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
