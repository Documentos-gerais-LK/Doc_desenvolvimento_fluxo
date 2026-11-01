# React Bits: pesquisa, escolhas e licença

Referência: <https://reactbits.dev/> · <https://github.com/DavidHDev/react-bits>

## Resumo

Nenhum código do React Bits foi copiado nem instalado. Os componentes são em React; o projeto é
HTML/CSS/JS e a migração não se justifica (ver README). Os **padrões de interação** dos seis
componentes pesquisados foram reimplementados do zero em JS puro, com a identidade LK. Por isso não há
aviso de licença a preservar no código. Se um dia o código do React Bits for importado de fato, a
licença do repositório e seus avisos precisam acompanhá-lo, e o React Bits Pro exige licença
própria. Nada de Pro foi usado.

Licença verificada em 01/11/2026 no `LICENSE.md` do repositório oficial: **MIT + Commons Clause**
(© David Haz). Ela permite usar o código dentro de uma aplicação, site ou produto, desde que o
aviso de copyright acompanhe; a cláusula restringe revenda do código como produto em si.

## Escolhas

| Componente | Decisão | Onde entra | Implementação |
|---|---|---|---|
| **Stepper** | Usado | Slide 3 (8 etapas) e slide 6 (cadeia GitHub) | `buildTrack` em `slides.js`: trilho com preenchimento dourado, marcador que avança e estados feito/ativo/futuro |
| **Animated Content** | Usado | Entrada de cada slide e revelação por etapa | Classes `.ac` (cascata por `--i`) e `.rv` com `data-from/at/until` |
| **Animated List** | Usado | Linhas de terminal, log, checks de CI, linha do tempo do slide 9 | `lines()` e animação `fld-in` com atraso por item |
| **Decrypted Text** | Usado com contenção | Só os marcadores `eyebrow` de cada slide | `decrypt()` em `engine.js`; desligado em `prefers-reduced-motion` |
| **Spotlight Card** | Usado | Cartões interativos (atores, abas, cartões do quadro) | Variáveis `--mx/--my` e gradiente dourado discreto no `:hover` |
| **Dot Grid** | Usado | Fundo único de todos os slides | Canvas 2D, reage ao cursor, para quando a aba está oculta ou pausada |

Não instalado: nenhum outro componente. Motivo: cada animação extra teria de ajudar a entender
algo, e o Stepper, o conteúdo animado e as listas já cobrem os conceitos a explicar.
