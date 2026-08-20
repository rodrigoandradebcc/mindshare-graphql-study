# Correção pixel perfect das telas de autenticação e ideias

## Objetivo

Alinhar as telas de login, cadastro, listagem de ideias e criação de ideia às referências visuais fornecidas, preservando o comportamento funcional e a adaptação a telas menores.

## Estratégia

Os ajustes serão locais aos componentes envolvidos. Componentes compartilhados como `Card`, `Input`, `Button` e `Dialog` não terão seus estilos-base alterados globalmente; cada tela aplicará dimensões e variações próprias para evitar regressões em membros, drawers e demais formulários.

## Login

- Reproduzir a referência no viewport de 1652 × 938.
- Renderizar o card de login e o card de cadastro como elementos irmãos, separados por 14 px.
- Posicionar o conjunto no topo da área de autenticação conforme a referência, sem centralização vertical do bloco completo.
- Ajustar logo, largura dos cards, padding, tipografia e controles.
- Usar os textos `E-mail`, `exemplo@mail.com` e `Digite sua senha`.
- Preservar submissão, loading, navegação e toasts existentes.

## Cadastro

- Reproduzir a referência no viewport de 1048 × 589 sem rolagem vertical.
- Ajustar a escala do logo, cards, títulos, campos e espaçamento entre cards.
- Corrigir texto, labels, placeholders e associações `htmlFor`/`id`.
- Usar `Informe seu nome, e-mail e senha de acesso`, `Digite seu nome`, `E-mail`, `exemplo@mail.com`, `Senha` e `Digite sua senha`.
- Usar o texto de ação exibido na referência no botão principal.
- Preservar cadastro, loading, navegação e toasts existentes.

## Listagem de ideias

- Reproduzir a referência no viewport de 1181 × 663.
- Ajustar margens do header, área branca principal, padding e escala tipográfica.
- Exibir indicadores agregados de ideias, comentários e votos calculados a partir da lista carregada.
- Adicionar ordenação por mais recentes e mais antigas, aplicada localmente sem nova operação GraphQL.
- Manter o botão de criação e usar cards compactos em quatro colunas no desktop.
- Indicar ideias do usuário atual com o badge `você`.
- Exibir ações de editar e excluir nas ideias do usuário atual. As ações usarão as mutations `updateIdea` e `deleteIdea` já oferecidas pelo backend, com formulário de edição preenchido, confirmação antes da exclusão, atualização da lista e feedback por toast.
- Preservar abertura do detalhe e criação de ideia.

## Modal de criação

- Reproduzir a referência no viewport de 963 × 524.
- Usar o título `Compartilhe sua ideia`.
- Aplicar largura compacta, padding de 16 px, raio menor e overlay mais leve apenas nesse modal.
- Aumentar a área de descrição e compactar os botões.
- Preservar validação, mutation, cancelamento, loading e feedback por toast.

## Responsividade e acessibilidade

- As dimensões serão exatas nos viewports de referência e fluidas abaixo deles.
- Cards e controles não poderão causar overflow horizontal.
- A listagem reduzirá progressivamente o número de colunas.
- Labels serão associados aos campos corretos.
- Links estilizados como botões manterão semântica válida, sem botão aninhado em link ou link aninhado em botão.
- Controles interativos terão nomes acessíveis.

## Verificação

- Capturar login em 1652 × 938.
- Capturar cadastro em 1048 × 589.
- Capturar ideias em 1181 × 663.
- Capturar o modal em 963 × 524.
- Comparar posições e dimensões com as referências.
- Executar lint e build do frontend.
- Revisar o diff para regressões funcionais e de acessibilidade.
