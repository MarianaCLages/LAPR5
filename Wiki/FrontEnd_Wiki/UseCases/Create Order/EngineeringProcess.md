
## Requisitos
Os dados do objeto já foram definidos em outras USs. 

- Como são inseridos os dados no formulário? **Os dados são inseridos na caixa de texto correspondente.**

- O que acontece se o usuário não preencher algum campo obrigatório? **O sistema não permite a criação da entrega e mostra uma mensagem de erro.**

O Usuário deve estar autenticado como WarehouseManager para criar uma entrega. Neste momento, a autenticação não está implementada. Existe um mock de autenticação que permite que o usuário seja autenticado como LogisticManager. No próximo sprint, a autenticação será implementada.

## Fluxo de Eventos
1. O usuário acessa a página de criação de entrega. 
2. O sistema exibe o formulário de criação de entrega.
3. O usuário preenche os campos do formulário e clica no botão de criar entrega.
4. É feito um request para o servidor com os dados da entrega.
5. O servidor recebe o request e cria a entrega.
6. O servidor retorna uma mensagem de sucesso.
7. O FrontEnd recebe a mensagem de sucesso e exibe uma mensagem de sucesso para o usuário.

## Integração
O FrontEnd deve enviar um request para o BackEnd com os dados da entrega. O BackEnd deve criar a entrega e retornar uma mensagem de sucesso.

Na barra de navegação, o usuário pode clicar no botão de criar entrega. O sistema exibe a página de criação de entrega. 
