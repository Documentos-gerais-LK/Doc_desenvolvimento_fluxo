# Roteiro atualizado — Lukas para Leonardo

**Data:** 01/11/2026, 16h · **Duração:** cerca de 11 min + perguntas
**Mensagem central:** a LK transforma desenvolvimento em um processo rastreável, auditável e compartilhado entre os sócios.

## Como conduzir

- `→` ou `Espaço` avançam **uma etapa** dentro do slide; ao fim das etapas, passam ao próximo slide. `←` volta.
- Fale **depois** que a animação aparecer, não durante: cada etapa leva 1 a 3 segundos para se formar.
- Nos slides 3, 6, 9 e 10 você pode também **clicar no item** para saltar até ele.
- `R` reinicia a demonstração do slide (útil se Léo pedir "mostra de novo"). `P` pausa as animações. `F` tela cheia.
- No slide 7 e no 8, tudo é **simulação**. Diga isso uma vez, logo no início de cada um.
- Os termos técnicos já aparecem explicados na tela (faixa "Em português" no slide 7, definição de issue no 4, legenda no 9). Não precisa explicá-los de novo.

## Tempo por slide

| # | Slide | Etapas | Tempo |
|---|---|---|---|
| 01 | Abertura | 3 | 0:45 |
| 02 | Por que mudamos | 3 | 1:00 |
| 03 | Fluxo completo | 8 | 1:30 |
| 04 | Ideia vira issue | 7 | 1:00 |
| 05 | Uso de IA | 6 | 1:00 |
| 06 | GitHub | 6 | 1:00 |
| 07 | Meu dia a dia | 8 | 1:45 |
| 08 | Como sabemos que está pronto | 5 | 1:15 |
| 09 | Casos reais | 3 | 1:00 |
| 10 | Como você acompanha | 6 | 1:00 |
| 11 | Fechamento | 3 | 0:45 |
| | **Total** | **58** | **≈ 11:00** |

Se o tempo apertar, os slides 5 e 6 podem ser percorridos mais rápido (5 segundos por etapa); os slides 7 e 8 são os que mais ensinam, preserve-os.

## 01 — Abertura (45 s) · 3 etapas
**[1]** > "Léo, hoje quero te mostrar exatamente como estou desenvolvendo. Não é uma apresentação de funcionalidades. É o processo que a gente precisa ter como empresa."
**[2 e 3]** Deixe as linhas aparecerem. Pare em *homologação… aguardando GO*: "Repara: CI verde não é o mesmo que entregue. Esse é o fio da conversa."

## 02 — Por que mudamos (1 min) · 3 etapas
**[1, Antes]** > "Quando a gente trabalhou em algumas entregas do Davi, percebi que a nossa forma de executar precisava amadurecer. Você não tinha como ver em tempo real, e o escopo às vezes mudava durante a construção."
**[2, Hoje]** > "Hoje a demanda vira uma tarefa escrita, o código fica ligado a ela, e a qualidade tem evidência."
**[3, tabela]** Percorra as três perguntas. *Fale do processo, nunca de pessoas.*

## 03 — O fluxo completo (1 min 30) · 8 etapas
Uma frase por etapa, usando só **Entra → O que acontece → Evidência**. Não leia a ferramenta.
> "Se alguma etapa falha, a tarefa volta. O importante é a decisão e a evidência ficarem registradas."

## 04 — Uma ideia vira uma issue (1 min) · 7 etapas
**[1]** Leia a ideia: "Precisamos permitir que um novo usuário crie sua conta na LK." A faixa já explica o que é uma issue.
**[2 a 5]** Problema, objetivo, escopo e exclusões, critérios de aceite, dependências. É um exemplo didático, não uma issue real.
**[6]** > "Por isso não começamos escrevendo código. Sem escopo, sem aceite e sem dependências, o código cresce sem limite e ninguém prova que funciona." O LK Identity tem regras de identidade e permissão que não podem ser improvisadas.

## 05 — Como uso IA (1 min) · 6 etapas
Mia → DDAE (quando aplicável) → Claude Code → você. Em cada etapa, diga o que sai (escopo, decisão justificada, diff e testes, aprovação ou devolução).
> "A IA acelera, mas não decide sozinha o que o cliente precisa nem quando é seguro publicar."

## 06 — GitHub e rastreabilidade (1 min) · 6 etapas
Epic → Issue → Branch → PR → CI → Checkpoint. Em cada um, leia só **Papel**.
> "O Project dá a visão da carteira; o PR dá a evidência da mudança específica." Se possível, abra o Project real depois.

## 07 — Meu dia a dia (1 min 45) · 8 etapas (o mais interativo)
Antes de avançar: "Isto é uma **simulação**; os comandos e logs são ilustrativos."
Card → branch → código → testes → PR → CI → resultado. Em cada etapa, leia a faixa **Em português** em voz alta. Na última:
> "Ficou validado no primeiro gate. Ainda não está publicado: faltam homologação e publicação."
Use `R` para repetir.

## 08 — Como sabemos que está pronto (1 min 15) · 5 etapas
**[1]** O teste falha e o pipeline bloqueia. Clique em **Corrigir** (ou `→`).
**[3]** Gate técnico aprovado. **[4]** > "Código escrito, CI verde, merge, homologação e produção são coisas diferentes. Um teste pode passar em ambiente sintético e a jornada ainda não estar aprovada para usuários reais."

## 09 — Casos reais (1 min) · 3 etapas
> "Clientes V2 foi homologado localmente, com 26 migrations e 54 combinações de papéis. O Identity tem seu Epic e uma trilha mais sensível para Google OIDC. No Wallet, a migration 0013 realmente foi executada em produção, com backup e checagens. São três estados diferentes."
**Não diga** que Clientes V2 foi publicado sem um GO posterior. Os dados são checkpoints até 31/10.

## 10 — Como você acompanha (1 min) · 6 etapas
Clique ou avance pelos cartões. Em cada um, leia **Evidência → Próximo passo → Quem decide**. Foque em "Decisão pendente" e "Bloqueado", pois é onde o Léo participa.
> "Você não precisa conhecer o código. Precisa acompanhar a empresa e participar das decisões de negócio." O quadro é ilustrativo; o real está no GitHub Project.

## 11 — Fechamento (45 s) · 3 etapas
**[2]** As oito etapas se alinham: *"compreensível, rastreável e verificável."*
**[3]** Leia as quatro prioridades e feche com a pergunta ao Léo.

## Perguntas que podem surgir
- **"IA faz tudo sozinha?"** Não. Ela acelera pesquisa, implementação e verificação; escopo, critérios e o GO continuam humanos e auditáveis.
- **"Onde vejo o andamento?"** Project para a visão macro; issue para o escopo; PR e CI para evidências; checkpoint para homologação e publicação.
- **"Quanto desse fluxo já funciona?"** Há experiências comprovadas nos projetos citados. Padronizar para toda demanda futura ainda é consolidação.
- **"Quem decide prioridade e prazo?"** Lukas traz avaliação técnica e risco; Leonardo, necessidade comercial e percepção do cliente; compromissos externos e mudanças relevantes, em conjunto.

## Antes de começar (2 minutos)
1. Abra a apresentação (ver README) em **Chrome ou Edge** e pressione `F`.
2. Passe pelo slide 1 e volte com `R`, para confirmar que a tela ou o projetor mostram tudo sem cortes.
3. Deixe o cursor fora do centro da tela; clicar no fundo avança o slide.
