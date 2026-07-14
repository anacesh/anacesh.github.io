import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, Users, Clock, Image as ImageIcon, Book } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'ГЛАВНАЯ', path: '/', icon: <Home size={24} /> },
    { name: 'ГЕРОИ', path: '/characters', icon: <Users size={24} /> },
    { name: 'ХРОНИКИ', path: '/timeline', icon: <Clock size={24} /> },
    { name: 'ГАЛЕРЕЯ', path: '/gallery', icon: <ImageIcon size={24} /> },
    { name: 'ЛОР', path: '/lore', icon: <Book size={24} /> },
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
                className={`font-display text-2xl font-bold uppercase tracking-widest mb-6 transition-colors flex items-center gap-4 ${location.pathname === link.path ? 'text-primary' : 'text-light hover:text-gray-400'}`}
              >
                {link.icon} {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Expandable) */}
      <motion.div 
        className="hidden md:flex flex-col border-r border-gray-dark h-screen sticky top-0 shrink-0 py-8 bg-darker z-50 overflow-hidden"
        initial={{ width: 88 }}
        animate={{ width: isSidebarExpanded ? 240 : 88 }}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-col gap-12 w-full h-full">
          {/* Title Area */}
          <div className="flex items-center w-full px-6 whitespace-nowrap overflow-hidden min-h-[40px]">
            <span className="font-display font-bold text-2xl tracking-widest text-primary truncate">
              {isSidebarExpanded ? "D&D CAMPAIGN" : "D&D"}
            </span>
          </div>
          
          <nav className="flex flex-col gap-4 mt-4 w-full px-4 flex-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="flex items-center gap-6 px-4 py-4 rounded-lg transition-colors hover:bg-gray-dark/50 group whitespace-nowrap overflow-hidden"
              >
                <div className={`shrink-0 ${location.pathname === link.path ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>
                  {link.icon}
                </div>
                <motion.span 
                  animate={{ opacity: isSidebarExpanded ? 1 : 0 }}
                  className={`font-display text-sm uppercase tracking-widest ${location.pathname === link.path ? 'text-primary font-bold' : 'text-gray-400 group-hover:text-primary'}`}
                >
                  {link.name}
                </motion.span>
              </Link>
            ))}
          </nav>

          <div className="flex px-8 w-full shrink-0">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mx-auto">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
          </div>
        </div>
      </motion.div>

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
