# Viagem
A viagem é conjunto de dados atribuídos a um camião no inicio do dia quando este sai para distribuir encomendas para os vários armazéns.
A viagem é o resultado do modulo de planeamento e assim deve ser criado com os dados recebidos de lá
## Atributos

- Dia
- Camião
- Lista de Armazéns que vai visitar
- Entregas em cada armazém

## Design
É crucial guardar a ordem dos armazéns (o caminho que o camião vai percorrer), pelo que iremos usar duas estruturas de dados, uma para guardar a ordem dos armazéns e outra para associar as entregas a cada armazém 

### Identifier
Como identificador para a entidade iremos usar uma string que contem o dia da viagem em conjunto com o id do camião. Ex.: 'C01/20221220'. Desta forma é simples identificar a viagem em questão.

### Criação
Dada a complexidade do objeto a ser criado, bem como a sua grande quantidade de parâmetros iremos usar o padrão builder e assim  isolar a lógica de criação do objeto numa classe separada. Para além disso conseguimos manter uma interface estável para o resto do código.