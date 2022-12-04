
## Requisitos
    Esta User Story, comparada com as anteriores, difere bastante no que toca de implementação, uma vez que é necessário implementar uma infraestrutura para verificar, sempre que há alterações no master branch do nosso repositório, e verificar a integridade do código e do nosso sistema.

    Aplicando as boas práticas de CI/CD por cada aplicação que temos vamos dividir o processo de avaliação em 3 passos (BUILD -> TEST -> DEPLOY).
    Tal como mencionado, o fluxo apenas vai decorrer neste sentido, então, caso haja algum problema com o passo anterior não vai correr o job atual ou o asseguir.

    A ferramente que utilizamos para fazer o CI (requisito desta US) vai ser no CircleCI, servidor que compila e testa o nosso código.
    Para tal, primeiro importamos o nosso repositório da cloud do bitbucket para que o CircleCI consiga aceder aos ficheiros e dar checkout ao código.

    Sempre que houver uma alteração na master data (master branch), vai ser disparado um trigger para o servidor CircleCI que vai correr o nosso código e gerar as informações necessárias.

    Por fim, caso de erro qualquer job no CircleCI, todos os administradores do servidor vão receber um email a avisar que occoreu um erro durante a execução de 1 job.

<br>

![CD_IMAGE](./WorkFlow_CI_CD.png.png)

    Workflow da nossa CI pipeline.
    
## Fluxo de Eventos
    1. Qualquer membro da equipa de desenvolvimento ao dar push do repositório local para o remoto vai disparar um trigger que vai fazer com que o servidor CircleCI de checkout ao código e comece de forma sistemática a verificar a integridade do código mais recente do repositório.
    2. Após verificar a integridade vai acabar o job e avisar o sucesso da operação.
