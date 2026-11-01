# Auditoria do projeto de partida

Arquivo auditado: `referencia-original/LK_Apresentacao_Fluxo_Standalone.html` (249 KB) e o roteiro
`ROTEIRO-REUNIAO-LEO.md`. A cópia original foi preservada sem alterações.

## Estrutura e arquitetura

- Arquivo único com CSS e JS embutidos. 11 seções `section.block` em rolagem vertical contínua.
- Fontes (Supreme e Kdam Thmor Pro, da iRede) embutidas em base64.
- **Three.js 0.160 carregado por CDN** para a rede 3D da abertura. É a única dependência externa
  e exige internet na reunião.
- Navegação: teclado (setas, espaço, PageUp/PageDown), pontos laterais, `IntersectionObserver`,
  `prefers-reduced-motion`, pausa fora da tela, fallback sem WebGL.

## Conteúdo e didática

- Cada slide é um bloco de texto com título, parágrafo de apoio e uma lista ou grade estática.
- Nenhum slide tem etapa interna. O fluxo de 8 etapas (slide 3) mostra todas as descrições de uma vez.
- Sem exemplos de código, terminal, issue, PR ou CI. O assunto "desenvolvimento de software" é
  dito, mas não mostrado.
- Slides 7 (rotina) e 8 (gates) descrevem processos sequenciais em lista, sem animação que ensine.

## Problemas visuais

- Paleta azul-marinho com verde-limão e verde-água (herdada de outro projeto), em vez do preto,
  grafite e dourado da LK.
- Muitos cartões e bordas disputando atenção; título e conteúdo no mesmo peso.
- A rede 3D é decorativa e custa GPU; não explica nada.

## O que foi reaproveitado

- Todo o conteúdo factual e a ordem dos 11 slides (reorganizados em tom e ênfase).
- Os controles de teclado e o princípio de pausar o que não está visível.
- A distinção "CI verde ≠ entrega" e os três gates, agora demonstrados em vez de listados.

## O que mudou e por quê

| Antes | Agora |
|---|---|
| Rolagem contínua | Um slide por vez, com **etapas internas** controladas pelo apresentador |
| Texto corrido | Fluxos clicáveis, terminal, editor, issue, PR, checks e quadro de Project |
| Three.js via CDN | Nenhuma dependência externa; fundo em canvas 2D leve (Dot Grid) |
| Paleta iRede | Preto, grafite e dourado LK |
| Fallback WebGL necessário | Não há WebGL; o fallback deixou de ser preciso |
