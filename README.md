# Status LGPD INPI

Aplicacao web em React + Vite para visualizacao e acompanhamento de informacoes de status relacionadas a LGPD no INPI.

## Stack

- React 19
- Vite 6
- TypeScript
- Tailwind CSS 4

## Requisitos

- Node.js 20+
- npm 10+

## Execucao local

1. Instale dependencias:

   npm install

2. Rode em desenvolvimento:

   npm run dev

3. Gere build de producao:

   npm run build

## Publicacao no GitHub

1. Inicialize o repositorio local (caso ainda nao exista):

   git init
   git add .
   git commit -m "chore: preparar projeto para deploy"
   git branch -M main
   git remote add origin https://github.com/dmenezes007/status-lgpd-inpi.git
   git push -u origin main

## Publicacao no Vercel

1. Acesse o Vercel e clique em **Add New > Project**.
2. Importe o repositorio `status-lgpd-inpi`.
3. Confirme as configuracoes:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Clique em **Deploy**.

## Observacoes

- O `vercel.json` ja esta configurado para SPA fallback em `index.html`.
- O `.gitignore` ja cobre artefatos locais e pasta `.vercel`.
