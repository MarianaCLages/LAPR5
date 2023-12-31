### 


## Contents
- [Decisões de Arquitetura tomadas](#decisões-de-arquitetura-tomadas)
- [Views:](#views)
  - [Nível 1](#nível-1)
    - [Vista Lógica](#vista-lógica)
    - [Vista de Cenários](#vista-de-cenários)
    - [Vista Processo](#vista-processo)
  - [Nível 2](#nível-2)
    - [Vista Lógica](#vista-lógica-1)
    - [Vista de Implementação](#vista-de-implementação)
    - [Vista Processo](#vista-processo-1)
  - [Nível 3 (MDR)](#nível-3-mdr)
    - [Vista Lógica](#vista-lógica-2)
    - [Vista Processo](#vista-processo-2)
    - [Vista de Implementação](#vista-de-implementação-1)

## Introduction
Será adotada a combinação de dois modelos de representação arquitetural: C4 e 4+1.

O Modelo de Vistas 4+1 [[Krutchen-1995]](References.md#Kruchten-1995) propõe a descrição do sistema através de vistas complementares permitindo, assim, analisar separadamente os requisitos dos vários stakeholders do software, tais como utilizadores, administradores de sistemas, project managers, arquitetos e programadores. As vistas são, deste modo, definidas da seguinte forma:

- Vista lógica: relativa aos aspetos do software visando responder aos desafios do negócio;
- Vista de processos: relativa ao fluxo de processos ou interações no sistema;
- Vista de desenvolvimento: relativa à organização do software no seu ambiente de desenvolvimento;
- Vista física: relativa ao mapeamento dos vários componentes do software em hardware, i.e. onde é executado o software;
- Vista de cenários: relativa à associação de processos de negócio com atores capazes de os espoletar.

O Modelo C4 [[Brown-2020]](References.md#Brown-2020)[[C4-2020]](References.md#C4-2020) defende a descrição do software através de quatro níveis de abstração: sistema, contentor, componente e código. Cada nível adota uma granularidade mais fina que o nível que o antecede, dando assim acesso a mais detalhe de uma parte mais pequena do sistema. Estes níveis podem ser equiparáveis a mapas, e.g. a vista de sistema corresponde ao globo, a vista de contentor corresponde ao mapa de cada continente, a vista de componentes ao mapa de cada país e a vista de código ao mapa de estradas e bairros de cada city.
Diferentes níveis permitem contar histórias diferentes a audiências distintas.

Os níveis encontram-se definidos da seguinte forma:
- Nível 1: Descrição (enquadramento) do sistema como um todo;
- Nível 2: Descrição de contentores do sistema;
- Nível 3: Descrição de componentes dos contentores;
- Nível 4: Descrição do código ou partes mais pequenas dos componentes (e como tal, não será abordado neste DAS/SAD).

Pode-se dizer que estes dois modelos se expandem ao longo de eixos distintos, sendo que o Modelo C4 apresenta o sistema com diferentes níveis de detalhe e o Modelo de Vista 4+1 apresenta o sistema de diferentes perspetivas. Ao combinar os dois modelos, torna-se possível representar o sistema de diversas perspetivas, cada uma com vários níveis de detalhe.

Para modelar/representar visualmente, tanto o que foi implementado como as ideias e alternativas consideradas, recorre-se à Unified Modeling Language (UML) [[UML-2020]](References.md#UML-2020) [[UMLDiagrams-2020]](References.md#UMLDiagrams-2020).


# Decisões de Arquitetura tomadas
As decisões gerais de Arquitetura já estão descritas no documento geral de Arquitetura. Este documento apenas descreve as decisões tomadas para este caso de uso.
O caso de uso pode ser visto como um caso de uso "clássico" de listagem de um objeto, neste caso, a listagem de paths. Esta seria filtrada por receber todos os paths, receber os paths de um dado armazém de chegada e receber os paths de um dado armazém de partida.

# Views:

## Nível 1

### Vista de Processos


![Nivel1-VP](N1_VP.svg)
![Nivel1-VP-Alternativa 1](N1_VP_alt1.svg)
![Nivel1-VP-Alternativa 2](N1_VP_alt2.svg)


## Nível 2

### Vista de Processos
![Nivel2-VP](N2_VP.svg)
![Nivel2-VP-Alternativa 1](N2_VP_alt1.svg)
![Nivel2-VP-Alternativa 2](N2_VP_alt2.svg)
 

## Nível 3 (MDR)

### Vista de Processos

![Nivel3-VP](N3_VP.svg)
![Nivel3-VP-Alternativa 1](N3_VP_alt1.svg)
![Nivel3-VP-Alternativa 2](N3_VP_alt2.svg)