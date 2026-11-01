/* Conteúdo e demonstrações de cada slide. Depende de engine.js (window.LK). */
(function () {
  'use strict';
  const { on, sleep, S, reduce } = window.LK;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const swap = (el) => { el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); };

  // Escreve linhas (HTML) em um terminal. Com `animate`, só as linhas novas (a partir de `from`) entram em cascata.
  function lines(el, arr, from = 0, animate = false) {
    el.innerHTML = arr.map((h, k) => `<span class="ln"${animate && k >= from ? ` style="--k:${k - from}"` : ' style="animation:none"'}>${h}</span>`).join('');
  }
  async function typeCmd(el, text, run) {
    const out = document.createElement('span');
    out.className = 'ln caret'; out.style.animation = 'none';
    out.innerHTML = '<span class="p">$</span> ';
    el.appendChild(out);
    const t = document.createTextNode(''); out.appendChild(t);
    for (const ch of text) {
      if (!(await sleep(reduce.matches ? 0 : 26, run))) return false;
      t.nodeValue += ch;
    }
    out.classList.remove('caret');
    return true;
  }
  const cmd = (t) => `<span class="p">$</span> ${esc(t)}`;
  const out = (t, c = 'dim') => `<span class="${c}">${esc(t)}</span>`;

  /* Terminal sequencial: comandos digitados, saídas em seguida. */
  async function runTerm(el, items, animate, run) {
    el.innerHTML = '';
    if (!animate || reduce.matches) {
      lines(el, items.map((i) => (i.c ? cmd(i.c) : out(i.o, i.k))));
      return;
    }
    for (const it of items) {
      if (it.c) { if (!(await typeCmd(el, it.c, run))) return; if (!(await sleep(260, run))) return; }
      else {
        const sp = document.createElement('span');
        sp.className = 'ln'; sp.innerHTML = out(it.o, it.k); el.appendChild(sp);
        if (!(await sleep(it.w || 220, run))) return;
      }
    }
  }

  /* ---------- 01 · Abertura ---------- */
  const heroSteps = [
    [cmd('lk estado --entrega cadastro-usuario')],
    [out('ideia          ✓ documentada', 'ok'), out('issue          ✓ com critérios de aceite', 'ok'), out('pull request   ✓ revisado', 'ok'), out('ci             ✓ verde', 'ok')],
    [out('homologação    … aguardando GO', 'wait'), out('produção       — ainda não publicada', 'dim'), out('', 'dim'), out('# CI verde não é o mesmo que entregue.', 'dim')],
  ];
  on(1, async (step, info) => {
    const el = $('#heroTerm');
    const all = [];
    for (let k = 0; k <= step; k++) all.push(...heroSteps[k]);
    const from = step === 0 ? 0 : heroSteps.slice(0, step).reduce((a, b) => a + b.length, 0);
    if (step === 0 && info.animate && !reduce.matches) {
      el.innerHTML = '';
      await sleep(900, info.run);
      await typeCmd(el, 'lk estado --entrega cadastro-usuario', info.run);
      return;
    }
    lines(el, all, from, info.animate);
  });

  /* ---------- Trilho genérico (slides 3 e 6) ---------- */
  function buildTrack(id, labels, p) {
    const tr = $(id);
    labels.forEach((l, i) => {
      const b = document.createElement('button');
      b.className = 'node'; b.dataset.pick = i; b.type = 'button';
      b.setAttribute('aria-label', `Etapa ${i + 1}: ${l}`);
      b.innerHTML = `<span class="node__c">${String(i + 1).padStart(2, '0')}</span><span class="node__t">${l}</span>`;
      tr.appendChild(b);
    });
    return (step) => {
      tr.style.setProperty('--p', step / (labels.length - 1));
      $$('.node', tr).forEach((n, i) => {
        n.dataset.state = i < step ? 'done' : i === step ? 'active' : 'todo';
        n.setAttribute('aria-current', i === step ? 'step' : 'false');
      });
    };
  }

  /* ---------- 03 · Fluxo completo ---------- */
  const F3 = [
    ['Necessidade', 'Um problema do usuário ou da empresa', 'Definimos o problema, o valor e a prioridade', 'Conversa entre sócios · GitHub Project', 'Demanda registrada com prioridade', 'Problema claro para pesquisar'],
    ['Pesquisa', 'Problema claro e priorizado', 'Comparamos alternativas, riscos e impactos', 'ChatGPT / Mia · DDAE', 'Decisão técnica justificada', 'Direção escolhida'],
    ['Especificação', 'Direção técnica escolhida', 'Escrevemos escopo, exclusões e critérios de aceite', 'Mia · GitHub Issue', 'Issue com critérios de aceite', 'Tarefa executável e delimitada'],
    ['Planejamento', 'Issue especificada', 'Organizamos em Epic, issues e dependências', 'GitHub Projects · Epic', 'Card com responsável e dependências', 'Próximo card pronto para executar'],
    ['Implementação', 'Card pronto para executar', 'Código escrito em branch isolada, dentro do escopo', 'Claude Code · Git', 'Commits e Pull Request aberto', 'Mudança proposta para revisão'],
    ['Validação', 'Pull Request aberto', 'Testes, tipos, revisão do diff e CI', 'CI do GitHub · testes automatizados', 'Checks verdes e revisão registrada', 'PR elegível para merge'],
    ['Homologação', 'Versão elegível', 'Cenários reais em ambiente adequado, com papéis e erros', 'Ambiente de homologação', 'Checkpoint com GO / NO-GO', 'Autorização para publicar'],
    ['Publicação', 'GO registrado', 'Backup quando aplicável, publicação, teste rápido depois de publicar e monitoramento', 'Pipeline de publicação', 'Verificação após publicar', 'Entrega concluída e registrada'],
  ];
  const track3 = buildTrack('#track3', F3.map((f) => f[0]));
  on(3, (step) => {
    track3(step);
    const f = F3[step];
    $('#d3n').textContent = `ETAPA ${String(step + 1).padStart(2, '0')} / 08`;
    $('#d3t').textContent = f[0];
    const labels = ['Entra', 'O que acontece', 'Ferramenta', 'Evidência de conclusão', 'Passa para a próxima'];
    const box = $('#d3f');
    box.innerHTML = labels.map((l, k) => `<div class="fld" style="--k:${k}"><small>${l}</small><p>${f[k + 1]}</p></div>`).join('');
    swap(box);
  });

  /* ---------- 06 · GitHub ---------- */
  const G6 = [
    { t: 'Epic', role: 'Agrupa um objetivo maior', has: 'Lista de issues e suas dependências', proof: 'Progresso do objetivo inteiro',
      m: `<div class="mt">Epic</div><div class="mh">Cadastro de usuários <span class="pill pill--gold">Epic</span></div><div class="bar-p"><i style="width:34%"></i></div><div class="ml"><div><span class="crs">◐</span> Criar conta com e-mail verificado</div><div><span class="crs">○</span> Login</div><div><span class="crs">○</span> Recuperar senha</div></div>` },
    { t: 'Issue', role: 'Descreve uma entrega e seus critérios', has: 'Problema, escopo, exclusões e critérios de aceite', proof: 'Aceite definido antes do código',
      m: `<div class="mt">Issue</div><div class="mh">Criar conta com e-mail verificado <span class="pill pill--ok">Aberta</span></div><div class="ml"><div><span class="crs">☐</span> Pessoa nova cria a conta e recebe o e-mail</div><div><span class="crs">☐</span> E-mail inválido mostra erro claro</div><div><span class="crs">☐</span> Papéis internos seguem intactos</div></div>` },
    { t: 'Branch', role: 'Isola a mudança do código principal', has: 'Os commits dessa tarefa', proof: 'Histórico de cada alteração',
      m: `<div class="mt">Branch</div><div class="mh"><code>feat/cadastro-usuario</code></div><pre style="margin:0;font-family:var(--mono);font-size:.74rem;line-height:1.6;color:var(--muted)">main  ●──●──●──────────●\n               ╲        ╱\nfeat           ●──●──●</pre>` },
    { t: 'Pull Request', role: 'Propõe a mudança para revisão', has: 'Diff, discussão e resultado dos checks', proof: 'O que mudou e quem revisou',
      m: `<div class="mt">Pull request</div><div class="mh">Cadastro: criar conta com e-mail verificado <span class="pill pill--ok">Aberto</span></div><div class="ml"><div><code>feat/cadastro-usuario</code> → <code>main</code></div><div>3 commits · testes descritos · vinculado à issue</div></div>` },
    { t: 'CI', role: 'Roda as verificações automáticas', has: 'Lint, tipos, testes e build', proof: 'Checks verdes — ou falha com log',
      m: `<div class="mt">Checks</div><div class="ml"><div><span class="chk">✓</span> Lint</div><div><span class="chk">✓</span> Verificação de tipos</div><div><span class="chk">✓</span> Testes unitários</div><div><span class="chk">✓</span> Build</div></div>` },
    { t: 'Checkpoint', role: 'Registra a decisão de entrega', has: 'Merge, homologação, GO / NO-GO e riscos', proof: 'Evidência para liberar',
      m: `<div class="mt">Checkpoint</div><div class="mh">Validado (G1) <span class="pill pill--warn">Aguarda homologação</span></div><div class="ml"><div><span class="chk">✓</span> Merge realizado</div><div><span class="crs">○</span> Homologação (GO / NO-GO)</div><div><span class="crs">○</span> Publicação</div></div>` },
  ];
  const track6 = buildTrack('#track6', G6.map((g) => g.t));
  on(6, (step) => {
    track6(step);
    const g = G6[step];
    $('#d6n').textContent = `${String(step + 1).padStart(2, '0')} / 06`;
    $('#d6t').textContent = g.t;
    const kv = $('#d6kv');
    kv.innerHTML = `<div class="fld-k"><small>Papel</small><p>${g.role}</p></div><div><small>Contém</small><p>${g.has}</p></div><div><small>Prova</small><p>${g.proof}</p></div>`;
    $$('div', kv).forEach((d, k) => { d.style.setProperty('--k', k); });
    kv.className = 'kv swap'; swap(kv);
    const m = $('#d6m'); m.innerHTML = g.m; swap(m);
  });

  /* ---------- 07 · Dia a dia (simulação controlada) ---------- */
  const PILL = ['Pronto para executar', 'Pronto para executar', 'Em andamento', 'Em andamento', 'Em andamento', 'Em revisão', 'Em revisão', 'Validado (G1)'];
  const PILLC = ['pill--gold', 'pill--gold', 'pill--warn', 'pill--warn', 'pill--warn', 'pill--gold', 'pill--gold', 'pill--ok'];
  const T2 = [{ c: 'git switch main' }, { o: "Switched to branch 'main'" }, { c: 'git pull --ff-only' }, { o: 'Already up to date.' }, { c: 'git switch -c feat/cadastro-usuario' }, { o: "Switched to a new branch 'feat/cadastro-usuario'", k: 'ok' }];
  const T4 = [{ c: 'npm test' }, { o: '' }, { o: ' RUN  src/signup.test.ts', k: 'dim', w: 350 }, { o: ' ✓ aceita e-mail válido', k: 'ok', w: 380 }, { o: ' ✓ rejeita e-mail inválido', k: 'ok', w: 380 }, { o: ' ✓ rejeita senha curta', k: 'ok', w: 380 }, { o: '' }, { o: ' Tests  3 passed (3)', k: 'ok' }];
  const CODE = [
    '<span class="cm">// src/signup.ts</span>',
    '<span class="kw">const</span> EMAIL_RE = <span class="st">/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/</span>;',
    '<span class="kw">export function</span> <span class="fn">validateSignup</span>(input: <span class="ty">SignupInput</span>): <span class="ty">SignupResult</span> {',
    '  <span class="kw">const</span> email = input.email.trim().toLowerCase();',
    '  <span class="kw">if</span> (!EMAIL_RE.test(email)) {',
    '    <span class="kw">return</span> { ok: <span class="kw">false</span>, error: <span class="st">"E-mail inválido"</span> };',
    '  }',
    '  <span class="kw">if</span> (input.password.length &lt; 12) {',
    '    <span class="kw">return</span> { ok: <span class="kw">false</span>, error: <span class="st">"Senha curta demais"</span> };',
    '  }',
    '  <span class="kw">return</span> { ok: <span class="kw">true</span>, email };',
    '}',
  ];
  const CK = ['Lint', 'Verificação de tipos', 'Testes unitários', 'Build'];
  const CAP7 = [
    'Começamos pelo próximo card prioritário.',
    'Card é a tarefa. Antes de mexer no código, confirmamos o que entra e como provar que está pronta.',
    'Branch é uma cópia de trabalho isolada: o código principal não é afetado.',
    'Aqui o código é escrito, só o que o card pede.',
    'Os testes automáticos conferem cada critério de aceite.',
    'O Pull Request (PR) propõe a mudança para revisão, ligado ao card.',
    'O CI roda as verificações sozinho. Se algo falha, a entrega é barrada.',
    'O card só muda de estado com evidência. Ainda faltam homologar e publicar.',
  ];
  on(7, async (step, info) => {
    $('#cap7').textContent = CAP7[step];
    const run = info.run, anim = info.animate && !reduce.matches;
    $$('#rail7 li').forEach((li, k) => { li.dataset.s = step > k + 1 ? 'done' : step === k + 1 ? 'act' : 'todo'; });
    $('#k7s').textContent = PILL[step]; $('#k7s').className = 'pill ' + PILLC[step];
    const kc = $('#k7'); kc.classList.remove('pulse'); if (step === 1) { void kc.offsetWidth; kc.classList.add('pulse'); }
    $$('.pn').forEach((p) => p.classList.toggle('on', Number(p.dataset.p) === step));
    if (step === 2) await runTerm($('#tm2'), T2, anim, run);
    if (step === 3) {
      const pre = $('#cd3');
      if (!anim) lines(pre, CODE);
      else { pre.innerHTML = ''; for (let k = 0; k < CODE.length; k++) { const sp = document.createElement('span'); sp.className = 'ln'; sp.innerHTML = CODE[k]; pre.appendChild(sp); if (!(await sleep(260, run))) return; } }
    }
    if (step === 4) await runTerm($('#tm4'), T4, anim, run);
    if (step === 6) {
      const ul = $('#ck6');
      const row = (n, r) => `<li data-r="${r}"><span class="st">${r === 'ok' ? '✓' : r === 'run' ? '◌' : '○'}</span><span>${n}</span><span class="tm">${r === 'ok' ? 'passou' : r === 'run' ? 'executando' : 'na fila'}</span></li>`;
      if (!anim) { ul.innerHTML = CK.map((n) => row(n, 'ok')).join(''); return; }
      ul.innerHTML = CK.map((n) => row(n, 'wait')).join('');
      for (let k = 0; k < CK.length; k++) {
        $$('li', ul)[k].outerHTML = row(CK[k], 'run');
        if (!(await sleep(750, run))) return;
        $$('li', ul)[k].outerHTML = row(CK[k], 'ok');
      }
    }
  });

  /* ---------- 08 · Gates ---------- */
  const RUNGS = ['Código implementado', 'PR aprovado', 'CI verde', 'Merge', 'Homologação', 'Produção'];
  const RS = [
    ['ok', 'off', 'off', 'off', 'off', 'off'],
    ['ok', 'off', 'bad', 'off', 'off', 'off'],
    ['ok', 'off', 'run', 'off', 'off', 'off'],
    ['ok', 'ok', 'ok', 'ok', 'off', 'off'],
    ['ok', 'ok', 'ok', 'ok', 'off', 'off'],
  ];
  const ICON = { ok: '✓', bad: '✕', run: '◌', off: '○' };
  const GATES = [
    ['G1', 'Qualidade técnica', 'Testes, revisão, segurança, integração e CI.'],
    ['G2', 'Homologação', 'Validação funcional no ambiente adequado.'],
    ['G3', 'Publicação', 'Autorização, deploy e verificação posterior.'],
  ];
  const GS = [
    [['idle', 'Pendente'], ['lock', 'Bloqueado'], ['lock', 'Bloqueado']],
    [['bad', 'Falhou'], ['lock', 'Aguarda G1'], ['lock', 'Aguarda G2']],
    [['wait', 'Reexecutando'], ['lock', 'Aguarda G1'], ['lock', 'Aguarda G2']],
    [['ok', 'Aprovado'], ['idle', 'Próximo gate'], ['lock', 'Aguarda G2']],
    [['ok', 'Aprovado'], ['wait', 'Aguardando GO'], ['lock', 'Bloqueado até GO']],
  ];
  const GCLS = { ok: 'pill--ok', bad: 'pill--bad', wait: 'pill--warn', idle: '', lock: '' };
  const LOG0 = out('# simulação didática — não é um log real', 'dim');
  const LOGS = [
    [LOG0, out('# avance para ver o que acontece quando um check falha', 'dim')],
    [LOG0, cmd('ci run'), out('✓ lint', 'ok'), out('✓ tipos', 'ok'), out('✕ testes › rejeita senha curta', 'bad'), out('    esperado: erro   recebido: ok', 'dim'), out('■ pipeline falhou — próximas etapas bloqueadas', 'bad')],
    [LOG0, cmd('git commit -m "fix: rejeitar senha curta"'), cmd('ci run'), out('… executando testes', 'wait')],
    [LOG0, cmd('ci run'), out('✓ lint', 'ok'), out('✓ tipos', 'ok'), out('✓ testes (3/3)', 'ok'), out('✓ build', 'ok'), out('■ gate técnico aprovado', 'ok')],
    [LOG0, out('✓ gate técnico aprovado (G1)', 'ok'), out('… homologação: aguardando validação funcional', 'wait'), out('— publicação: bloqueada até GO e autorização', 'dim')],
  ];
  const FIX = [
    'Cenário demonstrativo. Avance para ver uma entrega ser barrada.',
    '<b>O teste falhou.</b> O pipeline barra a entrega: nada avança até corrigir.',
    'Correção aplicada. O pipeline roda de novo…',
    '<b>Gate técnico aprovado.</b> Mas isso ainda não é uma entrega.',
    '<b>CI verde não é o mesmo que pronto.</b> Faltam homologação e autorização para publicar.',
  ];
  on(8, (step, info) => {
    $('#ladder8').innerHTML = RUNGS.map((r, k) => `<div class="rung" role="listitem" data-r="${RS[step][k]}"><i>${ICON[RS[step][k]]}</i>${r}</div>`).join('');
    $('#gates8').innerHTML = GATES.map((g, k) => { const [s, l] = GS[step][k]; return `<div class="card gate" data-g="${s}"><div class="gh1"><span class="gn">${g[0]}</span><h3>${g[1]}</h3><span class="pill gs ${GCLS[s]}">${l}</span></div><p>${g[2]}</p></div>`; }).join('');
    const log = $('#log8'); lines(log, LOGS[step], 0, info.animate);
    $('#fixTxt').innerHTML = FIX[step];
  });

  /* ---------- 09 · Casos reais ---------- */
  const P9 = [
    { k: 'LK System', t: 'Clientes V2', sub: 'Homologação local', n: '54', l: 'combinações de papéis, sem violações', st: ['pill--warn', 'Homologado localmente · publicação aguarda GO'],
      tl: [['Migrations', '26 migrations aplicadas na homologação'], ['Dados', 'Seed sintético, sem dados reais'], ['Papéis', 'Matriz de 54 combinações sem violações'], ['!', 'Publicação pendente de GO registrado', 'Homologação local não é publicação']],
      lk: [['Repositório', 'https://github.com/lktechnologiesbrasil/LK-Technologies-Brasil']] },
    { k: 'LK Identity', t: 'Epic #377', sub: 'Segurança por etapas', n: 'M1', l: 'cadastro central', st: ['pill--gold', 'Em desenvolvimento por etapas'],
      tl: [['Cadastro central', 'Cadastro, login e SMTP com testes'], ['Regras', 'Identidade e permissões não podem ser improvisadas'], ['!', 'Google OIDC em trilha própria', 'Segurança e rollout com gates próprios'], ['!', 'Integração e homologação', 'A avaliar por gate']],
      lk: [['Epic #377', 'https://github.com/lktechnologiesbrasil/LK-Technologies-Brasil/issues/377']] },
    { k: 'LK Wallet', t: 'Migration 0013', sub: 'Liberação com controle', n: '0013', l: 'executada em produção', st: ['pill--ok', 'Migration em produção'],
      tl: [['Backup', 'Realizado antes da execução'], ['Execução', 'Migration 0013 aplicada em produção'], ['Pós-execução', 'Checagens depois de executar'], ['!', 'Leitura correta', 'Migration em produção não equivale ao lançamento do produto']],
      lk: [] },
  ];
  const tabs9 = $('#tabs9');
  P9.forEach((p, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'card tab spot'; b.dataset.pick = i;
    b.innerHTML = `<small>${p.k}</small><b>${p.t}</b><span>${p.sub}</span>`;
    tabs9.appendChild(b);
  });
  on(9, (step) => {
    const p = P9[step];
    $$('.tab', tabs9).forEach((b, i) => { b.dataset.lit = i === step ? '1' : '0'; b.setAttribute('aria-pressed', i === step); });
    $('#s9n').textContent = p.n; $('#s9l').textContent = p.l;
    $('#s9s').innerHTML = `<span class="pill ${p.st[0]}">${p.st[1]}</span>`;
    const tl = $('#s9tl');
    tl.innerHTML = p.tl.map((r, k) => r[0] === '!' ? `<li class="no" style="--k:${k}"><div>${r[1]}<small>${r[2]}</small></div></li>` : `<li style="--k:${k}"><div><b style="font-weight:600">${r[0]}</b> · ${r[1]}</div></li>`).join('');
    $('#s9lk').innerHTML = p.lk.map((l) => `<a href="${l[1]}" target="_blank" rel="noopener noreferrer">${l[0]} ↗</a>`).join('');
  });

  /* ---------- 10 · Project board ---------- */
  const COLS = [['todo', 'A fazer'], ['run', 'Em execução'], ['blk', 'Bloqueado'], ['dec', 'Decisão pendente'], ['ok', 'Concluído']];
  const C10 = [
    { c: 'run', k: 'LK Identity', t: 'Cadastro central', ev: 'Cadastro, login e SMTP com testes', nx: 'Avaliar integração e homologação por gate', who: 'Lukas · direção técnica' },
    { c: 'dec', k: 'LK System', t: 'Publicação de Clientes V2', ev: 'Homologação local: 26 migrations e 54 combinações de papéis sem violações', nx: 'Registrar o GO e publicar', who: 'Em conjunto · autorização de publicação' },
    { c: 'blk', k: 'LK Identity', t: 'Google OIDC', ev: 'Trilha própria de segurança e rollout', nx: 'Fechar os gates de segurança antes de avançar', who: 'Em conjunto · publicação sensível' },
    { c: 'todo', k: 'Plataforma', t: 'Project, CI e runners', ev: 'Prioridade registrada para o próximo ciclo', nx: 'Consolidar Project, CI e runners (as máquinas que rodam os testes)', who: 'Lukas · direção técnica' },
    { c: 'todo', k: 'Processo', t: 'Método em novos clientes', ev: 'Proposta do próximo ciclo', nx: 'Replicar o fluxo nos serviços que vendermos', who: 'Em conjunto · compromissos com clientes' },
    { c: 'ok', k: 'LK Wallet', t: 'Migration 0013', ev: 'Executada em produção com backup e checagens depois de executar', nx: 'Manter como referência de entrega controlada', who: 'Concluído' },
  ];
  const board = $('#board10');
  COLS.forEach(([c, name]) => {
    const items = C10.map((x, i) => [x, i]).filter(([x]) => x.c === c);
    const col = document.createElement('div');
    col.className = 'col'; col.dataset.c = c;
    col.innerHTML = `<h4>${name}<span>${items.length}</span></h4>`;
    items.forEach(([x, i]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'card kc spot'; b.dataset.pick = i; b.dataset.k = i;
      b.innerHTML = `<small>${x.k}</small><b>${x.t}</b>`;
      col.appendChild(b);
    });
    if (!items.length) col.insertAdjacentHTML('beforeend', '<div class="empty">nada neste recorte</div>');
    board.appendChild(col);
  });
  on(10, (step) => {
    $$('.kc', board).forEach((b) => { b.dataset.lit = Number(b.dataset.k) === step ? '1' : '0'; b.setAttribute('aria-pressed', Number(b.dataset.k) === step); });
    const x = C10[step], col = COLS.find((c) => c[0] === x.c)[1];
    const d = $('#cdet10');
    d.innerHTML = `<div><span class="pill ${{ run: 'pill--gold', dec: 'pill--warn', blk: 'pill--bad', ok: 'pill--ok', todo: '' }[x.c]}">${col}</span><h3>${x.k} · ${x.t}</h3></div>
      <div class="kvx"><small>Evidência</small><p>${x.ev}</p></div><div class="kvx"><small>Próximo passo</small><p>${x.nx}</p></div><div class="kvx"><small>Quem decide</small><p>${x.who}</p></div>`;
    swap(d);
  });

  window.LK.start();
})();
