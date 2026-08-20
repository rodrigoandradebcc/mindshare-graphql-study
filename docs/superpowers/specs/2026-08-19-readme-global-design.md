# Design do README global do MindShare

## Objetivo

Substituir o README mínimo da raiz por uma apresentação que atenda igualmente a dois públicos: recrutadores interessados no produto e nas decisões técnicas, e desenvolvedores que precisam instalar, compreender e executar o projeto.

## Abordagem

O documento será híbrido e escaneável. A primeira metade apresentará propósito, funcionalidades e arquitetura; a segunda será operacional, com requisitos, configuração, comandos e referências da API GraphQL. As informações devem refletir somente o código existente.

## Estrutura do conteúdo

1. Título e resumo do MindShare como plataforma colaborativa de ideias.
2. Funcionalidades: autenticação, ideias, comentários, votos e papéis de usuário.
3. Stack separada entre frontend e backend.
4. Visão da arquitetura e do fluxo entre React, Apollo Client, GraphQL, serviços, Prisma e SQLite.
5. Organização resumida do monorepo.
6. Instruções reproduzíveis de instalação e execução.
7. Variáveis `DATABASE_URL` e `JWT_SECRET`, sempre com valores locais de exemplo.
8. Aplicação das migrations e inicialização separada dos servidores.
9. URLs locais e scripts disponíveis.
10. Operações GraphQL expostas pelo schema atual.
11. Modelo de dados e relacionamentos principais.
12. Status do projeto e próximos passos claramente identificados como planejamento.

## Decisões editoriais

- Escrever em português, seguindo o idioma usado pelo solicitante.
- Usar tabelas somente para stack, scripts e operações, onde facilitam a comparação.
- Manter comandos copiáveis e indicar o diretório em que cada um deve ser executado.
- Não incluir badges de serviços não configurados, screenshots inexistentes ou instruções de deploy.
- Não revelar o conteúdo do `.env` local nem afirmar que há testes automatizados.
- Manter migrations versionadas e tratar bancos SQLite locais como descartáveis.

## Critérios de aceitação

- Um visitante entende o propósito e as principais capacidades sem abrir o código.
- Um desenvolvedor consegue configurar e iniciar frontend e backend a partir do README.
- Nomes de scripts, portas, variáveis, tecnologias e operações GraphQL correspondem ao repositório.
- O documento distingue recursos implementados de possíveis evoluções.
- Não há placeholders, segredos ou alegações não verificadas.
