# HandOff — 2026-04-18

## O que foi feito nesta sessão

- Definida e implementada arquitetura de backend gratuito (Fly.io + Cloudflare R2)
- Criado bucket `receitas-francamatheus` no Cloudflare R2 com Public Development URL ativa
- Gerado API Token R2 com permissão `Object Read & Write` restrito ao bucket
- Criado backend Python (FastAPI) em `backend/`: `main.py`, `r2.py`, `requirements.txt`, `Dockerfile`
- Instalado `flyctl` e autenticado com `francamatheus97@gmail.com`
- Criado app `receitas-backend` no Fly.io (região São Paulo)
- Configurados 6 secrets no Fly.io: `R2_ACCESS_KEY`, `R2_SECRET_KEY`, `R2_BUCKET`, `R2_ENDPOINT_URL`, `R2_PUBLIC_URL`, `API_KEY`
- Deploy do backend no Fly.io — rodando em `https://receitas-backend.fly.dev`
- Criado `backend/seed.py` e executado — dados das receitas gravados no R2 (`data.json`)
- Frontend migrado de `data.js` hardcoded para `fetch GET /data` no backend
- Criado `js/config.js` com a URL do backend
- Removido `js/data.js` (dados agora vivem no R2)
- Atualizado `index.html` para carregar `config.js` em vez de `data.js`
- Adicionado estado de loading e erro no boot do `app.js`
- `CLAUDE.md` atualizado com arquitetura, links e secrets
- `tasks.json` atualizado: tasks de backend marcadas como done, adicionadas tasks de "Adicionar receitas" (3 formas: manual, foto, link) + subtask de campo de texto com IA

## Decisões tomadas

- **R2 em vez de AWS S3:** free tier permanente e sem taxa de egress — melhor para uso pessoal
- **FastAPI em vez de Flask:** mais moderno, auto-docs, melhor para evoluir depois
- **`GET /data` e `PUT /data`:** API minimalista — um endpoint lê, outro grava o JSON inteiro. Simples e suficiente para uso single-user
- **`js/config.js`:** URL do backend separada do código para facilitar trocar entre local e produção
- **Credenciais:** ficam apenas em `backend/.env` (gitignored) e nos secrets do Fly.io. Nunca no git

## Estado atual

- Frontend: `receitas-francamatheus.netlify.app` — lendo dados do backend
- Backend: `https://receitas-backend.fly.dev` — FastAPI + R2
- Storage: Cloudflare R2, bucket `receitas-francamatheus`, arquivo `data.json`
- 2 receitas salvas: Hambúrguer Artesanal e Burger Sauce Clássico
- Auto-deploy Netlify ativo: push na `main` → site atualiza

## Arquitetura atual

```
Netlify (frontend)
  └── fetch GET https://receitas-backend.fly.dev/data
         └── Fly.io (FastAPI)
               └── boto3 → Cloudflare R2 → data.json
```

## Contexto técnico relevante

- Backend local: `cd backend && set -a && source .env && set +a && python3 -m uvicorn main:app --reload --port 8080`
- Novo deploy backend: `cd backend && flyctl deploy`
- Atualizar secrets Fly.io: `flyctl secrets set CHAVE=valor`
- Seed de dados: `cd backend && set -a && source .env && set +a && python3 seed.py`
- R2 Public URL: `https://pub-de1b4777eb0446bdb6695fd75f99cbdf.r2.dev`
- R2 S3 Endpoint: `https://d8d46018dd72f1d1edecdd0e604534f3.r2.cloudflarestorage.com`
- API_KEY do backend está em `backend/.env` (não commitado)

## Próximos passos (tasks.json)

- `[Feature] Adicionar receitas — 3 formas de entrada` (alta prioridade)
  - Manual: adaptar skill `/nova-receita` para publicar no R2
  - Campo de texto no site: usuário digita → Claude API estrutura → salva no R2
  - Foto: Claude visão extrai a receita
  - Link: scraping + parsing (Instagram/Pinterest têm limitações)
- `[Feature] Campo de busca` — filtro em tempo real por título
- `[Feature] Lista de compras compartilhável`
- `[Bug] Escala dinâmica completa` — passos do modo de preparo não escalam
