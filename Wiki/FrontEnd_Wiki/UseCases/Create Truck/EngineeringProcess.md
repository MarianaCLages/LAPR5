
## Requisitos
Os dados do objeto já foram definidos em outras USs. 

- Como são inseridos os dados no formulário?

- Os dados são inseridos na caixa de texto correspondente.

- O que acontece se o usuário não preencher algum campo obrigatório? **O sistema não permite a criação do camião e mostra uma mensagem de erro.**

O Usuário deve estar autenticado como FleetManager para criar um camião. Neste momento, a autenticação não está implementada. Existe um mock de autenticação que permite que o usuário seja autenticado como LogisticManager. No próximo sprint, a autenticação será implementada.

## Fluxo de Eventos
1. O usuário acessa a página de criação de camião. 
2. O sistema exibe o formulário de criação de camião.
3. O usuário preenche os campos do formulário e clica no botão de criar camião.
4.  É feito um request para o servidor com os dados do camião.
5.  O servidor recebe o request e cria o camião.
6.  O servidor retorna uma mensagem de sucesso.
7.  O FrontEnd recebe a mensagem de sucesso e exibe uma mensagem de sucesso para o usuário.

## Integração
O FrontEnd deve enviar um request para o BackEnd com os dados do camião. O BackEnd deve criar o camião e retornar uma mensagem de sucesso.

Na barra de navegação, o usuário pode clicar no botão de criar camião. O sistema exibe a página de criação de camião. 
