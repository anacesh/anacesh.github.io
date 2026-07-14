import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] md:min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-darker px-4 py-20 md:py-0">
      
      {/* Grid lines background to match the reference */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute w-px h-full bg-white left-1/4"></div>
        <div className="absolute w-px h-full bg-white left-2/4"></div>
        <div className="absolute w-px h-full bg-white left-3/4"></div>
        <div className="absolute w-full h-px bg-white top-1/2"></div>
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter text-center uppercase text-white mix-blend-difference"
        >
          An Epic <br />
          <span className="text-primary">Forged</span> in <br />
          Shadow
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 md:mt-24 max-w-lg text-center"
        >
          <p className="font-serif italic text-xl md:text-2xl text-gray-400 mb-8">
            "The dice fall where they may, but the story is carved by those who survive."
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/timeline" className="px-8 py-4 bg-primary text-white font-display font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-primary transition-colors">
              Read the Chronicle
            </Link>
            <Link to="/characters" className="px-8 py-4 border border-gray-light text-light font-display font-bold uppercase tracking-widest text-sm hover:border-white transition-colors">
              Meet the Party
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 font-mono text-xs text-gray-500 uppercase tracking-widest flex flex-col gap-1">
        <span>Campaign V.1.0</span>
        <span>Status: Active</span>
      </div>
    </div>
  );
}
