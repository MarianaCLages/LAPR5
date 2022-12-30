# Listar Viagens

## Requisitos
Os dados da listagem já foram definidos em outras USs. 

O utilizador deve estar autenticado como LogisticManager para listar as viagens. Neste momento, a autenticação já se encontra implementada.

## Fluxo de Eventos
# Alternativa 1
1. O utilizador acessa a página de listagem de viagens. 
2. O sistema exibe a lista de viagens.

# Alternativa 2
1. O utilizador acessa a página de listagem de viagens por ID de viagem.
2. O sistema exibe a lista de viagens com esse ID de viagem.

# Alternativa 3
1. O utilizador acessa a página de listagem de viagens por data de viagem.
2. O sistema exibe a lista de viagens com essa data de viagem.

# Alternativa 5
1. O utilizador acessa a página de listagem de viagens por data de viagem e ID de viagem.
2. O sistema exibe a lista de viagens com essa data de viagem e ID de viagem.


## Integração
O Front-end deve enviar um request para o Back-end com os dados da listagem.
O Back-end deve listar as viagens e retornar uma mensagem de sucesso/erro.

Na barra de navegação, o utilizador pode clicar no botão de "List Trips". O sistema exibe uma lista de viagens. 

Em termos de Design, é apresentado nos diagramas a parte de Front-end apenas, uma vez que a parte de Back-end está já descrita em outras USs.

## Vistas

## Nível 1

### Vista de cenários

![N1_VC](./N1_VC.svg)

### Vista de processos

![N1_VP](./N1_VP.svg)


## Nível 2

### Vista de processos

![N2_VP](./N2_VP.svg)

### Vista Física

![N2_VF](./N2_VF.svg)


## Nível 3

### Vista de processos

![N3_VP](./N3_VP.svg)

### Vista de implementação

![N3_VI](./N3_VI.svg)

### Vista Lógica

![N3_VL](./N3_VL_Geral.svg)