import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Download, X, FileText } from 'lucide-react';

interface RecommendationFile {
  label: string;
  href: string;
}

const recommendationFiles: RecommendationFile[] = [
  {
    label: 'Acordao no 1372/2025 - TCU-Plenario',
    href: '/recommendation/Acórdão nº 1372-2025 - TCU-Plenário.pdf',
  },
  {
    label: 'Oficio no 24647/2025 - TCU',
    href: '/recommendation/Ofício nº 24647-2025 - TCU.pdf',
  },
  {
    label: 'Relatorio de Fiscalizacao - TCU',
    href: '/recommendation/Relatório de Fiscalização - TCU.pdf',
  },
];

export function RecommendationBar() {
  const [selectedFile, setSelectedFile] = useState<RecommendationFile | null>(null);

  return (
    <>
      <section className="w-full bg-indigo-50/70 dark:bg-slate-900 border-b border-indigo-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-3 w-3 flex-shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-70" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-indigo-600" />
            </span>
            <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 tracking-wide">
              Recomendação Prioritária - TCU
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Titulo</p>
              <p className="font-semibold mt-1">Acordao 1372/2025 - TCU - Plenario - Recomendacao 9.1.9</p>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Origem da Recomendacao</p>
              <p className="font-semibold mt-1">TCU</p>
            </div>

            <div className="md:col-span-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-2">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Texto da Recomendacao</p>
              <p>
                9.1. recomendar, com fundamento no art. 250, III, do RITCU c/c o art. 11 da Resolucao - TCU 315/2020, a adocao das seguintes providencias: (...)
              </p>
              <p>
                9.1.9. às organizações auditadas, quanto à questão 5.2. (Tabela 6 peça 949, p. 20), que adotem de medidas para aprimoramento da conformidade do tratamento dos dados pessoais coletados, considerando os critérios previstos na Lei 13.709/2018, art. 5°, inciso XVII, art. 6°, em especial incisos I, Il e III, e arts. 7º, 37, 38 e 40, bem como na norma ABNT NBR ISO/IEC 27701:2019, itens 7.2.1 (Iden>ficação e documentação do propósito), 7.2.2 (Identificação de bases legais), 7.2.5 (Avaliação de impacto de privacidade), 7.2.8 (Registros relativos ao tratamento de dados pessoais), 7.4.1 (Limite de coleta) e 7.4.7 (Retenção).
              </p>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Data Limite de Implementacao</p>
              <p className="font-semibold mt-1">31/03/2026</p>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Categorias</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Aperfeicoamento da governanca, da gestao de riscos e dos controles internos</li>
                <li>Governanca</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {recommendationFiles.map((file) => (
              <button
                key={file.href}
                onClick={() => setSelectedFile(file)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-indigo-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
              >
                <FileText size={16} />
                {file.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFile(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 pr-10">{selectedFile.label}</h3>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                  aria-label="Fechar"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 flex-1 min-h-[560px]">
                <iframe
                  src={encodeURI(selectedFile.href)}
                  title={selectedFile.label}
                  className="w-full h-full rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3 justify-end">
                <a
                  href={encodeURI(selectedFile.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                >
                  <ExternalLink size={16} />
                  Abrir em nova aba
                </a>
                <a
                  href={encodeURI(selectedFile.href)}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                >
                  <Download size={16} />
                  Baixar
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
