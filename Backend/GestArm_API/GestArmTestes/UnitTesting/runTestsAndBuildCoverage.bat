echo on

echo "Ainda precisa de fixes ignorem isto :) É COMPLICADO"

dotnet test --collect:"XPlat Code Coverage"
PushD ".\Dominio\TestResults"

dir /a:d /b > tmpFile 
set /p myvar= < tmpFile 

echo %myvar%

reportgenerator
-reports: "*.xml"
-targetdir: ".\%var%\"
-reporttypes:Latex;HtmlSummary 
-title:ServicosCoverage 
-tag:v1.4.5

del tmpFile 

rmdir /s /q %myvar%

PushD ".."
PushD ".."
PushD ".\Controladores\TestResults"

dir /a:d /b > tmpFile 
set /p myvar= < tmpFile 

reportgenerator
-reports: "*.xml"
-targetdir: ".\%var%\"
-reporttypes:Latex;HtmlSummary 
-title:ServicosCoverage 
-tag:v1.4.5

del tmpFile 

rmdir /s /q %myvar%

PushD ".."
PushD ".."
PushD ".\Servicos\TestResults"

dir /a:d /b > tmpFile 
set /p myvar= < tmpFile 

reportgenerator
-reports: "*.xml"
-targetdir: ".\%var%\"
-reporttypes:Latex;HtmlSummary 
-title:ServicosCoverage 
-tag:v1.4.5

del tmpFile 

rmdir /s /q %myvar%
del %myvar%