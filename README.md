# LK Technologies Brasil — Como a LK desenvolve software hoje

Apresentação interativa para a reunião entre Lukas e Leonardo (01/11/2026). O objetivo é que uma
pessoa entenda o fluxo de desenvolvimento da LK vendo-o funcionar, não lendo parágrafos.

## Executar

Não há build nem dependências. Qualquer servidor estático serve:

```bash
python -m http.server 8765
```

Abra `http://localhost:8765/index.html`. Abrir o `index.html` direto (`file://`) também funciona.
Um endereço como `#7.3` abre o slide 7 na etapa 3 (útil para recarregar sem perder a posição).

## Controles

| Ação | Teclas |
|---|---|
| Avançar (etapa interna; ao fim dela, próximo slide) | `→` `↓` `Espaço` `PageDown` ou clique no fundo |
| Voltar | `←` `↑` `PageUp` |
| Trocar de slide direto | `Shift`+`←/→`, pontos numerados, `Home`, `End` |
| Reiniciar a demonstração do slide | `R` ou botão ↻ |
| Pausar animações | `P` |
| Tela cheia | `F` |

A barra inferior separa os dois níveis: **Slides** (navegação global) à esquerda e **Etapas**
(contorno dourado, só aparece quando o slide tem etapas) ao centro. Os botões de controle do
leitor de apresentação (`PageUp`/`PageDown` de um clicker) respeitam as etapas.

## Estrutura

```
index.html            slides (conteúdo) e barra de controle
css/styles.css        identidade LK (preto, grafite, dourado) e componentes
js/engine.js          motor: slides, etapas, teclado, Dot Grid, Decrypted Text, Spotlight
js/slides.js          dados e demonstrações de cada slide
docs/                 auditoria, componentes React Bits, roteiro, evidências
referencia-original/  cópia intacta do HTML e do roteiro de partida
```

## Decisão de arquitetura

Permanece em HTML/CSS/JS. Migrar para React + Vite + TypeScript não se justifica aqui: o entregável
é uma página para uma reunião, o ganho de React seria só importar componentes, e a migração traria
build, `node_modules` e um ponto de falha a mais. Os padrões do React Bits foram reimplementados
em JS puro. Detalhes em [`docs/COMPONENTES-REACT-BITS.md`](docs/COMPONENTES-REACT-BITS.md).

## Honestidade dos dados

- Os terminais, o código TypeScript, os checks de CI e os logs dos slides 1, 7 e 8 são
  **simulações didáticas**, identificadas como tal na tela. Nenhum é uma execução real.
- A issue do slide 4 e o fluxo GitHub do slide 6 são **exemplos ilustrativos** (cadastro de usuário).
- Os fatos reais vêm só do material de partida: Clientes V2 (26 migrations, 54 combinações de
  papéis, homologação local, publicação aguardando GO), LK Identity (Epic #377, cadastro/login/SMTP
  com testes, Google OIDC em trilha própria) e LK Wallet (migration 0013 em produção com backup e
  checagens). São recortes até 31/10/2026.
- O quadro do slide 10 é uma visão ilustrativa montada com esses checkpoints, não o Project real.
