import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    // Заменил bg-darker на очень темный, почти черный оттенок камня/ночи (#0c0a09)
    <div className="min-h-[calc(100vh-80px)] md:min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-[#0c0a09] px-4 py-20 md:py-0">

      {/* Сетка на фоне. Сделал линии едва заметными и с кровавым оттенком */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] z-0">
        <div className="absolute w-px h-full bg-red-900 left-1/4"></div>
        <div className="absolute w-px h-full bg-red-900 left-2/4"></div>
        <div className="absolute w-px h-full bg-red-900 left-3/4"></div>
        <div className="absolute w-full h-px bg-red-900 top-1/2"></div>
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter text-center uppercase text-zinc-300 mix-blend-plus-lighter drop-shadow-lg"
        >
          Охота<br />
          {/* Акцентный кроваво-красный цвет для слова "Выкованная" */}
          <span className="text-[#8b0000]">НА ВОЛКОВ</span><br />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 md:mt-24 max-w-2xl text-center"
        >
          {/* Цитата, основанная на вашем синопсисе */}
          <p className="font-serif italic text-xl md:text-2xl text-zinc-400 mb-8 leading-relaxed">
            «Когда империи обращаются в пыль, а короли сходят с ума, лишь старые псы способны взять след во тьме.»
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Кнопка 1 - залитая цветом крови */}
            <Link to="/timeline" className="px-8 py-4 bg-[#8b0000] text-white font-display font-bold uppercase tracking-widest text-sm hover:bg-zinc-200 hover:text-[#8b0000] transition-colors">
              Хронология
            </Link>
            {/* Кнопка 2 - контурная (призрак) */}
            <Link to="/characters" className="px-8 py-4 border border-zinc-700 text-zinc-300 font-display font-bold uppercase tracking-widest text-sm hover:border-zinc-200 hover:text-white transition-colors">
              Отряд
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Информация о кампании в углу экрана */}
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 font-mono text-xs text-zinc-500 uppercase tracking-widest flex flex-col gap-1">
        <span>Локация: Западный Даленор</span>
        <span>Год: 5015 После п. л.</span>
        <span className="text-[#8b0000] font-bold mt-1">Охота началась</span>
      </div>
    </div>
  );
}