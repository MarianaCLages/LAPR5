

## Requisitos
Os dados do objeto já foram definidos em outras USs. 

- Como são inseridos os dados no formulário de criação de caminho?

- Armazem de partida e chegada são campos obrigatórios. Como são preenchidos? **Lista de seleção? Busca? (pergunto ao cliente)**

- Distancia é um campo obrigatório. Como é preenchido? **Insere-se o valor na caixa de texto.**

- Tempo é um campo obrigatório. Como é preenchido? **Insere-se o valor na caixa de texto.**

- Energia necessária é um campo obrigatório. Como é preenchido? **Insere-se o valor na caixa de texto.**

- Tempo de carregamento é um campo obrigatório. Como é preenchido? **Insere-se o valor na caixa de texto.**

- O que acontece se o usuário não preencher algum campo obrigatório? **O sistema não permite a criação do caminho e mostra uma mensagem de erro.**

O Usuário deve estar autenticado como LogisticManager para criar um caminho. Neste momento, a autenticação não está implementada. Existe um mock de autenticação que permite que o usuário seja autenticado como LogisticManager. No próximo sprint, a autenticação será implementada.

## Fluxo de Eventos
1. O usuário acessa a página de criação de caminho. 
2. O sistema exibe o formulário de criação de caminho.
3. O usuário preenche os campos do formulário e clica no botão de criar caminho.
4.  É feita um request para o servidor com os dados do caminho.
5.  O servidor recebe o request e cria o caminho.
6.  O servidor retorna uma mensagem de sucesso.
7.  O FrontEnd recebe a mensagem de sucesso e exibe uma mensagem de sucesso para o usuário.

## Integração
Caso seja necessário escolher o armazem de partida e chegada, o sistema deve exibir uma lista de armazéns. A lista de armazéns é obtida através do serviço de armazéns. Pelo que deverá ser feito um request para o serviço de armazéns para obter a lista de armazéns.
O FrontEnd deve enviar um request para o BackEnd com os dados do caminho. O BackEnd deve criar o caminho e retornar uma mensagem de sucesso.

Na barra de navegação, o usuário pode clicar no botão de criar caminho. O sistema exibe a página de criação de caminho. 
