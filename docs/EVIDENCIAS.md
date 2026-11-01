# Evidências das verificações (01/11/2026)

Ambientes: navegador embutido do Claude Code (Chromium) e **Microsoft Edge 156** (headless), com servidor local
`python -m http.server`.

## Resultados

Execução automatizada no **Microsoft Edge 156** (controlado por DevTools, eventos de teclado reais), já com todas as correções abaixo aplicadas.

| Verificação | Resultado |
|---|---|
| Varredura de **todos os 58 estados** (slide/etapa) em **1366×768** e em **1920×1080**, incluindo checagem de corte horizontal e vertical | 0 problemas nos dois tamanhos |
| Teclado: `→`, `Espaço`, `PageDown` avançam etapa a etapa dentro do slide 7 (7.0→7.1→7.2→7.3); `←` e `PageUp` voltam; `Shift+→/←` trocam de slide; `Home`, `End`, `R` | Conforme esperado |
| `P` pausa e retoma | Confirmado |
| **Tela cheia (`F`)**: entra e sai | **Confirmado no Edge** |
| Demonstrações repetíveis: percorrer, `R`, percorrer de novo, comparar o resultado final (slides 1, 4, 7 e 8) | Idêntico nos quatro |
| `prefers-reduced-motion` (emulado no Edge): transições de 0,001 s, código do slide 7 aparece completo na hora, cursor sem animação | Confirmado |
| Inspeção visual no Edge, 1366×768: slides 1, 4, 7, 8, 9, 11; 1920×1080: slides 5, 8, 10 | Legíveis, sem sobreposição |
| Contraste calculado (WCAG): texto principal 16–18:1, secundário 7–8:1, dourado 8,6–9,6:1, verde/vermelho/âmbar ≥ 5,9:1, botão dourado 8,7:1 | Todos acima de 4,5:1 |
| Acessibilidade: `lang="pt-BR"`, landmarks `header`/`main`/`footer`, 0 botões sem nome, região `aria-live` que anuncia slide e etapa | Confirmado |
| Console da página (Edge e navegador embutido) | Nenhum erro ou aviso da apresentação |

Observações sobre o relatório automatizado:
- Os avisos de console listados no relatório vêm de **extensões do próprio Edge** (`chrome-extension://...`, carteira, tradutor), não da apresentação.
- A lista de "focáveis invisíveis" aparece só na etapa 0 dos slides 3, 6, 9 e 10 e é um **falso positivo**: o teste mediu 250 ms depois de abrir o slide, durante a animação de entrada, quando os botões ainda têm opacidade baixa. Eles são visíveis e utilizáveis logo depois.
- A checagem "eyebrow sem embaralhar" marcou `false` porque o texto lido junta a cópia oculta para leitores de tela com a cópia visível. A tela mostra o texto correto (visto na captura em movimento reduzido).

## Defeitos encontrados e corrigidos nesta rodada

1. **Slide 7, etapa 3:** o painel de código cortava as duas últimas linhas da função. Corrigido (altura do painel e entrelinha); medição depois: 12 linhas visíveis, sem corte.
2. **Contraste:** o cinza das legendas (`--faint`) tinha 3,5–3,8:1. Subiu para 5,2–5,7:1.
3. **Foco do teclado:** o botão "Corrigir" e outros itens revelados por etapa podiam receber foco mesmo invisíveis. Agora ficam fora do foco até aparecerem.
4. **Gates bloqueados** (slide 8) estavam apagados demais. Opacidade de 0,55 para 0,72.
5. **Título do slide 5** quebrava em "A / decisão…". Quebra de linha manual e `text-wrap: balance` nos títulos.

## Ritmo

Foram removidas 6 etapas (slide 1: de 4 para 3; slide 4: de 8 para 7) e adicionados glossários em português simples
(issue, branch, PR, CI, migration, seed, papéis, runners). Com 58 estados, o roteiro soma cerca de 11 minutos.

## Não verificado

- **Leitor de tela real** (NVDA, Narrador): não testado.
- **Chrome** com teclado real: não executado; o motor é o mesmo do Edge, e o navegador embutido do app (Chromium) passou nos testes de teclado.
- **Ensaio completo no equipamento da reunião** (projetor, resolução e escala do sistema): não substituível por teste automatizado.
- A inspeção visual cobriu parte dos estados; a varredura automática cobre os 58 por geometria, mas não julga estética.
