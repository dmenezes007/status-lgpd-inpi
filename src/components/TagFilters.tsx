import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../utils';

export type CategoryOption = 'Todas' | 'Documentos' | 'Informações';

interface TagFiltersProps {
  activeCategory: CategoryOption;
  setActiveCategory: (category: CategoryOption) => void;
}

const categories: CategoryOption[] = ['Todas', 'Documentos', 'Informações'];

export function TagFilters({ activeCategory, setActiveCategory }: TagFiltersProps) {
  return (
    <div className="w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide min-w-0">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border capitalize flex items-center gap-1.5",
                  isActive
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-800"
                )}
              >
                {category}
                {isActive && <X size={14} className="opacity-70" />}
              </motion.button>
            );
          })}
        </div>

        <div className="ml-auto hidden sm:block">
          <img
            src="/logo_inpi_azul_fundo_transparente.png"
            alt="INPI"
            className="h-8 w-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
