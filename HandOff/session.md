# HandOff — 2026-03-31

## O que foi feito nesta sessão

- Instalado `gh` CLI via Homebrew e autenticado com conta `francamatheus`
- Criado `.gitignore` (`.DS_Store` + `.claude/settings.local.json`)
- Inicializado repositório git com 2 commits iniciais
- Criado repo público no GitHub: `github.com/francamatheus/receitas`
- Instalado `netlify-cli` via npm e autenticado com `francamatheus97@gmail.com`
- Criado site no Netlify (`receitas-francamatheus`) e deploy manual feito
- Configurado auto-deploy via GitHub pelo painel do Netlify (feito pelo usuário)
- Atualizado `CLAUDE.md` com seção "Sobre o projeto", links das plataformas e planos futuros
- Asana: 4 tasks marcadas como concluídas, 1 task renomeada e atualizada com subtasks, 1 nova feature criada

## Decisões tomadas

- **Deploy manual → auto-deploy:** optamos por conectar o GitHub ao Netlify pelo painel web para ativar CI/CD. Campos Base directory, Build command e Publish directory ficaram em branco (site estático puro).
- **Não migrar para React/Next.js:** stack atual (HTML + CSS + JS vanilla) é adequada para o projeto. Migração só faria sentido se houvesse dados externos, auth ou roteamento complexo.
- **Pipeline de dados futuro:** em vez de React, a evolução planejada é mover receitas do `data.js` para `.md` com frontmatter YAML + script `build/generate-data.js` que gera o `data.js` automaticamente.
- **`.netlify/` no `.gitignore`:** adicionado automaticamente pelo CLI. Mantido assim — é config local.

## Estado atual

- Site no ar em `receitas-francamatheus.netlify.app`, funcionando no celular
- Auto-deploy configurado: push na `main` → Netlify atualiza automaticamente
- 2 receitas salvas: Hambúrguer Artesanal e Burger Sauce Clássico
- Asana com tasks organizadas em seções: FEATURE, TECH DEBIT, INFRA

## Próximos passos (Asana)

- `[Feature] Campo de busca de receitas` — filtro em tempo real por título (recém criada)
- `Ajustes no formulário de importação`
- `[Feature] Lista de compras compartilhável`
- `[Feature] Escala dinâmica completa — atualizar texto do Modo de Preparo`
- `Refatorar pipeline de dados` (Tech Debit) — `.md` → `generate-data.js` → `data.js`
- `Task 1` (vence 02/04) e `Task 2` (vence 03/04) — conteúdo desconhecido, verificar no Asana

## Contexto técnico relevante

- Deploy manual: `netlify deploy --dir=. --prod` (rodar dentro de `/Users/matheusfranca/Documents/Receitas`)
- Push para GitHub: `git push` (remote `origin` já configurado)
- `gh` e `netlify` CLI instalados globalmente, autenticações ativas
- Asana: seção FEATURE GID `1213886803990526`, projeto Receitas GID `1213886804050258`
- Task "Refatorar pipeline" GID `1213893299407756` com 5 subtasks mapeadas
