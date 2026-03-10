import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Link as LinkIcon, ExternalLink, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileItem } from '../types';
import { cn } from '../utils';

interface FileModalProps {
  file: FileItem | null;
  isOpen: boolean;
  onClose: () => void;
}

function formatTag(tag: string): string {
  return tag.toLowerCase() === 'lgpd' ? 'LGPD' : tag;
}

export function FileModal({ file, isOpen, onClose }: FileModalProps) {
  if (!file) return null;

  const isInfo = file.tipo === 'informacao';
  const safeFileUrl = file.arquivo ? encodeURI(file.arquivo) : '';

  const handleCopyLink = () => {
    const finalLink = isInfo ? window.location.href : `${window.location.origin}${safeFileUrl}`;
    navigator.clipboard.writeText(finalLink);
    // In a real app, show a toast notification here
  };

  const modalDescription = (() => {
    if (isInfo) {
      const blocks = (file.conteudo || '')
        .split(/\n\s*\n/)
        .map((part) => part.trim())
        .filter(Boolean);
      const candidate = blocks.find((part) => part.toLowerCase() !== file.titulo.toLowerCase()) || file.descricao;
      return candidate.length > 420 ? `${candidate.slice(0, 417).trim()}...` : candidate;
    }

    return `Documento institucional relacionado a ${file.titulo}, disponibilizado para consulta oficial, visualizacao direta e download no contexto da implementacao da LGPD no INPI.`;
  })();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="pr-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {file.titulo}
                </h2>
                <div className="flex items-center gap-3 mt-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">{file.categoria}</span>
                  <span>•</span>
                  <time dateTime={file.data}>
                    {format(new Date(file.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </time>
                </div>
              </div>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col lg:flex-row gap-8">
              
              {/* Preview Section */}
              <div className="flex-1 min-h-[400px] bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center relative group">
                {isInfo ? (
                  <div className="w-full h-full overflow-y-auto p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 p-2 rounded-lg">
                        <ShieldCheck size={20} />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">Informacoes da Implementacao da LGPD</h3>
                    </div>
                    <div className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-200">
                      {file.conteudo || file.descricao}
                    </div>
                  </div>
                ) : file.tipo === 'pdf' ? (
                  <iframe
                    src={`${safeFileUrl}#toolbar=0`}
                    className="w-full h-full min-h-[500px]"
                    title={file.titulo}
                  />
                ) : (
                  <a
                    href={safeFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
                  >
                    Abrir documento
                  </a>
                )}
                
                {/* Overlay for non-interactive previews */}
                {!isInfo && file.tipo !== 'pdf' && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                    <a
                      href={safeFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-xl pointer-events-auto hover:scale-105"
                    >
                      <ExternalLink size={18} />
                      Abrir Original
                    </a>
                  </div>
                )}
              </div>

              {/* Details Sidebar */}
              <div className="w-full lg:w-80 flex flex-col gap-6 flex-shrink-0">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                    Descricao
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {modalDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {file.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 capitalize"
                      >
                        {formatTag(tag)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  {!isInfo && (
                    <>
                      <a
                        href={safeFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
                      >
                        <ExternalLink size={18} />
                        Visualizar Completo
                      </a>
                      <a
                        href={safeFileUrl}
                        download
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-medium transition-colors"
                      >
                        <Download size={18} />
                        Baixar
                      </a>
                    </>
                  )}
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-medium transition-colors"
                    title="Copiar Link"
                  >
                    <LinkIcon size={18} />
                    {isInfo ? 'Copiar link desta informacao' : 'Copiar link do documento'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
