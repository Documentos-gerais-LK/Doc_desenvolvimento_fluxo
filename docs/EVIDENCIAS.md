# Evidências das verificações (01/11/2026)

Ambiente: navegador embutido do Claude Code (Chromium), servidor local `python -m http.server`.

| Verificação | Resultado |
|---|---|
| Varredura de todos os estados (11 slides, 60 combinações slide/etapa) em **1366×768** | Nenhum elemento visível fora da área do palco ou da janela |
| A mesma varredura em **1920×1080** | Idem |
| Console do navegador, em toda a sessão de testes | Sem erros nem avisos |
| Teclado: `→`, `Espaço` percorrem as 8 etapas do slide 7 sem pular de slide; só depois avançam | Confirmado (7.0 → 7.7 → 8.0) |
| Teclado: `←` volta etapa a etapa e entra no slide anterior na última etapa | Confirmado |
| `Shift+←`, `Home`, `End`, `PageDown`, `R`, `P` | Confirmado (troca de slide, reinício, pausa) |
| Simulação do slide 7: código aparece linha a linha; checks de CI passam um a um | Confirmado (2 linhas aos 0,5 s, 12 ao fim; CI `ok,run,wait,wait` → `ok,ok,ok,ok`) |
| Inspeção visual das telas 1, 2, 3, 4, 5, 6, 7 (etapas 3, 4, 6, 7), 8, 9, 10, 11 em 1366×768 | Sem textos cortados ou sobrepostos |
| Layout estreito (≤ 960 px) | Colapsa em coluna única com rolagem; visto no slide 7 |

## Não verificado

- **Edge**: só foi testado em Chromium. Edge usa o mesmo motor, mas não foi aberto.
- **1920×1080 visual**: a varredura automática passou, mas só 1366×768 foi inspecionado a olho.
- **Tela cheia real (`F`)**: o código chama a API padrão; a ativação não foi exercitada no painel de teste.
- **`prefers-reduced-motion`**: tratado em CSS e JS, mas não simulado em um navegador.
- **Contraste**: cores escolhidas para alto contraste (texto claro sobre preto); não medido com ferramenta.
- **Fallback sem WebGL**: não se aplica, pois não há WebGL. O fundo usa canvas 2D.
- A varredura mede geometria; **não substitui um ensaio completo** da reunião no equipamento real.
