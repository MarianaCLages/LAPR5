# Requisitos
    A formulação da rede está de acordo com as normas estabelecidas em SGRAI e os requesitos por parte do cliente.

    O objetivo é representar a rede viária do nosso sistema (informações persistidas na base de dados) todos os armazéns e todos os caminhos entre os armazéns. Todos os armazéns existentes na base de dados possuem coordenadas longitude/latitude que vão posteriormente ser transformadas em coordenadas cartesianas para ser possível representar as mesmas no plano 3D da rede viária. Cada posição da warehouse (na base de dados) corresponde a uma rotunda na nossa cena, e depois, noutra User Story, vamos ter um modelo de uma warehouse vizinha à rotunda. Após desenharmos as rotundas (que são círculos) vamos ter de desenhar os caminhos entre cada rotunda. Para tal, e seguindo o tutorial e normas de SGRAI, os caminhos entre os armazéns estão divididos em "outgoing edges" e "incoming edges". Tanto as incoming edges e outgoing edges são planos, com orientação e inclinação corresponde à warehouse de início e warehouse final (caminho entre os dois). Tal como é nos pedido, as incoming edges estão no mesmo plano oZ que as warehouses enquanto que outgoing edges são "arcos" (rampas inclinadas entre as warehouses). É necessário ter muito cuidado com as rotações no plano oZ e a rotação no eixo do X para ser possível realizar a orientação e inclinação corretamente. Para além disso adicionamos uma skybox que representa o background da cena e importamos texturas para os planos (textura de estrada) para dar mais vida à cena.

    O fluxo da criação da cena baseia-se, primeiro, na geração de todos os caminhos entre as warehouses (tanto as incoming edges e outgoing edges). Posteriormente vai adicionar à cena todas as rotundas nas posições das warehouses na nossa base de dados (após o cálculo das coordenadas cartesianas). Finalmente, vai adicionar à cena os modelos das warehouses e construir um caminho entre a rotunda e o modelo da warehouse.
  


# Fluxo de Eventos
    1. O usário, dentro do home page do LogisticManager, vai ter uma opção na aba esquerda que vai lhe permitir ingressar para o menu de visualização da rede viária.
    2. Quando o utilizado entra neste menu a rede vai ser construída etapa a etapa e a cena vai ser mostrada ao utilizador.

## Visualização
    1. É ilustrado a cena toda em 3D.


# Integração na Arquitetura geral
Terá de ser criado um serviço que irá receber todos as informações necessárias do backend (das base de dados) pegando em todas essas informações e colocando-as em memória principal para mais tarde serem itereadas pela componente para ser possível construir a cena.

# Armazenamento de dados
Todas as texturas utilizadas e necessárias estão dentro da pasta /assests.
