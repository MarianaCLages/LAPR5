# Autenticação SSO

## Requisitos

O utilizador deve estar autenticado para aceder à aplicação. Neste momento, a autenticação já se encontra implementada.

## Fluxo de Eventos

1. O utilizador acessa a página de login.
2. O sistema verifica a conta google do utilizador.
3. O sistema redireciona o utilizador para a página de login ou de registo
4. O utilizador insere os dados de login ou regista-se. Se o utilizador estiver a fazer o registo, cabe ao administrador atribuir-lhe uma role.
5. O sistema redireciona o utilizador para a página principal da respetiva role.

## Integração

O Front-end deve enviar um request para o Back-end com os dados de login. Estes encontram-se implementados com tokens de autenticação, no serviço de autenticação do Google.
O Back-end deve verificar a conta google do utilizador e retornar uma mensagem de sucesso/erro.

