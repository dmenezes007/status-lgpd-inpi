export type FileType = 'informacao' | 'pdf' | 'documento';

export interface FileItem {
  id: number;
  titulo: string;
  descricao: string;
  tags: string[];
  categoria: string;
  tipo: FileType;
  data: string;
  preview: string;
  arquivo: string;
  conteudo?: string;
}
