# Plano de Testes

## Caso 1

### Objetivo

Criar um armazem e visualizar na pagina de listagem

### Passos

| Paso                                                   | Resultado                                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| 1. Autenticar-se como Warehouse Manager                | Autenticado como Warehouse Manager: encontra-se no menu de Warehouse Manager |
| 2. Selecionar o menu Create Warehouse na barra lateral | Encontra o formulário de criação de armazem                                  |
| 3. Preencher formulário                                | Formulário preenchido                                                        |
| 4. Submeter formulário                                 | Armazem criado com sucesso: Popup de sucesso                                 |
| 5. Voltar para a página inicial clicando no botão Back | Encontra-se na página inicial                                                |
| 6. Selecionar o menu List Warehouses na barra lateral  | Encontra a lista de armazéns                                                 |
| 7. Verificar se o armazem criado está na lista         | Armazem criado está na lista                                                 |

## Caso 2

### Objetivo

Criar um caminho entre dois armazéns e visualizar na pagina de listagem

### Pre-condições

- Caso 1 executado com sucesso
- Existem dois armazéns na lista de armazéns

### Passos

| Paso                                                   | Resultado                                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| 1. Autenticar-se como Logistics Manager                | Autenticado como Logistics Manager: encontra-se no menu de Logistics Manager |
| 2. Selecionar o menu Create Path na barra lateral      | Encontra o formulário de criação de caminho                                  |
| 3. Preencher formulário                                | Formulário preenchido                                                        |
| 4. Submeter formulário                                 | Caminho criado com sucesso: Popup de sucesso                                 |
| 5. Voltar para a página inicial clicando no botão Back | Encontra-se na página inicial                                                |
| 6. Selecionar o menu List Paths na barra lateral       | Encontra a lista de caminhos                                                 |
| 7. Verificar se o caminho criado está na lista         | Caminho criado está na lista                                                 |

## Caso 3

### Objetivo

Criar um camião e visualizar na pagina de listagem

### Passos

| Paso                                                   | Resultado                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------------ |
| 1. Autenticar-se como Fleet Manager                    | Autenticado como Fleet Manager: encontra-se no menu de Logistics Manager |
| 2. Selecionar o menu Create Truck na barra lateral     | Encontra o formulário de criação de camião                               |
| 3. Preencher formulário                                | Formulário preenchido                                                    |
| 4. Submeter formulário                                 | Camião criado com sucesso: Popup de sucesso                              |
| 5. Voltar para a página inicial clicando no botão Back | Encontra-se na página inicial                                            |
| 6. Selecionar o menu List Trucks na barra lateral      | Encontra a lista de camiões                                              |
| 7. Verificar se o camião criado está na lista          | Camião criado está na lista                                              |

## Caso 4

### Objetivo

Criar uma order e visualizar na pagina de listagem

### Passos

| Paso                                                   | Resultado                                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| 1. Autenticar-se como Warehouse Manager                | Autenticado como Warehouse Manager: encontra-se no menu de Warehouse Manager |
| 2. Selecionar o menu Create Order na barra lateral     | Encontra o formulário de criação de order                                    |
| 3. Preencher formulário                                | Formulário preenchido                                                        |
| 4. Submeter formulário                                 | Order criada com sucesso: Popup de sucesso                                   |
| 5. Voltar para a página inicial clicando no botão Back | Encontra-se na página inicial                                                |
| 6. Selecionar o menu List Orders na barra lateral      | Encontra a lista de orders                                                   |
| 7. Verificar se a order criada está na lista           | Order criada está na lista                                                   |

## Caso 5

### Objetivo

Criar um packaging e visualizar na pagina de listagem

### Passos

| Paso                                             | Resultado                                                                   |
| ------------------------------------------------ | --------------------------------------------------------------------------- |
| 1. Autenticar-se como Logistic Manager           | Autenticado como Logistic Manager: encontra-se no menu de Warehouse Manager |
| 2. Selecionar o menu Create Packaging            | Encontra o formulário de criação de packaging                               |
| 3. Preencher formulário                          | Formulário preenchido                                                       |
| 4. Submeter formulário                           | Packaging criado com sucesso: Popup de sucesso                              |
| 5. Voltar para a página inicial                  | Encontra-se na página inicial                                               |
| 6. Selecionar o menu List Packaging              | Encontra a lista de packaging                                               |
| 7. Verificar se o packaging criado está na lista | Packaging criado está na lista                                              |

## Caso 6

Criar um armazem e visualizar na visualização 3D

### Pre-condições

- Caso 1 executado com sucesso
- Existem dois armazéns na lista de armazéns
- Existem dois caminhos entre os armazéns
  
### Passos

| Paso                                                           | Resultado                                                                                         |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1. Autenticar-se como Logistics Manager                        | Autenticado como Logistics Manager: encontra-se no menu de Logistics Manager                      |
| 2. Selecionar o menu View Road Network                         | Encontra a visualização 3D e os caminhos entre os armazéns e o numero de armazéns correspondentes |
| 3. Voltar para a página inicial                                | Encontra-se na página inicial                                                                     |
| 4. Selecionar o menu Create Warehouse                          | Encontra o formulário de criação de armazém                                                       |
| 5. Preencher formulário                                        | Formulário preenchido                                                                             |
| 6. Submeter formulário                                         | Armazém criado com sucesso: Popup de sucesso                                                      |
| 7. Voltar para a página inicial                                | Encontra-se na página inicial                                                                     |
| 8. Selecionar o menu View Road Network                         | Encontra a visualização 3D e os caminhos entre os armazéns e o numero de armazéns correspondentes |
| 9. Verificar que existe um armazém a mais na visualização 3D   | Existe um armazém a mais na visualização 3D                                                       |
| 10. Voltar para a página inicial                               | Encontra-se na página inicial                                                                     |
| 11. Selecionar o menu Create Path                              | Encontra o formulário de criação de caminho                                                       |
| 12. Preencher formulário com os armazéns criados anteriormente | Formulário preenchido                                                                             |
| 13. Submeter formulário                                        | Caminho criado com sucesso: Popup de sucesso                                                      |
| 14. Voltar para a página inicial                               | Encontra-se na página inicial                                                                     |
| 15. Selecionar o menu View Road Network                        | Encontra a visualização 3D e os caminhos entre os armazéns e o numero de armazéns correspondentes |
| 16. Verificar que existe um caminho a mais na visualização 3D com os armazéns criados anteriormente | Existe um caminho a mais na visualização 3D com os armazéns criados anteriormente |

