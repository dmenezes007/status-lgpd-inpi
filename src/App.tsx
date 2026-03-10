/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header, SortOption } from './components/Header';
import { TagFilters } from './components/TagFilters';
import { FileCard } from './components/FileCard';
import { FileModal } from './components/FileModal';
import { BackToTop } from './components/BackToTop';
import { FileItem } from './types';
import data from './data.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    data.forEach(file => file.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  // Filter and sort logic
  const filteredFiles = useMemo(() => {
    const filtered = (data as FileItem[]).filter(file => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        file.titulo.toLowerCase().includes(searchLower) ||
        file.descricao.toLowerCase().includes(searchLower) ||
        file.tags.some(tag => tag.toLowerCase().includes(searchLower));

      const matchesTags = activeTags.length === 0 || 
        activeTags.every(tag => file.tags.includes(tag));

      return matchesSearch && matchesTags;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.data).getTime() - new Date(a.data).getTime();
        case 'date-asc':
          return new Date(a.data).getTime() - new Date(b.data).getTime();
        case 'title-asc':
          return a.titulo.localeCompare(b.titulo);
        case 'title-desc':
          return b.titulo.localeCompare(a.titulo);
        default:
          return 0;
      }
    });
  }, [searchQuery, activeTags, sortBy]);

  // Dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resultCount={filteredFiles.length}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <TagFilters 
        tags={allTags}
        activeTags={activeTags}
        toggleTag={toggleTag}
        clearTags={() => setActiveTags([])}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <AnimatePresence mode="popLayout">
          {filteredFiles.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredFiles.map(file => (
                <FileCard 
                  key={file.id} 
                  file={file} 
                  onClick={setSelectedFile} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
                <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Nenhum arquivo encontrado</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                Tente ajustar seus filtros ou termos de busca para encontrar o registro desejado.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveTags([]);
                }}
                className="mt-6 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
              >
                Limpar filtros
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <FileModal 
        file={selectedFile} 
        isOpen={!!selectedFile} 
        onClose={() => setSelectedFile(null)} 
      />
      
      <BackToTop />
    </div>
  );
}
