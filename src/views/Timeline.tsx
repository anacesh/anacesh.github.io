import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { timeline } from '../data/timeline';
import { loreData } from '../data/lore';
import LoreTooltip from '../components/LoreTooltip';
import { ChevronDown, ChevronRight, MapPin, X } from 'lucide-react';

export default function Timeline() {
  const navigate = useNavigate();
  const chapters = Array.from(new Set(timeline.map(s => s.chapter)));
  
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const [activeSession, setActiveSession] = useState(timeline[0].id);
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const toggleChapter = (chapter: string) => {
    setExpandedChapters(prev => ({
      [chapter]: !prev[chapter]
    }));
  };

  const scrollToSession = (sessionId: string) => {
    const element = document.getElementById(`session-${sessionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sessionId = entry.target.id.replace('session-', '');
            setActiveSession(sessionId);
            const session = timeline.find(s => s.id === sessionId);
            if (session) {
              setActiveChapter(session.chapter);
              setExpandedChapters({ [session.chapter]: true });
            }
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    timeline.forEach(s => {
      const el = document.getElementById(`session-${s.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-darker flex flex-col md:flex-row h-[calc(100vh-73px)] md:h-screen mt-[73px] md:mt-0 overflow-hidden">
      {/* Left Sidebar - Fixed */}
      <div className="w-full md:w-80 h-[30vh] md:h-screen bg-darker z-40 border-b md:border-b-0 md:border-r border-gray-dark shrink-0 flex flex-col">
        <div className="p-4 md:p-8 md:pb-4 border-b border-gray-dark shrink-0 bg-darker mt-0 md:mt-[73px]">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tighter text-white"
          >
            Хронология <br className="hidden md:block" /><span className="text-primary">Пути</span>
          </motion.h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {chapters.map((chapter) => {
            const chapterSessions = timeline.filter(s => s.chapter === chapter);
            const isExpanded = expandedChapters[chapter];
            const isActiveChapter = activeChapter === chapter;

            return (
              <div key={chapter} className="mb-2">
                <button
                  onClick={() => toggleChapter(chapter)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors font-display text-xs md:text-sm uppercase tracking-wider text-left ${
                    isActiveChapter ? 'bg-primary/10 text-primary font-bold' : 'text-gray-400 hover:bg-gray-dark/50'
                  }`}
                >
                  <span className="truncate pr-2">{chapter}</span>
                  {isExpanded ? <ChevronDown size={16} className="shrink-0" /> : <ChevronRight size={16} className="shrink-0" />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 pr-2 py-2 flex flex-col gap-1 border-l border-gray-dark ml-4 mt-1">
                        {chapterSessions.map(session => (
                          <button
                            key={session.id}
                            onClick={() => scrollToSession(session.id)}
                            className={`text-left text-[10px] md:text-xs font-mono uppercase tracking-widest py-2 px-3 rounded transition-colors truncate ${
                              activeSession === session.id 
                                ? 'bg-gray-dark text-white border-l-2 border-primary -ml-[1px]' 
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                          >
                            #{session.sessionNumber} {session.title}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Content - Scrollable */}
      <div className="flex-1 h-[70vh] md:h-screen overflow-y-auto px-4 py-8 md:pt-[100px] md:pb-24 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto relative pl-4 md:pl-8">
          
          {/* Central Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gray-dark z-0"></div>

          {timeline.map((session) => {
            return (
              <div id={`session-${session.id}`} key={session.id} className="relative mb-24 md:mb-32 group scroll-mt-24">
                
                {/* Node on central line */}
                <div className={`absolute top-0 w-4 h-4 rounded-full border-4 z-20 transition-colors duration-500 ${
                  activeSession === session.id ? 'bg-primary border-darker' : 'bg-darker border-gray-500'
                } -left-2 mt-1.5`}></div>

                <div className="flex flex-col w-full pl-8 md:pl-12">
                  <div className="flex flex-col items-start gap-2 mb-6 w-full">
                    <div className="font-mono text-xs tracking-widest text-gray-500 bg-gray-dark/50 inline-block px-2 py-1 rounded">
                      {session.date}
                    </div>
                    <h3 className="font-display font-bold text-3xl md:text-5xl text-white uppercase tracking-tight">
                      <span className="text-primary mr-3 inline-block">#{session.sessionNumber}</span>
                      {session.title}
                    </h3>
                    
                    <button 
                      onClick={() => session.locationId ? navigate('/lore', { state: { selectedLoreId: session.locationId } }) : null}
                      className={`font-mono text-xs md:text-sm tracking-widest mt-2 flex items-center gap-1 transition-colors ${
                        session.locationId ? 'text-primary hover:text-white cursor-pointer' : 'text-gray-400'
                      }`}
                    >
                      <MapPin size={14} />
                      ЛОКАЦИЯ: {session.location}
                    </button>
                  </div>
                  
                  <div className="text-gray-300 leading-relaxed font-sans mb-8 whitespace-pre-wrap text-base md:text-lg bg-black/20 p-6 md:p-10 rounded-xl border border-gray-dark/50 w-full text-left">
                    <LoreTooltip text={session.description} loreData={loreData} />
                  </div>
                  
                  {session.imageUrl && (
                    <div 
                      className="w-full relative overflow-hidden rounded-xl border border-gray-dark group-hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedImage(session.imageUrl)}
                    >
                      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
                      <img src={session.imageUrl} alt={session.title} className="w-full aspect-video md:aspect-[21/9] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105" />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
      
      {/* Fullscreen Image Popup */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 text-gray-400 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={selectedImage} 
              alt="Fullscreen" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
