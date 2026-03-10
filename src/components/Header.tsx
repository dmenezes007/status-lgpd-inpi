import { Search, X, Moon, Sun, ShieldCheck, ArrowDownAZ, CalendarDays } from 'lucide-react';
import { cn } from '../utils';

export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resultCount: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

export function Header({
  searchQuery,
  setSearchQuery,
  resultCount,
  isDarkMode,
  toggleDarkMode,
  sortBy,
  setSortBy,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo / Title */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
            <ShieldCheck size={20} />
          </div>
          <h1 className="text-lg font-semibold hidden sm:block tracking-tight">
            Status de Implementacao da LGPD
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative flex items-center">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por titulo, descricao, tag ou tipo..."
              className="block w-full pl-10 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-full leading-5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="text-sm text-slate-500 dark:text-slate-400 hidden lg:block mr-2">
            <span className="font-medium text-slate-900 dark:text-slate-100">{resultCount}</span> registros
          </div>
          
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors flex items-center gap-1" aria-label="Ordenar">
              {sortBy.startsWith('date') ? <CalendarDays size={20} /> : <ArrowDownAZ size={20} />}
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-1">
              <button onClick={() => setSortBy('date-desc')} className={cn("w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800", sortBy === 'date-desc' ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-700 dark:text-slate-300")}>Mais recentes</button>
              <button onClick={() => setSortBy('date-asc')} className={cn("w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800", sortBy === 'date-asc' ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-700 dark:text-slate-300")}>Mais antigos</button>
              <button onClick={() => setSortBy('title-asc')} className={cn("w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800", sortBy === 'title-asc' ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-700 dark:text-slate-300")}>Título (A-Z)</button>
              <button onClick={() => setSortBy('title-desc')} className={cn("w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800", sortBy === 'title-desc' ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-700 dark:text-slate-300")}>Título (Z-A)</button>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
