
## Requisitos
Os dados da listagem já foram definidos em outras USs. 

- O que acontece se o usuário não preencher algum campo obrigatório? **O sistema não permite a criação do caminho e mostra uma mensagem de erro.**

O Usuário deve estar autenticado como LogisticManager para listar os empacotamentos. Neste momento, a autenticação não está implementada. Existe um mock de autenticação que permite que o usuário seja autenticado como LogisticManager. No próximo sprint, a autenticação será implementada.

## Fluxo de Eventos
# Alternativa 1
1. O usuário acessa a página de listagem de empacotamentos. 
2. O sistema exibe uma lista de empacotamentos.

# Alternativa 2
1. O usuário acessa a página de listagem de empacotamentos por ID de camião.
2. O sistema exibe uma lista de empacotamentos com esse ID de camião.

# Alternativa 3
1. O usuário acessa a página de listagem de empacotamentos por ID de order.
2. O sistema exibe uma lista de empacotamentos com esse ID de order.


## Integração
O FrontEnd deve enviar um request para o BackEnd com os dados da listagem.
O BackEnd deve listar os empacotamentos e retornar uma mensagem de sucesso.

Na barra de navegação, o usuário pode clicar no botão de listar empacotamentos. O sistema exibe uma lista de empacotamentos. 

Em termos de Design, é apresentado nos diagramas a parte de FrontEnd apenas, já que a parte de BackEnd está já descrita noutras USs.

## Vistas

### Vista de Processo

#### Nível 1

![Vista de Processo Nível 1 - Alternativa 1](N1_VP_alt1.svg)

![Vista de Processo Nível 1 - Alternativa 2](N1_VP_alt2.svg)

![Vista de Processo Nível 1 - Alternativa 3](N1_VP_alt3.svg)


#### Nível 2

![Vista de Processo Nível 2 - Alternativa 1](N2_VP_alt1.svg)

![Vista de Processo Nível 2 - Alternativa 2](N2_VP_alt2.svg)

![Vista de Processo Nível 2 - Alternativa 3](N2_VP_alt3.svg)


#### Nível 3

![Vista de Processo Nível 3 - Alternativa 1](N3_VP_alt1.svg)

![Vista de Processo Nível 3 - Alternativa 2](N3_VP_alt2.svg)

![Vista de Processo Nível 3 - Alternativa 3](N3_VP_alt3.svg)