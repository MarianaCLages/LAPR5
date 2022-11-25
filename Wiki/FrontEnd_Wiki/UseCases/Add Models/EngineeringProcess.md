# Requisitos
    Deve ser possível importar um modelo 3D de um armazém.
    Os formatos possíveis deverão ser: 
    - .obj
    - GLTF
    - 3DS
  
    Preferencialmente, o modelo deverá ser importado no momento da criação do armazém. No entanto, se for necessário, o modelo poderá ser importado posteriormente. De modo a facilitar a importação, o modelo deverá ser importado a partir de um arquivo local. 
    Deverá ser associado cada modelo a um armazém. Para esta associação irá ser utilizado um ficheiro de configuração (json no caso). No caso de o armazem não ter um modelo associado, o sistema deverá mostrar um modelo default.
    O modelo default é um modelo base definido pela equipa de desenvolvimento. Este modelo deverá ser utilizado para os armazéns que não tenham um modelo associado.


# Fluxo de Eventos
## Criação de um armazém
    1. O usuário acessa a página de criação de armazém. 
    2. O sistema exibe o formulário de criação de armazém.
    3. O usuário preenche os campos do formulário e clica no botão de criar armazém.
    4.  É feito um request para o servidor com os dados do armazém.
    5.  O servidor recebe o request e cria o armazém.
    6.  O servidor retorna uma mensagem de sucesso.
    7.  O FrontEnd recebe a mensagem de sucesso e exibe uma mensagem de sucesso para o usuário.
    8.  O usuário clica no botão de importar modelo.
    9.  O sistema exibe uma caixa de diálogo para o usuário selecionar o ficheiro.
    10. O usuário seleciona o ficheiro.
    11. O sistema guarda o ficheiro na pasta de assests.
    12. O FrontEnd exibe uma mensagem de sucesso para o usuário


## Visualização
    1. O usuário clica no botão de visualizar armazéns.
    2. É mostrada a rede viária com os armazéns.


# Integração na Arquitetura geral
Terá de ser criado um serviço que irá receber o ficheiro e irá guardar o ficheiro na pasta de assets. Este serviço irá ser chamado pelo FrontEnd quando o usuário clicar no botão de importar modelo. O serviço irá receber o ficheiro e irá guardar o ficheiro na pasta de assets. O serviço irá retornar uma mensagem de sucesso ou erro. O FrontEnd irá receber a mensagem e irá exibir uma mensagem de sucesso ou erro para o usuário.

# Armazenamento de dados
O JSON de configuração irá ser guardado na pasta de assets. No ficheiro de configuração irá conter o id do armazém e o caminho relativo para o ficheiro do modelo. O ficheiro do modelo irá ser guardado na pasta de assets.

