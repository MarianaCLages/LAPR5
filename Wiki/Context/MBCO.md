# MBCO (Minimum Business Continuity Objective)

## Caracterização do Sistema

No diagrama abaixo, temos a representação do sistema de informação da empresa, onde podemos ver que o sistema de informação é composto pelos seguintes módulos:
* Modulo de Front-End
* Modulo de Visualização 3D
* Modulo de Autenticação
* Modulo de Gestão de Armazéns
* Modulo de Logística
* Modulo de Planeamento
  
![Diagrama do Sistema](Artifacts/VL_N2_alt1.svg)
TODO: Mudar este diagrama para a vista física

## Pedido do cliente
Pergunta respondida pelo cliente no forum 

> boa tarde,
> pretende-se que o sistema esteja operacional o máximo de tempo possível, sendo aceites pequenos períodos de indisponibilidade inferiores a 1 hora.
> Preferencialmente o sistema deve ser resiliente o suficiente para suportar funcionamento parcial (apenas alguns módulos estão disponíveis)
> 

Pela resposta do cliente podemos inferir que o sistema deve ser resiliente o suficiente para suportar funcionamento parcial (apenas alguns módulos estão disponíveis) e que o tempo de indisponibilidade deve ser inferior a 1 hora.

Ao nível do sistema podemos inferir um MTD (Maximum Tolerable Downtime) de 1 hora, quanto ao MTPD (Maximum Tolerable Period of Disruption) podemos inferir que o mesmo deve ser superior a 1 hora, estando os módulos principais disponíveis (modulo de Frontend, modulo de Gestão de Logística e modulo de Gestão de Armazéns).
Podemos classificar o modulo de Planeamento e o modulo de Visualização 3D secundários, uma vez que o funcionamento do modulo de planeamento não é fulcral para o funcionamento do sistema e apenas deverá ser usado 1 vez por dia, sendo o modulo de Visualização 3D apenas usado para visualização de dados e não para o funcionamento do sistema.

