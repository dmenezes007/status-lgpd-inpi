export type FileType = 'pdf' | 'imagem' | 'video' | 'planilha' | 'documento' | 'outro';

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
}
