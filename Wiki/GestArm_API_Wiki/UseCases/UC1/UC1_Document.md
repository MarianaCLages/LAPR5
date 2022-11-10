# UC 1


## 1. Requisitos
As Warehouse Employee, I want to create a Warehouse.

###Acceptance Criteria

**AC1:** A identificação do armazém é um código único alfanúmerico com 3 caracteres.

**AC2:** Endereço do Warehouse tem de indicar a street, número de porta, código postal, endereço da city e país.

**AC3:** Latitude e Longitude devem ser apresentado por grau,minuto e seconds.

## 2. Análise

## 2.1. Informação

Segundo os requesitos do cliente, o armazém terá de ser desenvolvido através de uma API em dotnet, usando a linguagem C#.
Iremos testar a criação do Armazém fazendo Post Requests á API através do software PostMan pois ainda não temos o FrontEnd implementado.

## 2.2. Análise

Esta é a estrutura de analise de armazém que chegamos segundo o cliente:
![Analise_Warehouse](Analise_Warehouse.svg)


Como podemos observar os objetos: Latitude e Longitude pertencem ao mesmo objeto Coordenadas,
sendo que o objeto Coordenadas está a usar a estrutura de degrees,minutes e seconds, o objeto também
tem as regras de negócio implementadas.

O WarehouseID será o ID de identificação na Base de Dados, já o Alpha Numeric ID é a identificação
de negócio pedida pelo cliente.

![VP_N1_Warehouse](VP_N1_Warehouse.svg)

Numa interação entre cliente e sistema, sem entrar muito em design, o cliente pede
ao sistema que deseja criar um warehouse e o sistema pede as informações dele. Após o cliente
colocar corretamente as informações do Warehouse, este entrará na base de dados com sucesso.

Como atualmente não há tecnicamente nenhuma UI nem roles pois nesta fase do projeto as USs
são testadas através de requests, assumimos que estes pedidos venham de um software que envie requests.

## 3. Design

# 3.1 Informação

 A arquitetura usada para a realização desta US foi o DDD (Domain-Driven Design), onde
o Controller dos Armazéms recebe os requests do cliente e converte o body da request nos objetos
necessários para o funcionamento da US, o Controller irá chamar o Service que será responsável em exercer as funções necessárias
para a satisfação da US. O Service chamará o repositório que fará as comunicações necessárias com a Base de dados.

# 3.2 Vistas de Design

![VL_N3_Warehouse](VL_N3_Warehouse.svg)

![VP_N3_Warehouse](VP_N3_Warehouse.svg)


Como podemos obervar no VP, após o POST request que o cliente envia á API, o Controller converte o corpo num DTO, este será enviado para o Service,
o service terá a responsabilidade de construir o objeto Armazém, o Domínio terá a responsabilidade de verificar se os atributos dos objetos respeitam
as regras de negócio do cliente, após o Service ter fabricado o objeto, irá enviar para o repositório que terá o objetivo
de fazer as comunicações necessárias para adicionar o objeto á Base de Dados.

No fim se tudo correr como foi mencionado, a API enviará ao cliente um 200 OK avisando que o sistema
fez a operação com sucesso se não enviará um 400 avisando que algo da request do cliente não estã bem estruturado ou não
respeita as regras de negócio do cliente.

# 3.3 Padrões Aplicados


* DDD (Persistence Ignorance, Entity, Value Object, Domain Service, Aggregate, Domain Event, Observer, Events);
* GRASI (Information Expert, Creator, Controller, Low Coupling (evaluative), High Cohesion (evaluative), Polymorphism, Pure Fabrication, Indirection, Protected Variations);
    + Information Expert - The service, since has a direct connection with the repositories, in this case, knows all domain concepts from this specific Use Case;
    + Low Coupling and High Cohesion, since we are using a lot of structured layers, all with a specific meaning, we are applying this pattern aswell;


* Data Transfer Object (DTO) pattern;
    + In order to abstract the entities and value objects from the domain layer or business layer we implement DTOs to abstract the UI Layer from the Domain Layer;


## Tests

### Integration Testing

* Adiciona um warehouse, através do AddSync devolvendo um DTO

  
    [Fact]
    public void AddAsyncIntegrationTest_ShouldAddAnWarehouse()
    {
  

    //ARRANGE
    var arm = new Warehouse(new WarehouseId(Guid.NewGuid()), new WarehouseCoordinates(10, 20, 30), new WarehouseCoordinates(10, 30, 40),new DesignationWarehouse("Designação teste"),
    new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"), new AlphaId("A12"));
    var creatingDto =   new CreatingWarehouseDto(10, 20, 30, 
              10, 30, 40, "Designação teste", "Street das flores",
              1, "4000-300", "Pourto", "Pourtougal", "A12");

        
        //ACT
        _repositoryMock.Setup(x => x.AddAsync(arm)).ReturnsAsync(arm);
        var result = _controller.AddAsync(creatingDto).Result;

        var objExpected = result.Value;
        var objActual = WarehouseDtoParser.convertToDto(arm);
        
        objActual.Id = objExpected.Id;
        
        var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
        var obj2StrActual = JsonConvert.SerializeObject(objActual);
        
        //ASSERT
        Assert.Equal(obj1StrExpected, obj2StrActual);
    

###Unit Testing

####Controller Testing
* Adicionar um Warehouse 


    [Fact]
    public void AddAsyncTest_ShouldAddAnWarehouse()
    {
    

    //ARRANGE
  
  
    var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
    new WarehouseCoordinates(12, 13, 14),
    new WarehouseCoordinates(15, 12, 13),
    new DesignationWarehouse("Designação teste"),
    new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
    new AlphaId("A12"));

          var armDto = WarehouseDtoParser.convertToDto(arm);

          CreatingWarehouseDto createDTO = new CreatingWarehouseDto(12, 13, 14, 15, 12, 13, "Designação teste",
          "Street das flores", 1, "4000-300", "Pourto", "Pourtougal", "A12");
        
          //ACT
          _ServiceMock.Setup(x => x.AddAsync(createDTO)).ReturnsAsync(armDto);
          var result = _controller.AddAsync(createDTO).Result;

          var objExpected = armDto;
          var objActual = result.Value;

          var obj1StrExpected = JsonConvert.SerializeObject(objExpected);
          var obj2StrActual = JsonConvert.SerializeObject(objActual);
        
          //ACT
          Assert.Equal(obj1StrExpected, obj2StrActual);
    }

####Service Testing
* Adicionar um Warehouse 



    [Fact]
    public void AddAsyncTest_ShouldAddAnWarehouse()
    {
    //ASSERT
    var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
    new WarehouseCoordinates(10, 20, 30),
    new WarehouseCoordinates(10, 30, 40),
    new DesignationWarehouse("Designação teste"),
    new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
    new AlphaId("A12")); 

    CreatingWarehouseDto armDto = new CreatingWarehouseDto(10, 20, 30, 
                10, 30, 40, "Deisgnação teste", "Street das flores",
                1, "4000-300", "Pourto", "Pourtougal", "A12");
        
            //ACT
            _repositoryMock.Setup(x => x.AddAsync(arm)).ReturnsAsync(arm);

            var resultDTO = WarehouseDtoParser.convertToDto(arm);
            var result = _service.AddAsync(armDto).Result;

            var obj1StrExpected = JsonConvert.SerializeObject(result.ToString());
            var obj2StrActual = JsonConvert.SerializeObject(resultDTO.ToString());

            //ASSERT
            Assert.Equal(obj1StrExpected, obj2StrActual);
      }

####Domain

  * Create a Valid Warehouse Test


    [Fact]
    public void CreateValidWarehouseTest_ShouldCreateAValidWarehouse()
    {
    var arm = new Warehouse(new WarehouseId(Guid.NewGuid()),
    new WarehouseCoordinates(10, 20, 30),
    new WarehouseCoordinates(10, 30, 40),
    new DesignationWarehouse("Designação teste"),
    new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
    new AlphaId("A12"));

        Assert.NotNull(arm);
    }

  * Create Warehouse Invalid ID Test
  

 

      [Fact]
    public void CreateWarehouseWithInvalidWarehouseIdTest_ShouldThrowsANullReferenceException()
    {
    Assert.Throws<NullReferenceException>(() =>
    {
    new Warehouse(new WarehouseId(null),
    new WarehouseCoordinates(10, 20, 30),
    new WarehouseCoordinates(10, 30, 40),
    new DesignationWarehouse("Designação teste"),
    new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
    new AlphaId("A12"));
    });
    }


* Create Warehouse Invalid Empty ID Test

  
    [Fact]
    public void CreateWarehouseWithInvalidWarehouseIdStringVaziaTest_ShouldThrowsAFormatException()
    {
    Assert.Throws<FormatException>(() =>
    {
    new Warehouse(new WarehouseId(""),
    new WarehouseCoordinates(10, 20, 30),
    new WarehouseCoordinates(10, 30, 40),
    new DesignationWarehouse("Designação teste"),
    new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
    new AlphaId("A12"));
    });
    }

* Create Warehouse with invalid Latitude Degrees

  
      [Fact]
    public void CreateWarehouseWithInvalidLatitudeDegreesTest_ShouldThrowsBusinessRuleValidationException()
    {
    Assert.Throws<BusinessRuleValidationException>(() =>
    {
    new Warehouse(new WarehouseId(Guid.NewGuid()),
    new WarehouseCoordinates(-190, 20, 30),
    new WarehouseCoordinates(10, 30, 40),
    new DesignationWarehouse("Designação teste"),
    new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
    new AlphaId("A12"));
    });
    }

* Create Warehouse with invalid Latitude Minutes


    [Fact]
    public void CreateWarehouseWithInvalidLatitudeMinutesTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(10, -20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }
    
* Create Warehouse with invalid Latitude Seconds

  
    [Fact]
    public void CreateWarehouseWithInvalidLatitudeSecondsTest_ShouldThrowsBusinessRuleValidationException()
    {
    Assert.Throws<BusinessRuleValidationException>(() =>
    {
    new Warehouse(new WarehouseId(Guid.NewGuid()),
    new WarehouseCoordinates(10, 20, -30),
    new WarehouseCoordinates(10, 30, 40),
    new DesignationWarehouse("Designação teste"),
    new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
    new AlphaId("A12"));
    });
    }

* Create Warehouse with invalid Designation


    [Fact]
    public void CreateWarehouseWithInvalidDesignationWarehouseTest_ShouldThrowsBusinessRuleValidationException()
    {
    Assert.Throws<BusinessRuleValidationException>(() =>
    {
    new Warehouse(new WarehouseId(Guid.NewGuid()),
    new WarehouseCoordinates(10, 20, 30),
    new WarehouseCoordinates(10, 30, 40),
    new DesignationWarehouse(null),
    new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
    new AlphaId("A12"));
    });
    }

* Createm Warehouse with Invalid Street

  
    [Fact]
    public void CreateWarehouseWithInvalidDesignationEndereçoStreetTest_ShouldThrowsBusinessRuleValidationException()
    {
    Assert.Throws<BusinessRuleValidationException>(() =>
    {
    new Warehouse(new WarehouseId(Guid.NewGuid()),
    new WarehouseCoordinates(-10, 20, 30),
    new WarehouseCoordinates(10, 30, 40),
    new DesignationWarehouse("Designação teste"),
    new WarehouseAddress("", 1, "4000-300", "Pourto", "Pourtougal"),
    new AlphaId("A12"));
    });
    }

* Createm Warehouse with invalid Nr Porta


    [Fact]
    public void CreateWarehouseWithInvalidDesignationEndereçoDoorNumberTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(-10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", -10, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }

* Create Warehouse with invalid Codigo Postal


    [Fact]
    public void CreateWarehouseWithInvalidDesignationEndereçoPostalCodeTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(-10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "", "Pourto", "Pourtougal"),
                new AlphaId("A12"));
        });
    }

* Create Warehouse with invalid City



    [Fact]
    public void CreateWarehouseWithInvalidDesignationEndereçoCityTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(-10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", null, "Pourtougal"),
                new AlphaId("A12"));
        });
    }

* Create Warehouse with invalid Country




    [Fact]
    public void CreateWarehouseWithInvalidDesignationEndereçoCountryTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(-10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", ""),
                new AlphaId("A12"));
        });
    }

* Create invalid AlphaIdTest



    [Fact]
    public void CreateWarehouseWithInvalidAlphaIdTest_ShouldThrowsBusinessRuleValidationException()
    {
        Assert.Throws<BusinessRuleValidationException>(() =>
        {
            new Warehouse(new WarehouseId(Guid.NewGuid()),
                new WarehouseCoordinates(-10, 20, 30),
                new WarehouseCoordinates(10, 30, 40),
                new DesignationWarehouse("Designação teste"),
                new WarehouseAddress("Street das flores", 1, "4000-300", "Pourto", "Pourtougal"),
                new AlphaId("AAAAAAAAA"));
        });
    }

## System Test



					"name": "Warehouse Entity",
					"item": [
						{
							"name": "Test_Case_One",
							"item": [
								{
									"name": "Post_Warehouse",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"const responseJson = pm.response.json();\r",
													"\r",
													"pm.collectionVariables.set(\"id_warehouse\", responseJson.id);\r",
													"pm.collectionVariables.set(\"id_warehouse_domain\", responseJson.alphaNumId);\r",
													"\r",
													"pm.test(\"Status code is 201\", function () {\r",
													"    pm.response.to.have.status(201);\r",
													"});\r",
													"\r",
													"pm.test(\"Response time is less than 2000ms\", function () {\r",
													"    pm.expect(pm.response.responseTime).to.be.below(2000);\r",
													"});\r",
													"\r",
													"pm.test(\"Successful POST request\", function () {\r",
													"    pm.expect(pm.response.code).to.be.oneOf([201, 202]);\r",
													"});\r",
													"\r",
													"pm.test(\"Post With success (Verify body)\", function () {\r",
													"    pm.response.to.have.body(\r",
													"{\r",
													"    \"id\": pm.collectionVariables.get(\"id_warehouse\"),\r",
													"    \"latitudeDegree\": 5,\r",
													"    \"latitudeSecond\": 5,\r",
													"    \"latitudeMinute\": 5,\r",
													"    \"longitudeDregree\": 5,\r",
													"    \"longitudeSecond\": 5,\r",
													"    \"longitudeMinute\": 5,\r",
													"    \"designation\": \"Ola\",\r",
													"    \"alphaNumId\": pm.collectionVariables.get(\"id_warehouse_domain\"),\r",
													"    \"street\": \"Street dos Coiso\",\r",
													"    \"doorNumber\": 5,\r",
													"    \"postalCode\": \"4000-999\",\r",
													"    \"city\": \"Famalicão\",\r",
													"    \"country\": \"Portugal\"\r",
													"});\r",
													"});\r",
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [],
										"body": {
											"mode": "raw",
											"raw": "{\r\n    \"AlphaNumId\" : \"L78\",\r\n    \"LatitudeDegree\" : \"5\",\r\n    \"LatitudeSecond\": \"5\",\r\n    \"LatitudeMinute\": \"5\",\r\n    \"LongitudeDregree\": \"5\",\r\n    \"LongitudeSecond\": \"5\",\r\n    \"LongitudeMinute\": \"5\",\r\n    \"Designation\": \"Ola\",\r\n    \"Street\": \"Street dos Coiso\",\r\n    \"DoorNumber\": \"5\",\r\n    \"PostalCode\": \"4000-999\",\r\n    \"City\": \"Famalicão\",\r\n    \"Country\": \"Portugal\"\r\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "http://localhost:5000/api/Warehouse",
											"protocol": "http",
											"host": [
												"localhost"
											],
											"port": "5000",
											"path": [
												"api",
												"Warehouse"
											]
										}
									},
									"response": []
								},
								{
									"name": "Get_Warehouse_Por_ID",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(\"Status code is 200\", function () {\r",
													"    pm.response.to.have.status(200);\r",
													"});\r",
													"\r",
													"pm.test(\"Response time is less than 500ms\", function () {\r",
													"    pm.expect(pm.response.responseTime).to.be.below(500);\r",
													"});"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "GET",
										"header": [],
										"url": {
											"raw": "http://localhost:5000/api/Warehouse/id?id={{id_warehouse}}",
											"protocol": "http",
											"host": [
												"localhost"
											],
											"port": "5000",
											"path": [
												"api",
												"Warehouse",
												"id"
											],
											"query": [
												{
													"key": "id",
													"value": "{{id_warehouse}}"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "Put_Warehouse",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(\"Status code is 200\", function () {\r",
													"    pm.response.to.have.status(200);\r",
													"});\r",
													"\r",
													"pm.test(\"Response time is less than 2000ms\", function () {\r",
													"    pm.expect(pm.response.responseTime).to.be.below(2000);\r",
													"});\r",
													"\r",
													"pm.test(\"Successful POST request\", function () {\r",
													"    pm.expect(pm.response.code).to.be.oneOf([200, 202]);\r",
													"});"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "PUT",
										"header": [],
										"body": {
											"mode": "raw",
											"raw": "{\r\n    \"Id\" : \"{{id_warehouse}}\",\r\n    \"AlphaNumId\" : \"{{id_warehouse_domain}}\",\r\n    \"LatitudeDegree\" : 3,\r\n    \"LatitudeMinute\" : 5,\r\n    \"LatitudeSecond\" : 4,\r\n    \"LongitudeDregree\" : 8,\r\n    \"LongitudeMinute\" : 6,\r\n    \"LongitudeSecond\" : 2,\r\n    \"Designation\" : \"armazenes\",\r\n    \"Street\" : \"street dos armazenes\",\r\n    \"DoorNumber\" : 123654,\r\n    \"PostalCode\" : \"4000-123\",\r\n    \"City\" : \"armazenes city\",\r\n    \"Country\" : \"armazenes country\"\r\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "http://localhost:5000/api/Warehouse/",
											"protocol": "http",
											"host": [
												"localhost"
											],
											"port": "5000",
											"path": [
												"api",
												"Warehouse",
												""
											]
										}
									},
									"response": []
								},
								{
									"name": "Delete_Warehouse",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(\"Status code is 200\", function () {\r",
													"    pm.response.to.have.status(200);\r",
													"});\r",
													"\r",
													"pm.test(\"Response time is less than 500ms\", function () {\r",
													"    pm.expect(pm.response.responseTime).to.be.below(500);\r",
													"});"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "DELETE",
										"header": [],
										"body": {
											"mode": "raw",
											"raw": "",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "http://localhost:5000/api/Warehouse/{{id_warehouse}}",
											"protocol": "http",
											"host": [
												"localhost"
											],
											"port": "5000",
											"path": [
												"api",
												"Warehouse",
												"{{id_warehouse}}"
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "Test_Case_Two",
							"item": [
								{
									"name": "Post_Warehouse",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"const responseJson = pm.response.json();\r",
													"\r",
													"pm.collectionVariables.set(\"id_warehouse\", responseJson.id);\r",
													"pm.collectionVariables.set(\"designation\", responseJson.designation);\r",
													"\r",
													"pm.test(\"Status code is 201\", function () {\r",
													"    pm.response.to.have.status(201);\r",
													"});\r",
													"\r",
													"pm.test(\"Response time is less than 2000ms\", function () {\r",
													"    pm.expect(pm.response.responseTime).to.be.below(2000);\r",
													"});\r",
													"\r",
													"pm.test(\"Successful POST request\", function () {\r",
													"    pm.expect(pm.response.code).to.be.oneOf([201, 202]);\r",
													"});\r",
													"\r",
													"pm.test(\"Post With success (Verify body)\", function () {\r",
													"    pm.response.to.have.body(\r",
													"{\r",
													"    \"id\": pm.collectionVariables.get(\"id_warehouse\"),\r",
													"    \"latitudeDegree\": 5,\r",
													"    \"latitudeSecond\": 5,\r",
													"    \"latitudeMinute\": 5,\r",
													"    \"longitudeDregree\": 5,\r",
													"    \"longitudeSecond\": 5,\r",
													"    \"longitudeMinute\": 5,\r",
													"    \"designation\": \"Ola\",\r",
													"    \"alphaNumId\": pm.collectionVariables.get(\"id_warehouse_domain\"),\r",
													"    \"street\": \"Street dos Coiso\",\r",
													"    \"doorNumber\": 5,\r",
													"    \"postalCode\": \"4000-999\",\r",
													"    \"city\": \"Famalicão\",\r",
													"    \"country\": \"Portugal\"\r",
													"});\r",
													"});\r",
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [],
										"body": {
											"mode": "raw",
											"raw": "{\r\n    \"AlphaNumId\" : \"L78\",\r\n    \"LatitudeDegree\" : \"5\",\r\n    \"LatitudeSecond\": \"5\",\r\n    \"LatitudeMinute\": \"5\",\r\n    \"LongitudeDregree\": \"5\",\r\n    \"LongitudeSecond\": \"5\",\r\n    \"LongitudeMinute\": \"5\",\r\n    \"Designation\": \"Ola\",\r\n    \"Street\": \"Street dos Coiso\",\r\n    \"DoorNumber\": \"5\",\r\n    \"PostalCode\": \"4000-999\",\r\n    \"City\": \"Famalicão\",\r\n    \"Country\": \"Portugal\"\r\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "http://localhost:5000/api/Warehouse",
											"protocol": "http",
											"host": [
												"localhost"
											],
											"port": "5000",
											"path": [
												"api",
												"Warehouse"
											]
										}
									},
									"response": []
								},