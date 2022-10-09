Projeto SEM_PI_S5

Módulo em ASP.NET Core 5.0 API desenvolvido em DDD e também em Entity Framework.
Adota um estilo arquitetural Onion.

O módulo compreende:
- um dominio com 4 aggregate root (Armazem, Plano, Camião, Rota);
- clara separação entre (i) API REST, (ii) Domínio e (iii) Infraestrutura (Persistência);
- aplicação de algumas regras de negócio/validação.

O dominio contempla as Entidade do negócio, os Serviços (ou casos de uso) envolvendo essas entidades e DTOs (in/out para os serviços de dominio).
