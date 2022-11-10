# Camião
| Method | EndPoints              | Description             | Parameters                  | Response                       |
| :----- | :--------------------- | :---------------------- | :-------------------------- | :----------------------------- |
| POST   | /api/trucks           | Create Camião           | Json with creatingTruckDTO | 200 if suceeded, 400 if failed |
| PUT    | /api/trucks           | Update Camião           | Json with updatingTruckDTO | 200 if suceeded, 400 if failed |
| GET    | /api/trucks/all       | Get all Camiões         | -                           | List of Camiões                |
| GET    | /api/trucks/caract    | Get Camião by carct     | Json with caract            | Json with all objects          |
| GET    | /api/trucks/plate | Get Camião by plate | Json with plate         | Json with all objects          |

# Path
| Method | EndPoints                    | Description           | Parameters                       | Response                       |
| :----- | :--------------------------- | :-------------------- | :------------------------------- | :----------------------------- |
| POST   | /api/paths                | Create Path        | Json with creatingPathDTO     | 200 if suceeded, 400 if failed |
| PUT    | /api/paths                | Alter Path         | Json with propreties to change   | 200 if suceeded, 400 if failed |
| DELETE | /api/paths                | Delete Path        | Json with id to delete           | 200 if suceeded, 400 if failed |
| GET    | /api/paths/allPaths    | Get all Paths      | Nothing                          | Json with all objects          |
| GET    | /api/paths/warehouseEnding | Get by WarehouseEnding | json with id with warehouseEnding | Json with all objects          |
| GET    | /api/paths/warehouseBeginning | Get by WarehouseBeginning | json with id with warehouseBeginning | Json with all objects          |


# Order
| Method | EndPoints                                              | Description      | Parameters                     | Response                       |
| :----- | :----------------------------------------------------- | :--------------- | :----------------------------- | :----------------------------- |
| POST   | /api/orders                                          | Create Order   | Json with creatingOrderDTO   | 200 if suceeded, 400 if failed |
| PUT    | /api/orders/{idOrder}                              | Alter Order    | Json with propreties to change | 200 if suceeded, 400 if failed |
| DELETE | /api/orders/{idOrder}                              | Delete Order   | Json with id to delete         | 200 if suceeded, 400 if failed |
| GET    | /api/orders                                          | Get all          | Nothing                        | Json with all objects          |
| GET    | /api/Order/porId?id={idOrder}                    | Get by id        | Nothing                        | Json with all objects          |
| GET    | /api/Order/porWarehouseId?warehouseId={warehouseId}       | Get by WarehouseId | Nothing                        | Json with all objects          |
| GET    | /api/Order/porData?data={data}                     | Get by Data      | Nothing                        | Json with all objects          |
| GET    | /api/Order/porFiltragem?data={data}&warehouseId={id} | Get by all       | Nothing                        | Json with all objects          |

# Enpacotamento
| Method | EndPoints            | Description          | Parameters                         | Response                       |
| :----- | :------------------- | :------------------- | :--------------------------------- | :----------------------------- |
| POST   | /api/packagings         | Create Enpacotamento | Json with creatingEnpacotamentoDTO | 200 if suceeded, 400 if failed |
| PUT    | /api/packagings         | Alter Enpacotamento  | Json with propreties to change     | 200 if suceeded, 400 if failed |
| DELETE | /api/packagings         | Delete Enpacotamento | Json with id to delete             | 200 if suceeded, 400 if failed |
| GET    | /api/packagings/all     | Get all              | Nothing                            | Json with all objects          |
| GET    | /api/packagings         | Get by id            | Json with id to get                | Json with all objects          |
| GET    | /api/packagings/order | Get by OrderId     | Json with OrderId to get         | Json with all objects          |
| GET    | /api/packagings/truck  | Get by TruckId      | Json with TruckId to get          | Json with all objects          |

# Armazém
| Method | EndPoints                            | Description      | Parameters                            | Response                       |
| :----- | :----------------------------------- | :--------------- | :------------------------------------ | :----------------------------- |
| POST   | /api/warehouses                        | Create Armazém   | Json with creatingWarehouseDTO          | 200 if suceeded, 400 if failed |
| PUT    | /api/warehouses                        | Alter Armazém    | Json with propreties to change        | 200 if suceeded, 400 if failed |
| DELETE | /api/warehouses/{warehouseId}            | Delete Armazém   | Json with id to delete                | 200 if suceeded, 400 if failed |
| GET    | /api/Warehouse                         | Get all Warehouses | Nothing                               | Json with all objects          |
| GET    | /api/Warehouse?Designation={Designation} | Get              | List with  Designation = {Designation} | Json with all objects          |
| GET    | /api/Warehouse/Id?Id={Id}              | Get              | List with  Id = {Id}                  | Json with all objects          |
| GET    | /api/Warehouse/id?id={id}              | Get by id        | Nothing                               | Json with all objects          |

