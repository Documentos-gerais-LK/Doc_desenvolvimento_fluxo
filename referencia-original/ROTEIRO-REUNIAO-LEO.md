# Roteiro de fala — Lukas para Leonardo

**Data:** 01/11/2026  
**Duração sugerida:** 10 a 12 minutos + perguntas  
**Mensagem central:** A LK está transformando desenvolvimento em um processo rastreável, auditável e compartilhado entre os sócios.

## 01 — Abertura (45 s)

> "Léo, hoje quero te mostrar exatamente como estou desenvolvendo. Não é uma apresentação de funcionalidades. É uma visão do processo que a gente precisa ter como empresa. Você vai entender como uma ideia entra, como vira tarefa, como o código é construído, o que eu testo e quando eu considero pronto."

## 02 — Por que mudamos (1 min)

> "Quando a gente trabalhou em algumas entregas do Davi, percebi que a nossa forma de executar precisava amadurecer. Eu sabia o que estava fazendo, mas você não tinha como ver isso em tempo real, e às vezes o escopo mudava durante a construção. Pensei: para sermos uma empresa de software de verdade, precisamos de método, histórico e responsabilidade clara."

Evite atribuir problemas a pessoas. Fale do processo e de como a LK amadureceu.

## 03 — O fluxo completo (1 min)

> "O fluxo começa no problema, passa por pesquisa e especificação, entra no GitHub Project, vira código em branch, passa por testes e revisão, depois homologação e publicação. Se alguma etapa falha, a tarefa volta. O importante é que a decisão e a evidência fiquem registradas."

## 04 — Entrada da demanda (1 min)

> "Antes de mandar a IA codar, eu defino qual é o problema, o que está dentro do card, o que está fora, como vamos provar que funciona e o que pode dar errado. O cadastro central do LK Identity é um exemplo: ele tem regras de identidade e permissões que não podem ser improvisadas."

## 05 — Pesquisa e ferramentas (1 min)

> "Eu uso a Mia para consolidar contexto e discutir decisões. O DDAE entra como referência de investigação estruturada quando faz sentido. O Claude Code fica na execução do repositório. A IA acelera, mas ela não decide sozinha o que o cliente precisa ou quando está seguro publicar."

## 06 — GitHub como fonte de acompanhamento (1 min)

> "No GitHub eu organizo o Epic, as issues e as dependências. Quando começa a implementação, surge branch e PR. Lá você consegue ver o que mudou, os testes e a discussão. O Project te dá a visão da carteira inteira; o PR te dá a evidência da mudança específica."

Se possível, abra o Project real após a apresentação para mostrar um card e uma PR.

## 07 — Minha rotina (1 min)

> "Minha rotina é escolher o próximo card prioritário, conferir o escopo, orientar o Claude em uma branch isolada, revisar a entrega, testar e acompanhar CI. Resolvo bloqueios e só avanço o estado com evidência. Eu busco automação de execução, mas mantenho aprovação humana nos pontos de risco."

## 08 — Critério de pronto (1 min)

> "Tem uma diferença enorme entre código escrito, CI verde, merge, homologação e produção. Por exemplo: um teste pode passar em ambiente sintético, mas a jornada ainda pode não ter sido aprovada para usuários reais. Por isso eu separei três gates: qualidade técnica, homologação e publicação."

## 09 — Provas reais (1 min)

> "Clientes V2 foi homologado localmente com 26 migrations e 54 combinações de papéis. O Identity tem seu próprio Epic de cadastro e uma trilha mais sensível para Google OIDC. Já no Wallet a migration 0013 realmente foi executada em produção com backup e checagens. São três estados diferentes, e eu quero que a LK fale deles corretamente."

Não diga que Clientes V2 foi publicado sem confirmar um GO posterior. Os dados são checkpoints até 31/10.

## 10 — Transparência para o sócio (1 min)

> "A mudança mais importante para mim é você conseguir entrar no Project e entender o que estou fazendo, onde travei, o que foi testado e o que falta para liberar. Você não precisa conhecer todos os detalhes do código. Mas precisa conseguir acompanhar a empresa e participar das decisões de negócio."

## 11 — Fechamento e proposta (1 min)

> "Minha proposta é consolidar esse fluxo como nossa forma padrão de desenvolver. Primeiro concluímos Clientes V2 e sua publicação quando aprovado, fechamos os gates do Identity e fortalecemos CI e runners. Depois replicamos esse processo nos serviços que vendermos. Assim a LK consegue crescer sem depender de decisões escondidas em conversas."

### Perguntas que podem surgir

**"IA faz tudo sozinha?"**  
Não. Ela acelera pesquisa, implementação e verificação, mas o escopo, os critérios e o GO continuam responsáveis e auditáveis.

**"Onde vejo o andamento?"**  
No GitHub Project para visão macro; issues para escopo; PRs e CI para evidências; checkpoints para homologação e publicação.

**"Quanto desse fluxo já funciona?"**  
Há experiências práticas e comprovadas nos projetos citados. Padronizar o método para todas as futuras demandas ainda é um trabalho de consolidação.

**"Quem decide prioridade e prazo?"**  
Lukas fornece avaliação técnica e risco; Leonardo traz necessidade comercial e percepção do cliente; compromissos externos e mudanças relevantes são alinhados em conjunto.
