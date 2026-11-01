# Evidências das verificações (01/11/2026)

Ambientes: navegador embutido do Claude Code (Chromium) e **Microsoft Edge 156** (headless), com servidor local
`python -m http.server`.

## Resultados

| Verificação | Resultado |
|---|---|
| Varredura de todos os estados (60 combinações slide/etapa, antes do enxugamento do ritmo) em **1366×768** e em **1920×1080** | Nenhum elemento visível fora do palco ou da janela |
| Console do navegador, sessão de testes | Sem erros nem avisos |
| Teclado (navegador embutido): `→`, `Espaço` percorrem as 8 etapas do slide 7 sem pular de slide; `←` volta e entra no slide anterior na última etapa; `Shift+←/→`, `Home`, `End`, `PageDown`, `R`, `P` | Confirmado |
| Simulação do slide 7: código aparece linha a linha; checks de CI passam um a um | Confirmado |
| Demonstrações repetíveis com `R` | Confirmado nos slides 1 e 7 (`R` volta à etapa 0; o código e o terminal rodam de novo) |
| Inspeção visual no **Edge**, 1366×768: slides 4 (etapa 6), 7 (etapas 3, 4 e 7), 8, 9, 11 | Legíveis, sem sobreposição |
| Inspeção visual no **Edge**, 1920×1080: slides 5, 8 e 10 | Legíveis, sem sobreposição |
| `prefers-reduced-motion` no **Edge** (`--force-prefers-reduced-motion`): slides 1 e 7 | Conteúdo aparece completo e imediato, sem embaralhar texto |
| Contraste calculado (WCAG): texto principal 16–18:1, texto secundário 7–8:1, dourado 8,6–9,6:1, verde/vermelho/âmbar ≥ 5,9:1, botão dourado com texto escuro 8,7:1 | Todos acima de 4,5:1 após ajuste do cinza das legendas |
| Acessibilidade: botões escondidos não recebem mais foco do teclado; texto embaralhado fica `aria-hidden` e o texto real fica disponível a leitores de tela; região `aria-live` anuncia slide e etapa | Implementado; verificado por leitura de código |

## Defeitos encontrados e corrigidos nesta rodada

1. **Slide 7, etapa 3:** o painel de código cortava as duas últimas linhas da função. Corrigido (altura do painel e entrelinha); medição depois: 12 linhas visíveis, sem corte.
2. **Contraste:** o cinza das legendas (`--faint`) tinha 3,5–3,8:1. Subiu para 5,2–5,7:1.
3. **Foco do teclado:** o botão "Corrigir" e outros itens revelados por etapa podiam receber foco mesmo invisíveis. Agora ficam fora do foco até aparecerem.
4. **Gates bloqueados** (slide 8) estavam apagados demais. Opacidade de 0,55 para 0,72.
5. **Título do slide 5** quebrava em "A / decisão…". Quebra de linha manual e `text-wrap: balance` nos títulos.

## Ritmo

Foram removidas 6 etapas (slide 1: de 4 para 3; slide 4: de 8 para 7) e adicionados glossários em português simples
(issue, branch, PR, CI, migration, seed, papéis, runners). Com 58 estados, o roteiro soma cerca de 11 minutos.

## Não verificado, ou verificado só em parte

- **Varredura completa pós-correção:** depois dos ajustes finais (altura do código, foco, títulos), a varredura automática
  de todos os estados **não foi refeita**. Uma execução completa no Edge foi interrompida a seu pedido. A correção do
  código foi confirmada por medição direta (12 linhas, sem corte), e o restante só por inspeção visual pontual.
- **Tela cheia (`F`)**: o painel de teste bloqueia a API (`Permissions check failed`). O teste com tecla real no Edge foi
  interrompido antes de rodar. O código usa a API padrão `requestFullscreen`, mas **não foi comprovado em execução**.
  Confirme com `F` antes da reunião.
- **Teclado no Edge:** só o navegador embutido foi testado; o Edge só serviu para capturas e reduced-motion.
- **Leitor de tela real**: não testado.
- A varredura mede geometria; **não substitui um ensaio completo** no equipamento da reunião.
