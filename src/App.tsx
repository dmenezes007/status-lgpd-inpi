/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header, SortOption } from './components/Header';
import { TagFilters, CategoryOption } from './components/TagFilters';
import { FileCard } from './components/FileCard';
import { FileModal } from './components/FileModal';
import { BackToTop } from './components/BackToTop';
import { FileItem } from './types';
import data from './data.json';

const imageByTheme = {
  legal: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
  governance: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
  security: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop',
  training: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop',
  communication: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
  data: 'https://images.unsplash.com/photo-1551281044-8bfe974b0e5d?q=80&w=1200&auto=format&fit=crop',
  policy: 'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?q=80&w=1200&auto=format&fit=crop',
  document: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
  privacy: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1200&auto=format&fit=crop',
};

function getThematicPreview(file: FileItem): string {
  const text = `${file.titulo} ${file.descricao}`.toLowerCase();

  if (file.tipo !== 'informacao') return imageByTheme.document;
  if (text.includes('legal') || text.includes('princ') || text.includes('termos')) return imageByTheme.legal;
  if (text.includes('governan') || text.includes('gest')) return imageByTheme.governance;
  if (text.includes('seguran') || text.includes('incidente')) return imageByTheme.security;
  if (text.includes('capacit') || text.includes('trein')) return imageByTheme.training;
  if (text.includes('comunica')) return imageByTheme.communication;
  if (text.includes('dados') || text.includes('ciclo') || text.includes('transfer')) return imageByTheme.data;
  if (text.includes('pol') || text.includes('privacidade')) return imageByTheme.policy;
  return imageByTheme.privacy;
}

function shortDescription(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= 110) return clean;
  return `${clean.slice(0, 107).trim()}...`;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryOption>('Todas');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const preparedData = useMemo(() => {
    return (data as FileItem[]).map((item) => ({
      ...item,
      descricao: shortDescription(item.descricao),
      preview: getThematicPreview(item),
    }));
  }, []);

  // Filter and sort logic
  const filteredFiles = useMemo(() => {
    const filtered = preparedData.filter(file => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        file.titulo.toLowerCase().includes(searchLower) ||
        file.descricao.toLowerCase().includes(searchLower) ||
        file.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        (file.tipo === 'informacao' ? 'informações' : 'documentos').includes(searchLower);

      const matchesCategory =
        activeCategory === 'Todas' ||
        (activeCategory === 'Informações' && file.tipo === 'informacao') ||
        (activeCategory === 'Documentos' && file.tipo !== 'informacao');

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      // Keep documents always before information cards.
      const aPriority = a.tipo === 'informacao' ? 1 : 0;
      const bPriority = b.tipo === 'informacao' ? 1 : 0;
      if (aPriority !== bPriority) return aPriority - bPriority;

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
  }, [preparedData, searchQuery, activeCategory, sortBy]);

  // Dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
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
                  setActiveCategory('Todas');
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
