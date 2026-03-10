import { motion } from 'motion/react';
import { Eye } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileItem } from '../types';
import { cn } from '../utils';

interface FileCardProps {
  file: FileItem;
  rowIndex: number;
  onClick: (file: FileItem) => void;
}

function formatTag(tag: string): string {
  return tag.toLowerCase();
}

const previewGradients: Record<string, { base: string; accentA: string; accentB: string }> = {
  legal: { base: 'from-blue-700 via-indigo-500 to-sky-300', accentA: 'bg-blue-900/30', accentB: 'bg-sky-100/45' },
  governance: { base: 'from-emerald-700 via-green-500 to-lime-300', accentA: 'bg-emerald-900/30', accentB: 'bg-lime-100/45' },
  security: { base: 'from-rose-700 via-red-500 to-orange-300', accentA: 'bg-rose-900/30', accentB: 'bg-orange-100/45' },
  training: { base: 'from-amber-700 via-yellow-500 to-orange-200', accentA: 'bg-amber-900/30', accentB: 'bg-yellow-100/45' },
  communication: { base: 'from-cyan-700 via-sky-500 to-teal-300', accentA: 'bg-cyan-900/30', accentB: 'bg-teal-100/45' },
  data: { base: 'from-blue-800 via-cyan-500 to-cyan-200', accentA: 'bg-blue-950/30', accentB: 'bg-cyan-100/45' },
  policy: { base: 'from-violet-700 via-fuchsia-500 to-pink-300', accentA: 'bg-violet-900/30', accentB: 'bg-pink-100/45' },
  document: { base: 'from-slate-700 via-zinc-500 to-stone-300', accentA: 'bg-slate-900/30', accentB: 'bg-stone-100/45' },
  privacy: { base: 'from-teal-700 via-cyan-500 to-blue-300', accentA: 'bg-teal-900/30', accentB: 'bg-blue-100/45' },
};

function GradientPreview({ theme }: { theme: string }) {
  const gradient = previewGradients[theme] || previewGradients.privacy;

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient.base}`} aria-hidden="true">
      <div className={`absolute -top-14 -right-10 h-44 w-44 rounded-full blur-2xl ${gradient.accentB}`} />
      <div className={`absolute -bottom-16 -left-12 h-52 w-52 rounded-full blur-2xl ${gradient.accentA}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.28),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.16),transparent_46%)]" />
      <div className="absolute inset-0 flex items-center justify-center opacity-25">
        <ShieldCheck className="h-24 w-24 text-white drop-shadow-md" strokeWidth={1.8} />
      </div>
    </div>
  );
}

export function FileCard({ file, onClick }: FileCardProps) {
  const cardGradient = previewGradients[file.preview] || previewGradients.privacy;

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
      <div className={`h-1.5 w-full bg-gradient-to-r ${cardGradient.base}`} />
      {/* Preview Area */}
      <div className="relative aspect-video overflow-hidden">
        <GradientPreview theme={file.preview} />
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

        <div className="mt-auto space-y-4 pt-1">
          <div className="flex flex-wrap gap-2">
            {file.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
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
