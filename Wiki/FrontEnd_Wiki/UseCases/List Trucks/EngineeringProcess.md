# Requisitos
Os dados da listagem já foram definidos em outras USs. 

- O que acontece se o usuário não preencher algum campo obrigatório? **O sistema não permite a filtragem dos camiões e mostra uma mensagem de erro.**

O Usuário deve estar autenticado como LogisticManager para listar os camiões. Neste momento, a autenticação não está implementada. Existe um mock de autenticação que permite que o usuário seja autenticado como LogisticManager. No próximo sprint, a autenticação será implementada.

# Fluxo de Eventos
## Alternativa 1
1. O usuário acessa a página de listagem de camiões.
2. O sistema exibe uma lista com todos os camiões.

## Alternativa 2
1. O usuário acessa a página de listagem de camiões.
2. O sistema exibe uma lista com todos os camiões.
3. O usário escolhe uma filtragem por matrícula do camião.
4. O sitema mostra o camião com aquela matrícula associada.

## Alternativa 3
1. O usuário acessa a página de listagem de camiões. 
2. O sistema exibe uma lista com todos os camiões.
3. O usário escolhe uma filtragem por característica do camião.
4. O sitema mostra o camião com aquela característica associada.

# Integração
O FrontEnd deve enviar um request para o BackEnd com os dados da listagem.
O BackEnd deve listar os camiões e retornar uma mensagem de sucesso.

Na barra de navegação, o usuário pode clicar no botão de listar camiões. O sistema exibe uma lista de camiões.
Para além disso, como mencionado, existe opções de filtragem, estando estas presentes numa lista em que o usário consegue selecionar e posteriormente escrever o texto correspondente à filtragem.

# Vistas
# Nível 1

## Vista de cenários

![VC_N1](./N1_VC.svg)

## Vista de processos

![VP_N1](./N1_VP_alt1.svg)

# Nível 2

## Vista de processos

### **FRONT END**
<br>

![VP_N3](./VP_N3.svg)

### **BACK END**
<br>

![VP_N3](./N3_VP_backEnd.svg)

## Vista Física

![VF_N2](./VF_N2.svg)

# Nível 3

## Vista de processos

![VP_N3](./VP_N3.svg)

## Vista de implementação

![VI_N3](./VI_N3.svg)

## Vista Lógica

![VL_N3](./N3_VL_Geral.svg)

