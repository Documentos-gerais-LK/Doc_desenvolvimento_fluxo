# Roteiro atualizado — Lukas para Leonardo

**Data:** 01/11/2026 · **Duração:** 10 a 12 min + perguntas
**Mensagem central:** a LK transforma desenvolvimento em um processo rastreável, auditável e compartilhado entre os sócios.

**Como conduzir:** `→` avança uma etapa dentro do slide; ao fim das etapas, passa ao próximo slide.
Deixe cada animação terminar antes de falar a frase-chave. Nos slides 3, 6, 9 e 10 você também
pode clicar no item. Marcações **[etapa N]** indicam em que ponto da demonstração falar.

## 01 — Abertura (45 s) · 4 etapas
**[etapa 1]** > "Léo, hoje quero te mostrar exatamente como estou desenvolvendo. Não é uma apresentação de funcionalidades. É o processo que a gente precisa ter como empresa."
**[etapas 2 a 4]** Deixe as linhas aparecerem. Pare em *homologação… aguardando GO*: "Repara que CI verde não é o mesmo que entregue. Esse é o fio da conversa."

## 02 — Por que mudamos (1 min) · 3 etapas
**[etapa 1, Antes]** > "Quando a gente trabalhou em algumas entregas do Davi, percebi que a nossa forma de executar precisava amadurecer. Você não tinha como ver em tempo real, e o escopo às vezes mudava durante a construção."
**[etapa 2, Hoje]** > "Hoje a demanda vira issue, o código fica ligado a ela, e a qualidade tem evidência."
**[etapa 3, tabela]** Percorra as três perguntas. *Fale do processo, nunca de pessoas.*

## 03 — O fluxo completo (1 min 30) · 8 etapas
Avance etapa por etapa, uma frase por etapa, usando só **Entra → O que acontece → Evidência**.
> "Se alguma etapa falha, a tarefa volta. O importante é a decisão e a evidência ficarem registradas."

## 04 — Uma ideia vira uma issue (1 min) · 8 etapas
**[etapa 0]** Leia a ideia: "Precisamos permitir que um novo usuário crie sua conta na LK."
**[etapas 1 a 6]** Uma seção por etapa. **[etapa 7]** > "Por isso não começamos escrevendo código. Sem escopo, sem aceite e sem dependências, o código cresce sem limite." Lembre que é um exemplo didático; o LK Identity tem regras de identidade e permissão que não podem ser improvisadas.

## 05 — Como uso IA (1 min) · 6 etapas
Mia → DDAE (quando aplicável) → Claude Code → você. Em cada etapa, diga o que sai (especificação, decisão, diff + testes, aprovação ou devolução).
> "A IA acelera, mas não decide sozinha o que o cliente precisa nem quando é seguro publicar."

## 06 — GitHub e rastreabilidade (1 min) · 6 etapas
Epic → Issue → Branch → PR → CI → Checkpoint.
> "O Project dá a visão da carteira; o PR dá a evidência da mudança específica." Se possível, abra o Project real depois.

## 07 — Meu dia a dia (2 min) · 8 etapas (o slide mais interativo)
Fale antes de avançar: é uma **simulação**, os comandos e logs são ilustrativos.
Etapas: card → branch → código → testes → PR → CI → resultado. Na última: > "Ficou validado no primeiro gate. Ainda não está publicado: faltam homologação e publicação." Use `R` se quiser repetir.

## 08 — Como sabemos que está pronto (1 min 30) · 5 etapas
**[etapa 1]** O teste falha e o pipeline bloqueia. Clique em **Corrigir** (ou `→`).
**[etapa 3]** Gate técnico aprovado. **[etapa 4]** > "Código escrito, CI verde, merge, homologação e produção são coisas diferentes. Um teste pode passar em ambiente sintético e a jornada ainda não estar aprovada para usuários reais."

## 09 — Casos reais (1 min) · 3 etapas
> "Clientes V2 foi homologado localmente, com 26 migrations e 54 combinações de papéis. O Identity tem seu Epic e uma trilha mais sensível para Google OIDC. No Wallet, a migration 0013 realmente foi executada em produção, com backup e checagens. São três estados diferentes."
**Não diga** que Clientes V2 foi publicado sem um GO posterior. Os dados são checkpoints até 31/10.

## 10 — Como você acompanha (1 min) · 6 etapas
Clique ou avance pelos cartões: em execução, bloqueado, decisão pendente, concluído. Em cada um, leia **Evidência → Próximo passo → Quem decide**.
> "Você não precisa conhecer o código. Precisa acompanhar a empresa e participar das decisões de negócio." O quadro é ilustrativo; o real está no GitHub Project.

## 11 — Fechamento (1 min) · 3 etapas
**[etapa 1]** As oito etapas se alinham: *"compreensível, rastreável e verificável."*
**[etapa 2]** Leia as quatro prioridades e feche com a pergunta ao Léo.

## Perguntas que podem surgir
- **"IA faz tudo sozinha?"** Não. Ela acelera pesquisa, implementação e verificação; escopo, critérios e o GO continuam humanos e auditáveis.
- **"Onde vejo o andamento?"** Project para a visão macro; issue para o escopo; PR e CI para evidências; checkpoint para homologação e publicação.
- **"Quanto desse fluxo já funciona?"** Há experiências comprovadas nos projetos citados. Padronizar para toda demanda futura ainda é consolidação.
- **"Quem decide prioridade e prazo?"** Lukas traz avaliação técnica e risco; Leonardo, necessidade comercial e percepção do cliente; compromissos externos e mudanças relevantes, em conjunto.
