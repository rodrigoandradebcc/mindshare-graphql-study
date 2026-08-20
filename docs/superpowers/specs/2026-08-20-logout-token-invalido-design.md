# Logout automático para token inválido

## Objetivo

Encerrar a sessão no frontend quando uma operação protegida retornar o erro GraphQL `UNAUTHENTICATED`, informando ao usuário que a sessão expirou e levando-o novamente ao login.

## Arquitetura

O tratamento será centralizado em um `ErrorLink` na cadeia de links do Apollo Client. O link examinará os erros retornados por todas as operações GraphQL e reagirá somente quando encontrar `extensions.code` igual a `UNAUTHENTICATED`.

Ao reconhecer esse código, o frontend chamará o `logout` da store Zustand. O logout removerá usuário e token persistidos e limpará o cache do Apollo. Como `AuthRoutes` já depende de `isAuthenticated`, a mudança de estado fará o redirecionamento para `/login` sem recarregar a página.

## Experiência do usuário

Após o logout automático, será exibido o toast: “Sua sessão expirou. Entre novamente.” O tratamento impedirá notificações duplicadas quando requisições simultâneas falharem com o mesmo erro.

## Limites e tratamento de erros

- Erros de rede não encerrarão a sessão.
- Erros GraphQL com outros códigos não encerrarão a sessão.
- Login e cadastro continuarão usando seus tratamentos atuais.
- Não haverá renovação automática do token nesta feature.
- O erro original continuará disponível ao Apollo e aos componentes consumidores.

## Verificação

- Confirmar que um erro `UNAUTHENTICATED` limpa usuário, token e autenticação persistida.
- Confirmar que a rota protegida volta ao login e mostra uma única notificação.
- Confirmar que erros não relacionados à autenticação não causam logout.
- Executar lint e build do frontend.
