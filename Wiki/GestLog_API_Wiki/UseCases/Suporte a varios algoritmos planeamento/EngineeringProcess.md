# Problema a resolver
Deverá ser possível utilizar dois ou mais algoritmos de planeamento.

## Solução seguida
Foi seguido o padrão de design Adapter. Assim todas as classes de algoritmo irão implementar a mesma interface. Está definido no config file qual será o algoritmo a utilizar assim, em runtime, o objeto adapter irá ler este mesmo ficheiro e criar uma instância do algoritmo pretendido que irá ser devolvido como uma instância da interface.

## Algoritmos utilizados 
- Algoritmo "hardcoded" que irá estar implementado em nodejs.
- Algoritmo que irá correr em prolog numa outra API e ser acessado por request http