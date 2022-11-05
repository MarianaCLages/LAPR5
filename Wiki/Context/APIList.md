# Camião
| Method | EndPoints              | Description             | Parameters                  | Response                       |
| :----- | :--------------------- | :---------------------- | :-------------------------- | :----------------------------- |
| POST   | /api/camioes           | Create Camião           | Json with creatingCamiaoDTO | 200 if suceeded, 400 if failed |
| PUT    | /api/camioes           | Update Camião           | Json with updatingCamiaoDTO | 200 if suceeded, 400 if failed |
| GET    | /api/camioes/all       | Get all Camiões         | -                           | List of Camiões                |
| GET    | /api/camioes/caract    | Get Camião by carct     | Json with caract            | Json with all objects          |
| GET    | /api/camioes/matricula | Get Camião by matricula | Json with matricula         | Json with all objects          |

# Caminho
| Method | EndPoints                    | Description           | Parameters                       | Response                       |
| :----- | :--------------------------- | :-------------------- | :------------------------------- | :----------------------------- |
| POST   | /api/caminhos                | Create Caminho        | Json with creatingCaminhoDTO     | 200 if suceeded, 400 if failed |
| PUT    | /api/caminhos                | Alter Caminho         | Json with propreties to change   | 200 if suceeded, 400 if failed |
| DELETE | /api/caminhos                | Delete Caminho        | Json with id to delete           | 200 if suceeded, 400 if failed |
| GET    | /api/caminhos/allCaminhos    | Get all Caminhos      | Nothing                          | Json with all objects          |
| GET    | /api/caminhos/armazemChegada | Get by ArmazemChegada | json with id with armazemChegada | Json with all objects          |
| GET    | /api/caminhos/armazemPartida | Get by ArmazemPartida | json with id with armazemPartida | Json with all objects          |


# Entrega
| Method | EndPoints                                              | Description      | Parameters                     | Response                       |
| :----- | :----------------------------------------------------- | :--------------- | :----------------------------- | :----------------------------- |
| POST   | /api/entregas                                          | Create Entrega   | Json with creatingEntregaDTO   | 200 if suceeded, 400 if failed |
| PUT    | /api/entregas/{idEntrega}                              | Alter Entrega    | Json with propreties to change | 200 if suceeded, 400 if failed |
| DELETE | /api/entregas/{idEntrega}                              | Delete Entrega   | Json with id to delete         | 200 if suceeded, 400 if failed |
| GET    | /api/entregas                                          | Get all          | Nothing                        | Json with all objects          |
| GET    | /api/Encomenda/porId?id={idEntrega}                    | Get by id        | Nothing                        | Json with all objects          |
| GET    | /api/Encomenda/porAmazemId?armazemId={armazemId}       | Get by ArmazemId | Nothing                        | Json with all objects          |
| GET    | /api/Encomenda/porData?data={data}                     | Get by Data      | Nothing                        | Json with all objects          |
| GET    | /api/Encomenda/porFiltragem?data={data}&armazemId={id} | Get by all       | Nothing                        | Json with all objects          |

# Enpacotamento
| Method | EndPoints            | Description          | Parameters                         | Response                       |
| :----- | :------------------- | :------------------- | :--------------------------------- | :----------------------------- |
| POST   | /api/pacotes         | Create Enpacotamento | Json with creatingEnpacotamentoDTO | 200 if suceeded, 400 if failed |
| PUT    | /api/pacotes         | Alter Enpacotamento  | Json with propreties to change     | 200 if suceeded, 400 if failed |
| DELETE | /api/pacotes         | Delete Enpacotamento | Json with id to delete             | 200 if suceeded, 400 if failed |
| GET    | /api/pacotes/all     | Get all              | Nothing                            | Json with all objects          |
| GET    | /api/pacotes         | Get by id            | Json with id to get                | Json with all objects          |
| GET    | /api/pacotes/entrega | Get by EntregaId     | Json with EntregaId to get         | Json with all objects          |
| GET    | /api/pacotes/camiao  | Get by CamiaoId      | Json with CamiaoId to get          | Json with all objects          |

# Armazém
| Method | EndPoints                            | Description      | Parameters                            | Response                       |
| :----- | :----------------------------------- | :--------------- | :------------------------------------ | :----------------------------- |
| POST   | /api/armazens                        | Create Armazém   | Json with creatingArmazemDTO          | 200 if suceeded, 400 if failed |
| PUT    | /api/armazens                        | Alter Armazém    | Json with propreties to change        | 200 if suceeded, 400 if failed |
| DELETE | /api/armazens/{armazemId}            | Delete Armazém   | Json with id to delete                | 200 if suceeded, 400 if failed |
| GET    | /api/Armazem                         | Get all Armazens | Nothing                               | Json with all objects          |
| GET    | /api/Armazem?Designacao={Designacao} | Get              | List with  Designation = {Designacao} | Json with all objects          |
| GET    | /api/Armazem/Id?Id={Id}              | Get              | List with  Id = {Id}                  | Json with all objects          |
| GET    | /api/Armazem/id?id={id}              | Get by id        | Nothing                               | Json with all objects          |

