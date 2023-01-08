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

Na barra de navegação, o utilizador pode clicar no botão de "List Trips". O sistema exibe uma lista de viagens. Pode aí clicar no botão "Trip By Truck" e inserir o ID do truck que quer listar.

Em termos de Design, os diagramas são em tudo semelhantes aos diagramas anteriores de listagem, visto que a listagem com filtros já era implementada no sprint anterior, por páginas.
A US de listagem de viagens e a de ordenação de viagens são inseridas no mesmo diagrama de sequência, visto que a ordenação é feita na mesma página.

## Vistas

## Nível 1

### Vista de processos

![N1_VP](./N1_VP.svg)


## Nível 2

### Vista de processos

![N2_VP](./N2_VP.svg)


## Nível 3

### Vista de processos

![N3_VP](./N3_VP.svg)