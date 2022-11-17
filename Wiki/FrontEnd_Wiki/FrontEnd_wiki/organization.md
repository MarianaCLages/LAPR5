# Organização
A organização do projeto em termos de arquivos segue a organização "padrão" de um projeto em Angular. A estrutura de pastas é a seguinte:

    SPA_wiki
    ├───e2e
    ├───node_modules
    ├───src
    |   ├───modules
    │   |      |───app
    │   |      |   ├───components
    │   |      |   ├───models
    │   |      |   ├───services
    │   |      ├───shared
    |   ├───assets
    |   ├───environments
    |   ├───styles


Estando a pasta de wiki no seu diretório próprio.

## Modules
Deverá ser esta a arquitetura dos módulos usado no projeto. Cada modulo deverá ter a sua pasta com o nome do modulo, e dentro desta pasta deverá ter os componentes, serviços e modelos associados ao modulo.

![ARQ](Arquitetura%20de%20modelos.svg)




## Arquitetura
Existem duas camadas na aplicação: a camada de visualização e a camada de negócio. A camada de visualização pode ser dividida em componentes e a camada de negócio pode ser dividida em serviços. A camada de negócio é responsável por fazer a comunicação com o servidor e tratar os dados recebidos. 
A camada de visualização é responsável por mostrar os dados recebidos da camada de negócio. Os componentes da camada de visualização podem ser constituídos por até 3 arquivos: um arquivo .html, um arquivo .ts e um arquivo .css. O arquivo .html é responsável por mostrar os dados recebidos da camada de negócio. O arquivo .ts é responsável por fazer a comunicação com a camada de negócio e tratar os dados recebidos. O arquivo .css é responsável por estilizar o componente.
A camada de negócio é responsável por fazer a comunicação com o servidor e tratar os dados recebidos. Os serviços da camada de negócio podem ser constituídos por até 2 arquivos: um arquivo .ts e um arquivo .spec.ts. O arquivo .ts é responsável por fazer a comunicação com o servidor e tratar os dados recebidos. O arquivo .spec.ts é responsável por fazer os testes unitários do serviço.

Todos os serviços são utilizados pela camada de visualização como dependências genéricas e adicionadas através de injeção de dependências, levando assim a arquitetura Onion para o front-end.