# Objetivo
O objetivo dos testes E2E (end-to-end) é verificar se o sistema inteiro está a funcionar corretamente. Estes testes simulam a interação do utilizador final com o sistema, enviando entradas e verificando as saídas esperadas.

Os testes cobrem totalmente a entidade Path
## Erros ocasionais
É possível que os testes falhem sem que exista um erro. Isto acontece pela demora da resposta da API de gestão de armazéns. O grupo optou por não aumentar o tempo de timeout e fazer assim que os testes corram sempre com sucesso uma vez que o tempo de resposta é um critério de qualidade não funcional. Portanto faz sentido os testes falhar quando existe uma grande demora.