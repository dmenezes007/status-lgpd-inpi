import { motion } from 'motion/react';
import { FileText, File as FileIcon, Eye, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileItem, FileType } from '../types';
import { cn } from '../utils';

interface FileCardProps {
  file: FileItem;
  onClick: (file: FileItem) => void;
}

const getIconForType = (type: FileType) => {
  switch (type) {
    case 'informacao': return <ShieldCheck className="text-indigo-500" size={24} />;
    case 'pdf': return <FileText className="text-red-500" size={24} />;
    default: return <FileIcon className="text-slate-500" size={24} />;
  }
};

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
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-lg">
            <Eye size={16} />
            Visualizar
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
          {getIconForType(file.tipo)}
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            {file.tipo === 'informacao' ? 'Informacao' : 'Documento'}
          </span>
        </div>
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-2 rounded-xl shadow-sm">
          {getIconForType(file.tipo)}
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
                {tag}
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
