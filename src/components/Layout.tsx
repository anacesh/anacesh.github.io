import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'ГЛАВНАЯ', path: '/' },
    { name: 'ГЕРОИ', path: '/characters' },
    { name: 'ХРОНИКИ', path: '/timeline' },
    { name: 'ГАЛЕРЕЯ', path: '/gallery' },
    { name: 'ЛОР', path: '/lore' },
  ];

  return (
    <div className="min-h-screen bg-darker text-light flex flex-col md:flex-row font-sans selection:bg-primary selection:text-white relative">

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-6 border-b border-gray-dark sticky top-0 bg-darker z-50">
        <h1 className="font-display font-bold text-xl tracking-tighter text-primary">D&D CAMPAIGN</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-light hover:text-primary transition-colors">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[81px] bg-darker z-40 flex flex-col p-6 md:hidden border-b border-gray-dark"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`font-mono text-2xl font-bold uppercase tracking-widest mb-6 transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-light hover:text-gray-400'}`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar — fixed, monospace, engraved vertical type. No hover-expand. */}
      <div className="hidden md:flex flex-col w-[76px] shrink-0 h-screen sticky top-0 z-50 bg-gray-dark">

        {/* Brand mark: single glyph, hard edge */}
        <div className="flex items-center justify-center h-16 shrink-0 bg-primary">
          <span className="font-mono font-bold text-black text-xl">D</span>
        </div>

        {/* Vertical nav — full-bleed rows, hard borders, no rounding, no easing */}
        <nav className="flex-1 flex flex-col">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex-1 flex items-center justify-center border-t border-black
                  ${isActive ? 'bg-primary' : 'bg-gray-dark hover:bg-black'}`}
              >
                <span
                  className={`writing-vertical-rl rotate-180 font-mono text-[15px] font-bold uppercase tracking-[0.35em] whitespace-nowrap
                    ${isActive ? 'text-black' : 'text-gray-100'}`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer strip: raw coordinates, studio-manifesto detail */}
        <div className="flex items-center justify-center h-16 shrink-0 border-t border-black">
          <span className="writing-vertical-rl rotate-180 font-mono text-[11px] tracking-[0.3em] text-gray-400">
            №01
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden relative min-h-screen">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}