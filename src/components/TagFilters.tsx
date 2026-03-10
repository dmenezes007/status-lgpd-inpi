import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../utils';

interface TagFiltersProps {
  tags: string[];
  activeTags: string[];
  toggleTag: (tag: string) => void;
  clearTags: () => void;
}

export function TagFilters({ tags, activeTags, toggleTag, clearTags }: TagFiltersProps) {
  return (
    <div className="w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 overflow-x-auto scrollbar-hide">
        
        <button
          onClick={clearTags}
          className={cn(
            "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
            activeTags.length === 0
              ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-800"
          )}
        >
          Todas
        </button>

        {tags.map((tag) => {
          const isActive = activeTags.includes(tag);
          return (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleTag(tag)}
              className={cn(
                "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border capitalize flex items-center gap-1.5",
                isActive
                  ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-800"
              )}
            >
              {tag}
              {isActive && <X size={14} className="opacity-70" />}
            </motion.button>
          );
        })}

        {activeTags.length > 0 && (
          <button
            onClick={clearTags}
            className="flex-shrink-0 ml-auto text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors flex items-center gap-1"
          >
            Limpar Filtros
          </button>
        )}
      </div>
    </div>
  );
}
