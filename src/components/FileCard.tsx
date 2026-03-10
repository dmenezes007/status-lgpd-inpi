import { motion } from 'motion/react';
import { Eye } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileItem } from '../types';
import { cn } from '../utils';

interface FileCardProps {
  file: FileItem;
  onClick: (file: FileItem) => void;
}

function formatTag(tag: string): string {
  return tag.toLowerCase() === 'lgpd' ? 'LGPD' : tag;
}

const patternStyles: Record<string, { a: string; b: string; c: string; d: string }> = {
  legal: { a: '#312e81', b: '#6366f1', c: '#c7d2fe', d: '#e0e7ff' },
  governance: { a: '#14532d', b: '#22c55e', c: '#bbf7d0', d: '#dcfce7' },
  security: { a: '#7f1d1d', b: '#ef4444', c: '#fecaca', d: '#fee2e2' },
  training: { a: '#713f12', b: '#f59e0b', c: '#fde68a', d: '#fffbeb' },
  communication: { a: '#0c4a6e', b: '#06b6d4', c: '#a5f3fc', d: '#ecfeff' },
  data: { a: '#1e3a8a', b: '#3b82f6', c: '#bfdbfe', d: '#eff6ff' },
  policy: { a: '#581c87', b: '#a855f7', c: '#e9d5ff', d: '#faf5ff' },
  document: { a: '#3f3f46', b: '#71717a', c: '#d4d4d8', d: '#f4f4f5' },
  privacy: { a: '#164e63', b: '#0891b2', c: '#bae6fd', d: '#ecfeff' },
};

function PatternPreview({ theme, id }: { theme: string; id: number }) {
  const style = patternStyles[theme] || patternStyles.privacy;
  const patternId = `p-${theme}-${id}`;

  return (
    <svg viewBox="0 0 640 360" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id={`g-${patternId}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={style.d} />
          <stop offset="100%" stopColor={style.c} />
        </linearGradient>
        <pattern id={patternId} x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
          <rect width="44" height="44" fill="transparent" />
          <circle cx="8" cy="8" r="3" fill={style.b} opacity="0.45" />
          <path d="M0 44L44 0" stroke={style.a} strokeWidth="1.5" opacity="0.35" />
          <path d="M22 0V44" stroke={style.b} strokeWidth="1" opacity="0.25" />
        </pattern>
      </defs>
      <rect width="640" height="360" fill={`url(#g-${patternId})`} />
      <rect width="640" height="360" fill={`url(#${patternId})`} />
      <circle cx="530" cy="66" r="88" fill={style.b} opacity="0.18" />
      <circle cx="110" cy="310" r="120" fill={style.a} opacity="0.12" />
      <rect x="40" y="40" width="220" height="10" rx="5" fill={style.a} opacity="0.24" />
      <rect x="40" y="62" width="150" height="8" rx="4" fill={style.b} opacity="0.22" />
    </svg>
  );
}

export function FileCard({ file, onClick }: FileCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(file)}
      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
    >
      {/* Preview Area */}
      <div className="relative aspect-video bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
        <PatternPreview theme={file.preview} id={file.id} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-lg">
            <Eye size={16} />
            Visualizar
          </div>
        </div>
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200">
          {file.tipo === 'informacao' ? 'Informações' : 'Documentos'}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 leading-tight line-clamp-2">
            {file.titulo}
          </h3>
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-grow">
          {file.descricao}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {file.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 capitalize"
              >
                {formatTag(tag)}
              </span>
            ))}
            {file.tags.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                +{file.tags.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="font-medium text-slate-700 dark:text-slate-400">{file.categoria}</span>
            <time dateTime={file.data}>
              {format(new Date(file.data), "dd 'de' MMM, yyyy", { locale: ptBR })}
            </time>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
