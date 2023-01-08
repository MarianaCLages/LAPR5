%entrega(<idEntrega>,<data>,<massaEntrefa>,<armazemEntrega>,<tempoColoc>,<tempoRet>)
entrega(4439, 20221205, 200, 1, 8, 10).
entrega(4438, 20221205, 150, 9, 7, 9).
entrega(4445, 20221205, 100, 3, 5, 7).
entrega(4443, 20221205, 120, 8, 6, 8).
entrega(4449, 20221205, 300, 11, 15, 20).
entrega(4398, 20221205, 310, 17, 16, 20).
entrega(4432, 20221205, 270, 14, 14, 18).
entrega(4437, 20221205, 180, 12, 9, 11).
entrega(4451, 20221205, 220, 6, 9, 12).
entrega(4452, 20221205, 390, 13, 21, 26).
entrega(4444, 20221205, 380, 2, 20, 25).
entrega(4455, 20221205, 280, 7, 14, 19).
entrega(4399, 20221205, 260, 15, 13, 18).
entrega(4454, 20221205, 350, 10, 18, 22).
entrega(4446, 20221205, 260, 4, 14, 17).
entrega(4456, 20221205, 330, 16, 17, 21).

entrega(4999, 20221205, 0, 5, 0, 0).

:-dynamic entrega_armazens/1.
:-dynamic entregas/1.
:-dynamic less_time/1.
:-dynamic less_ind/1.
cam(eTruck01,100).
entrega_armazens([1,9,3,8,11,16]).

entregas([4439,4399,4438,4445,4443,4449]).
%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
carateristicasCam(eTruck01, 7500, 4300, 100, 100, 60).
carateristicasCam(eTruck01, 7500, 4300, 100, 100, 60).
carateristicasCam(eTruck01, 7500, 4300, 100, 100, 60).
%carateristicasCam(eTruck01, 7500, 4300, 100, 100, 60).
%carateristicasCam(eTruck01, 7500, 4300, 100, 100, 60).
%carateristicasCam(eTruck01, 7500, 4300, 100, 100, 60).
%carateristicasCam(eTruck01, 7500, 4300, 100, 100, 60).
%carateristicasCam(eTruck01, 7500, 4300, 100, 100, 60).

%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).
dadosCam_t_e_ta(eTruck01,1,2,122,42,0).
dadosCam_t_e_ta(eTruck01,1,3,122,46,0).
dadosCam_t_e_ta(eTruck01,1,4,151,54,25).
dadosCam_t_e_ta(eTruck01,1,5,147,52,25).
dadosCam_t_e_ta(eTruck01,1,6,74,24,0).
dadosCam_t_e_ta(eTruck01,1,7,116,35,0).
dadosCam_t_e_ta(eTruck01,1,8,141,46,0).
dadosCam_t_e_ta(eTruck01,1,9,185,74,53).
dadosCam_t_e_ta(eTruck01,1,10,97,30,0).
dadosCam_t_e_ta(eTruck01,1,11,164,64,40).
dadosCam_t_e_ta(eTruck01,1,12,76,23,0).
dadosCam_t_e_ta(eTruck01,1,13,174,66,45).
dadosCam_t_e_ta(eTruck01,1,14,59,18,0).
dadosCam_t_e_ta(eTruck01,1,15,132,51,24).
dadosCam_t_e_ta(eTruck01,1,16,181,68,45).
dadosCam_t_e_ta(eTruck01,1,17,128,45,0).

dadosCam_t_e_ta(eTruck01,2,1,116,42,0).
dadosCam_t_e_ta(eTruck01,2,3,55,22,0).
dadosCam_t_e_ta(eTruck01,2,4,74,25,0).
dadosCam_t_e_ta(eTruck01,2,5,65,22,0).
dadosCam_t_e_ta(eTruck01,2,6,69,27,0).
dadosCam_t_e_ta(eTruck01,2,7,74,38,0).
dadosCam_t_e_ta(eTruck01,2,8,61,18,0).
dadosCam_t_e_ta(eTruck01,2,9,103,44,0).
dadosCam_t_e_ta(eTruck01,2,10,36,14,0).
dadosCam_t_e_ta(eTruck01,2,11,88,41,0).
dadosCam_t_e_ta(eTruck01,2,12,61,19,0).
dadosCam_t_e_ta(eTruck01,2,13,95,42,0).
dadosCam_t_e_ta(eTruck01,2,14,78,34,0).
dadosCam_t_e_ta(eTruck01,2,15,69,30,0).
dadosCam_t_e_ta(eTruck01,2,16,99,38,0).
dadosCam_t_e_ta(eTruck01,2,17,46,14,0).

dadosCam_t_e_ta(eTruck01,3,1,120,45,0).
dadosCam_t_e_ta(eTruck01,3,2,50,22,0).
dadosCam_t_e_ta(eTruck01,3,4,46,15,0).
dadosCam_t_e_ta(eTruck01,3,5,46,14,0).
dadosCam_t_e_ta(eTruck01,3,6,74,37,0).
dadosCam_t_e_ta(eTruck01,3,7,63,23,0).
dadosCam_t_e_ta(eTruck01,3,8,38,8,0).
dadosCam_t_e_ta(eTruck01,3,9,84,36,0).
dadosCam_t_e_ta(eTruck01,3,10,59,28,0).
dadosCam_t_e_ta(eTruck01,3,11,61,27,0).
dadosCam_t_e_ta(eTruck01,3,12,67,32,0).
dadosCam_t_e_ta(eTruck01,3,13,67,29,0).
dadosCam_t_e_ta(eTruck01,3,14,82,38,0).
dadosCam_t_e_ta(eTruck01,3,15,34,8,0).
dadosCam_t_e_ta(eTruck01,3,16,80,30,0).
dadosCam_t_e_ta(eTruck01,3,17,36,10,0).

dadosCam_t_e_ta(eTruck01,4,1,149,54,25).
dadosCam_t_e_ta(eTruck01,4,2,65,24,0).
dadosCam_t_e_ta(eTruck01,4,3,46,16,0).
dadosCam_t_e_ta(eTruck01,4,5,27,10,0).
dadosCam_t_e_ta(eTruck01,4,6,103,47,0).
dadosCam_t_e_ta(eTruck01,4,7,55,27,0).
dadosCam_t_e_ta(eTruck01,4,8,36,10,0).
dadosCam_t_e_ta(eTruck01,4,9,50,26,0).
dadosCam_t_e_ta(eTruck01,4,10,78,34,0).
dadosCam_t_e_ta(eTruck01,4,11,42,19,0).
dadosCam_t_e_ta(eTruck01,4,12,97,42,0).
dadosCam_t_e_ta(eTruck01,4,13,44,11,0).
dadosCam_t_e_ta(eTruck01,4,14,111,48,0).
dadosCam_t_e_ta(eTruck01,4,15,32,13,0).
dadosCam_t_e_ta(eTruck01,4,16,53,14,0).
dadosCam_t_e_ta(eTruck01,4,17,38,11,0).

dadosCam_t_e_ta(eTruck01,5,1,141,51,24).
dadosCam_t_e_ta(eTruck01,5,2,55,20,0).
dadosCam_t_e_ta(eTruck01,5,3,48,14,0).
dadosCam_t_e_ta(eTruck01,5,4,25,9,0).
dadosCam_t_e_ta(eTruck01,5,6,97,44,0).
dadosCam_t_e_ta(eTruck01,5,7,55,28,0).
dadosCam_t_e_ta(eTruck01,5,8,29,7,0).
dadosCam_t_e_ta(eTruck01,5,9,48,24,0).
dadosCam_t_e_ta(eTruck01,5,10,69,30,0).
dadosCam_t_e_ta(eTruck01,5,11,53,26,0).
dadosCam_t_e_ta(eTruck01,5,12,95,36,0).
dadosCam_t_e_ta(eTruck01,5,13,63,20,0).
dadosCam_t_e_ta(eTruck01,5,14,105,45,0).
dadosCam_t_e_ta(eTruck01,5,15,34,14,0).
dadosCam_t_e_ta(eTruck01,5,16,46,18,0).
dadosCam_t_e_ta(eTruck01,5,17,27,7,0).

dadosCam_t_e_ta(eTruck01,6,1,69,23,0).
dadosCam_t_e_ta(eTruck01,6,2,71,27,0).
dadosCam_t_e_ta(eTruck01,6,3,74,38,0).
dadosCam_t_e_ta(eTruck01,6,4,103,46,0).
dadosCam_t_e_ta(eTruck01,6,5,99,44,0).
dadosCam_t_e_ta(eTruck01,6,7,88,48,0).
dadosCam_t_e_ta(eTruck01,6,8,92,38,0).
dadosCam_t_e_ta(eTruck01,6,9,134,66,45).
dadosCam_t_e_ta(eTruck01,6,10,42,14,0).
dadosCam_t_e_ta(eTruck01,6,11,116,56,30).
dadosCam_t_e_ta(eTruck01,6,12,23,9,0).
dadosCam_t_e_ta(eTruck01,6,13,126,58,33).
dadosCam_t_e_ta(eTruck01,6,14,25,9,0).
dadosCam_t_e_ta(eTruck01,6,15,84,44,0).
dadosCam_t_e_ta(eTruck01,6,16,132,60,35).
dadosCam_t_e_ta(eTruck01,6,17,80,38,0).

dadosCam_t_e_ta(eTruck01,7,1,116,36,0).
dadosCam_t_e_ta(eTruck01,7,2,71,38,0).
dadosCam_t_e_ta(eTruck01,7,3,61,22,0).
dadosCam_t_e_ta(eTruck01,7,4,53,26,0).
dadosCam_t_e_ta(eTruck01,7,5,53,28,0).
dadosCam_t_e_ta(eTruck01,7,6,88,48,0).
dadosCam_t_e_ta(eTruck01,7,8,59,26,0).
dadosCam_t_e_ta(eTruck01,7,9,88,48,0).
dadosCam_t_e_ta(eTruck01,7,10,84,44,0).
dadosCam_t_e_ta(eTruck01,7,11,74,22,0).
dadosCam_t_e_ta(eTruck01,7,12,82,42,0).
dadosCam_t_e_ta(eTruck01,7,13,76,31,0).
dadosCam_t_e_ta(eTruck01,7,14,97,49,21).
dadosCam_t_e_ta(eTruck01,7,15,29,16,0).
dadosCam_t_e_ta(eTruck01,7,16,84,42,0).
dadosCam_t_e_ta(eTruck01,7,17,69,30,0).

dadosCam_t_e_ta(eTruck01,8,1,134,46,0).
dadosCam_t_e_ta(eTruck01,8,2,59,18,0).
dadosCam_t_e_ta(eTruck01,8,3,32,6,0).
dadosCam_t_e_ta(eTruck01,8,4,34,10,0).
dadosCam_t_e_ta(eTruck01,8,5,32,7,0).
dadosCam_t_e_ta(eTruck01,8,6,88,38,0).
dadosCam_t_e_ta(eTruck01,8,7,57,26,0).
dadosCam_t_e_ta(eTruck01,8,9,69,30,0).
dadosCam_t_e_ta(eTruck01,8,10,65,26,0).
dadosCam_t_e_ta(eTruck01,8,11,53,22,0).
dadosCam_t_e_ta(eTruck01,8,12,82,34,0).
dadosCam_t_e_ta(eTruck01,8,13,61,24,0).
dadosCam_t_e_ta(eTruck01,8,14,97,40,0).
dadosCam_t_e_ta(eTruck01,8,15,36,12,0).
dadosCam_t_e_ta(eTruck01,8,16,65,23,0).
dadosCam_t_e_ta(eTruck01,8,17,32,6,0).

dadosCam_t_e_ta(eTruck01,9,1,181,72,50).
dadosCam_t_e_ta(eTruck01,9,2,95,41,0).
dadosCam_t_e_ta(eTruck01,9,3,86,35,0).
dadosCam_t_e_ta(eTruck01,9,4,55,24,0).
dadosCam_t_e_ta(eTruck01,9,5,48,23,0).
dadosCam_t_e_ta(eTruck01,9,6,134,65,42).
dadosCam_t_e_ta(eTruck01,9,7,95,47,0).
dadosCam_t_e_ta(eTruck01,9,8,69,28,0).
dadosCam_t_e_ta(eTruck01,9,10,109,51,24).
dadosCam_t_e_ta(eTruck01,9,11,61,29,0).
dadosCam_t_e_ta(eTruck01,9,12,132,57,31).
dadosCam_t_e_ta(eTruck01,9,13,67,19,0).
dadosCam_t_e_ta(eTruck01,9,14,143,66,45).
dadosCam_t_e_ta(eTruck01,9,15,71,34,0).
dadosCam_t_e_ta(eTruck01,9,16,15,3,0).
dadosCam_t_e_ta(eTruck01,9,17,67,28,0).

dadosCam_t_e_ta(eTruck01,10,1,97,30,0).
dadosCam_t_e_ta(eTruck01,10,2,34,14,0).
dadosCam_t_e_ta(eTruck01,10,3,59,27,0).
dadosCam_t_e_ta(eTruck01,10,4,78,33,0).
dadosCam_t_e_ta(eTruck01,10,5,71,30,0).
dadosCam_t_e_ta(eTruck01,10,6,40,14,0).
dadosCam_t_e_ta(eTruck01,10,7,82,42,0).
dadosCam_t_e_ta(eTruck01,10,8,65,24,0).
dadosCam_t_e_ta(eTruck01,10,9,109,52,25).
dadosCam_t_e_ta(eTruck01,10,11,92,46,0).
dadosCam_t_e_ta(eTruck01,10,12,32,6,0).
dadosCam_t_e_ta(eTruck01,10,13,99,46,0).
dadosCam_t_e_ta(eTruck01,10,14,63,17,0).
dadosCam_t_e_ta(eTruck01,10,15,74,34,0).
dadosCam_t_e_ta(eTruck01,10,16,105,46,0).
dadosCam_t_e_ta(eTruck01,10,17,53,23,0).

dadosCam_t_e_ta(eTruck01,11,1,164,65,42).
dadosCam_t_e_ta(eTruck01,11,2,88,41,0).
dadosCam_t_e_ta(eTruck01,11,3,65,28,0).
dadosCam_t_e_ta(eTruck01,11,4,42,18,0).
dadosCam_t_e_ta(eTruck01,11,5,55,25,0).
dadosCam_t_e_ta(eTruck01,11,6,118,57,31).
dadosCam_t_e_ta(eTruck01,11,7,74,23,0).
dadosCam_t_e_ta(eTruck01,11,8,59,23,0).
dadosCam_t_e_ta(eTruck01,11,9,63,28,0).
dadosCam_t_e_ta(eTruck01,11,10,97,46,0).
dadosCam_t_e_ta(eTruck01,11,12,111,52,25).
dadosCam_t_e_ta(eTruck01,11,13,25,7,0).
dadosCam_t_e_ta(eTruck01,11,14,126,58,33).
dadosCam_t_e_ta(eTruck01,11,15,53,25,0).
dadosCam_t_e_ta(eTruck01,11,16,59,27,0).
dadosCam_t_e_ta(eTruck01,11,17,67,27,0).

dadosCam_t_e_ta(eTruck01,12,1,76,23,0).
dadosCam_t_e_ta(eTruck01,12,2,61,19,0).
dadosCam_t_e_ta(eTruck01,12,3,67,32,0).
dadosCam_t_e_ta(eTruck01,12,4,97,41,0).
dadosCam_t_e_ta(eTruck01,12,5,92,38,0).
dadosCam_t_e_ta(eTruck01,12,6,19,8,0).
dadosCam_t_e_ta(eTruck01,12,7,82,42,0).
dadosCam_t_e_ta(eTruck01,12,8,86,33,0).
dadosCam_t_e_ta(eTruck01,12,9,128,61,37).
dadosCam_t_e_ta(eTruck01,12,10,32,6,0).
dadosCam_t_e_ta(eTruck01,12,11,109,50,23).
dadosCam_t_e_ta(eTruck01,12,13,120,53,26).
dadosCam_t_e_ta(eTruck01,12,14,40,10,0).
dadosCam_t_e_ta(eTruck01,12,15,78,38,0).
dadosCam_t_e_ta(eTruck01,12,16,126,54,28).
dadosCam_t_e_ta(eTruck01,12,17,74,32,0).

dadosCam_t_e_ta(eTruck01,13,1,174,65,42).
dadosCam_t_e_ta(eTruck01,13,2,107,35,0).
dadosCam_t_e_ta(eTruck01,13,3,74,29,0).
dadosCam_t_e_ta(eTruck01,13,4,46,11,0).
dadosCam_t_e_ta(eTruck01,13,5,67,20,0).
dadosCam_t_e_ta(eTruck01,13,6,128,57,31).
dadosCam_t_e_ta(eTruck01,13,7,80,30,0).
dadosCam_t_e_ta(eTruck01,13,8,76,20,0).
dadosCam_t_e_ta(eTruck01,13,9,67,20,0).
dadosCam_t_e_ta(eTruck01,13,10,105,47,0).
dadosCam_t_e_ta(eTruck01,13,11,27,7,0).
dadosCam_t_e_ta(eTruck01,13,12,122,52,25).
dadosCam_t_e_ta(eTruck01,13,14,137,58,33).
dadosCam_t_e_ta(eTruck01,13,15,67,17,0).
dadosCam_t_e_ta(eTruck01,13,16,59,15,0).
dadosCam_t_e_ta(eTruck01,13,17,78,22,0).

dadosCam_t_e_ta(eTruck01,14,1,59,18,0).
dadosCam_t_e_ta(eTruck01,14,2,80,35,0).
dadosCam_t_e_ta(eTruck01,14,3,80,38,0).
dadosCam_t_e_ta(eTruck01,14,4,109,46,0).
dadosCam_t_e_ta(eTruck01,14,5,105,45,0).
dadosCam_t_e_ta(eTruck01,14,6,27,9,0).
dadosCam_t_e_ta(eTruck01,14,7,97,48,0).
dadosCam_t_e_ta(eTruck01,14,8,99,38,0).
dadosCam_t_e_ta(eTruck01,14,9,143,66,45).
dadosCam_t_e_ta(eTruck01,14,10,61,17,0).
dadosCam_t_e_ta(eTruck01,14,11,122,57,31).
dadosCam_t_e_ta(eTruck01,14,12,42,10,0).
dadosCam_t_e_ta(eTruck01,14,13,132,58,35).
dadosCam_t_e_ta(eTruck01,14,15,90,44,0).
dadosCam_t_e_ta(eTruck01,14,16,139,61,37).
dadosCam_t_e_ta(eTruck01,14,17,86,38,0).

dadosCam_t_e_ta(eTruck01,15,1,132,51,24).
dadosCam_t_e_ta(eTruck01,15,2,74,30,0).
dadosCam_t_e_ta(eTruck01,15,3,34,8,0).
dadosCam_t_e_ta(eTruck01,15,4,36,12,0).
dadosCam_t_e_ta(eTruck01,15,5,36,14,0).
dadosCam_t_e_ta(eTruck01,15,6,86,44,0).
dadosCam_t_e_ta(eTruck01,15,7,34,16,0).
dadosCam_t_e_ta(eTruck01,15,8,42,13,0).
dadosCam_t_e_ta(eTruck01,15,9,71,35,0).
dadosCam_t_e_ta(eTruck01,15,10,82,36,0).
dadosCam_t_e_ta(eTruck01,15,11,53,25,0).
dadosCam_t_e_ta(eTruck01,15,12,80,38,0).
dadosCam_t_e_ta(eTruck01,15,13,69,18,0).
dadosCam_t_e_ta(eTruck01,15,14,95,45,0).
dadosCam_t_e_ta(eTruck01,15,16,69,29,0).
dadosCam_t_e_ta(eTruck01,15,17,53,17,0).

dadosCam_t_e_ta(eTruck01,16,1,179,68,45).
dadosCam_t_e_ta(eTruck01,16,2,92,37,0).
dadosCam_t_e_ta(eTruck01,16,3,84,31,0).
dadosCam_t_e_ta(eTruck01,16,4,57,16,0).
dadosCam_t_e_ta(eTruck01,16,5,46,18,0).
dadosCam_t_e_ta(eTruck01,16,6,132,60,35).
dadosCam_t_e_ta(eTruck01,16,7,92,42,0).
dadosCam_t_e_ta(eTruck01,16,8,67,23,0).
dadosCam_t_e_ta(eTruck01,16,9,15,3,0).
dadosCam_t_e_ta(eTruck01,16,10,105,46,0).
dadosCam_t_e_ta(eTruck01,16,11,57,28,0).
dadosCam_t_e_ta(eTruck01,16,12,130,52,25).
dadosCam_t_e_ta(eTruck01,16,13,61,15,0).
dadosCam_t_e_ta(eTruck01,16,14,141,61,37).
dadosCam_t_e_ta(eTruck01,16,15,69,29,0).
dadosCam_t_e_ta(eTruck01,16,17,65,24,0).

dadosCam_t_e_ta(eTruck01,17,1,128,46,0).
dadosCam_t_e_ta(eTruck01,17,2,42,14,0).
dadosCam_t_e_ta(eTruck01,17,3,40,11,0).
dadosCam_t_e_ta(eTruck01,17,4,42,13,0).
dadosCam_t_e_ta(eTruck01,17,5,34,10,0).
dadosCam_t_e_ta(eTruck01,17,6,82,38,0).
dadosCam_t_e_ta(eTruck01,17,7,74,30,0).
dadosCam_t_e_ta(eTruck01,17,8,29,6,0).
dadosCam_t_e_ta(eTruck01,17,9,69,31,0).
dadosCam_t_e_ta(eTruck01,17,10,55,24,0).
dadosCam_t_e_ta(eTruck01,17,11,69,29,0).
dadosCam_t_e_ta(eTruck01,17,12,80,30,0).
dadosCam_t_e_ta(eTruck01,17,13,82,23,0).
dadosCam_t_e_ta(eTruck01,17,14,90,38,0).
dadosCam_t_e_ta(eTruck01,17,15,53,18,0).
dadosCam_t_e_ta(eTruck01,17,16,67,25,0).


%idArmazem(<local>,<codigo>)
idArmazem('Arouca',1).
idArmazem('Espinho',2).
idArmazem('Gondomar',3).
idArmazem('Maia',4).
idArmazem('Matosinhos',5).
idArmazem('Oliveira de Azemeis',6).
idArmazem('Paredes',7).
idArmazem('Porto',8).
idArmazem('Povoa de Varzim',9).
idArmazem('Santa Maria da Feira',10).
idArmazem('Santo Tirso',11).
idArmazem('Sao Joao da Madeira',12).
idArmazem('Trofa',13).
idArmazem('Vale de Cambra',14).
idArmazem('Valongo',15).
idArmazem('Vila do Conde',16).
idArmazem('Vila Nova de Gaia',17).


:-dynamic tempo/1.
:-dynamic massa/1.
:-dynamic massatempo/1.
:-dynamic cam/2.

%dynamic variables
:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic num_orders/1.
:-dynamic current_order/1.
:-dynamic best_ind/1.
:-dynamic old_pop/1.
:-dynamic num_ind/1.
:-dynamic melhor_entrega/1.
:-dynamic num_best_n/1.
:-dynamic old_best_n/1.
%tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao).
tarefa(t1,2,5,1).
tarefa(t2,4,7,6).
tarefa(t3,1,11,2).
tarefa(t4,3,9,3).
tarefa(t5,3,8,2).
% tarefas(NTarefas).


%HEURISTICA A DEVOLVER AS ENTREGAS

bfs_tempo_entrega(Cam,T,OrdList):-
    retractall(tempo(_)),
    retractall(current_order(_)),
    assertz(tempo(10000)),
    assertz(current_order(5555)),
    entrega_armazens(Ent),
    delete(Ent,5,Ent2),
    bfs2_tempo_entrega(Ent2,[5],Cam,T,[],OrdList).

bfs2_tempo_entrega([],[Final|LA],Cam,T,TempList,OrdList):-
    !,reverse([5,Final|LA],Cam),
    reverse(TempList,OrdList),
    dadosCam_t_e_ta(_,Final,5,T,_,_).

bfs2_tempo_entrega(Ent,[Act|LA],Cam,T,TempList,OrdList):-
    findall([X|LA],
            (   dadosCam_t_e_ta(_,Act,X,_,_,_),member(X,Ent)),Novos),
    tempo_act_x13(Act,Novos,P),
    delete(Ent,P,Ent2),
    tempo(TempoMin),
    current_order(Order),
    append_inicio14(P,[Act|LA],Todos),
    TempList2 = [Order|TempList],
    bfs2_tempo_entrega(Ent2,Todos,Cam,T2,TempList2,OrdList),
    T is TempoMin+T2.

append_inicio14(P,L,[P|L]).

tempo_act_x13(_,[],0):-retract(tempo(_)),assertz(tempo(10000)).
tempo_act_x13(Act,[[A|_]|Novos],X):-
    tempo_act_x13(Act,Novos,X2),
    dadosCam_t_e_ta(_,Act,A,T,E,_),
    entrega(Order,_,_,A,COLO,_),
    tempo(TempoMin),
    cam(TR,CE),
    ED is CE - E,
    (   (ED > 0,!,T2 is T + COLO , CE2 is CE);(getChargingTime(CE,CT),T2 is T + CT + COLO , CE2 is 100)  ),
    (   (TempoMin>T2,!,retract(cam(_,_)),assertz(cam(TR,CE2)),retract(current_order(_)),assertz(current_order(Order)),retract(tempo(_)),assertz(tempo(T2)),X=A);X=X2).



bfs_massa(Cam,OrdList):-
    retractall(massa(_)),
    retractall(current_order(_)),
    assertz(massa(0)),
    assertz(current_order(5555)),
    entrega_armazens(Ent),
    delete(Ent,5,Ent2),
    bfs_massa2(Ent2,[5],Cam,[],OrdList).

bfs_massa2([],LA,Cam,TempList,OrdList):-
    !,reverse([5|LA],Cam),reverse(TempList,OrdList).

bfs_massa2(Ent,[Act|LA],Cam,TempList,OrdList):-
    findall([X|LA],
            (dadosCam_t_e_ta(_,Act,X,_,_,_),member(X,Ent)),Novos),
    massa_act(Act,Novos,P),
    delete(Ent,P,Ent2),
    current_order(Order),
    append_inicio3(P,[Act|LA],Todos),
    TempList2 = [Order|TempList],
    bfs_massa2(Ent2,Todos,Cam,TempList2,OrdList).

append_inicio3(P,L,[P|L]).

massa_act(_,[],0):-retract(massa(_)),assertz(massa(0)).
massa_act(Act,[[A|_]|Novos],X):-
    massa_act(Act,Novos,X2),
    entrega(Order,_,M,A,_,_),
    massa(Massa),
    (   (Massa<M,!,retract(massa(_)),assertz(massa(M)),retract(current_order(_)),assertz(current_order(Order)),X=A);X=X2).


bfs_massa_tempo(Cam,OrdList):-
    retractall(massa(_)),
    retractall(current_order(_)),
    assertz(massatempo(0)),
    assertz(current_order(5555)),
    entrega_armazens(Ent),
    delete(Ent,5,Ent2),
    bfs_massa_tempo2(Ent2,[5],Cam,[],OrdList).

bfs_massa_tempo2([],LA,Cam,TempList,OrdList):-
    !,reverse([5|LA],Cam),reverse(TempList,OrdList).

bfs_massa_tempo2(Ent,[Act|LA],Cam,TempList,OrdList):-
    findall([X|LA],(dadosCam_t_e_ta(_,Act,X,_,_,_),member(X,Ent)),Novos),
    massa_tempo_act(Act,Novos,P),
    delete(Ent,P,Ent2),
    current_order(Order),
    append_inicio4(P,[Act|LA],Todos),
    TempList2 = [Order|TempList],
    bfs_massa_tempo2(Ent2,Todos,Cam,TempList2,OrdList).

append_inicio4(P,L,[P|L]).

massa_tempo_act(_,[],0):-retract(massatempo(_)),assertz(massatempo(0)).
massa_tempo_act(Act,[[A|_]|Novos],X):-
    massa_tempo_act(Act,Novos,X2),
    entrega(Order,_,M,A,_,RET),
    dadosCam_t_e_ta(_,Act,A,T,E,_),
    massatempo(MassaTempo),
    cam(TR,CE),
    ED is CE - E,
    (   (ED > 0,!,T2 is T + RET,CE2 is CE);(getChargingTime(CE,CT),T2 is T + CT + RET,CE2 is CE)  ),
    D = M / T2,
    (   (MassaTempo< D,!,retract(cam(_,_)),assertz(cam(TR,CE2)),retract(massatempo(_)),assertz(massatempo(D)),retract(current_order(_)),assertz(current_order(Order)),X=A);X=X2).



%-------------------------------AG------------------------%

gera(B,I,G):-
    %retract(num_ind(_)),
    entrega_armazens(A),
    assertz(num_best_n(B)),
    assertz(old_best_n(1)),
    length(A,_),
    assertz(num_ind(I)),
    Temp = 9999,
    Less = [1,2,3],
    BestInd = [2,3,1]*1000, %colocar um melhor individuo de comparaï¿½ï¿½o
    assertz(best_ind(BestInd)),
    assertz(less_time(Temp)),
    assertz(less_ind(Less)),
    bfs_tempo_entrega(_,_,OrdList), %gerar 3 individuos com as 3 heuristicas
    bfs_massa(_,OrdList2),
    bfs_massa_tempo(_,OrdList3),
    %OrdList4 = [OrdList,OrdList2,OrdList3],
    %write('\n\nORDER LIST4:  '),write(OrdList4),
    count_seq_orders(OrdList,Count), %contar o numero de orders
    assertz(num_orders(Count)),
    %gera_populacao(OrdList,Pop),
    gera_first_populacao(OrdList,Pop2), % a gera_first_populaï¿½ï¿½o tem em conta que 3 individuos jï¿½ foram previemente criados (as das heuristicas), ou seja este sï¿½ vai gerar +3 individuo
    append(Pop2,[OrdList],Pop3),
    append(Pop3,[OrdList2],Pop4),
    append(Pop4,[OrdList3],Pop5), %estes appends servem para adicionar os individuos da heuristica ï¿½ Populaï¿½ï¿½o inicial
    retractall(old_pop(_)),
    assertz(old_pop(Pop5)),
    write('\n\nPopulação gerada:\n\n'),
    write(Pop5),
    avalia_populacao(Pop5,PopAv),
    write('\n\nPopulação Avaliada:\n\n'),
    write(PopAv),
    ordena_populacao(PopAv,PopOrd),
    write('\n\nOrdena Pop:\n\n'),
    write(PopOrd),
    %num_ind(G),
    %NG is 6,
    gera_geracao(0,G,PopOrd,0),
    less_ind(Ind),
    less_time(Time),
    write('\n\nMELHOR INDIVÍDUO:  '),
    write(Ind),
    write('\nTEMPO: '),
    write(Time),

    retractall(less_time(_)),
    retractall(less_ind(_)),
    retractall(old_pop(_)),
    retractall(num_ind(_)),
    retractall(geracoes(_)),
    retractall(populacao(_)),
    retractall(melhor_entrega(_)),
    retractall(best_ind(_)),
    retractall(prob_cruzamento(_)),
    retractall(prob_mutacao(_)),
    retractall(current_order(_)),
    retractall(num_orders(_)),
    retractall(tempo(_)),
    retractall(massa(_)),
    retractall(massatempo(_)),
    retractall(num_best_n(_)),
    retractall(old_best_n(_)).

gera2(Ind):-
    %retract(num_ind(_)),
    assertz(num_ind(6)),
    assertz(num_best_n(2)),
    assertz(old_best_n(1)),
    Temp = 9999,
    Less = [1,2,3],
    BestInd = [2,3,1]*1000, %colocar um melhor individuo de comparaï¿½ï¿½o
    assertz(best_ind(BestInd)),
    assertz(less_time(Temp)),
    assertz(less_ind(Less)),
    bfs_tempo_entrega(_,_,OrdList), %gerar 3 individuos com as 3 heuristicas
    bfs_massa(_,OrdList2),
    bfs_massa_tempo(_,OrdList3),
    %OrdList4 = [OrdList,OrdList2,OrdList3],
    %write('\n\nORDER LIST4:  '),write(OrdList4),
    count_seq_orders(OrdList,Count), %contar o numero de orders
    assertz(num_orders(Count)),
    %gera_populacao(OrdList,Pop),
    gera_first_populacao(OrdList,Pop2), % a gera_first_populaï¿½ï¿½o tem em conta que 3 individuos jï¿½ foram previemente criados (as das heuristicas), ou seja este sï¿½ vai gerar +3 individuo
    append(Pop2,[OrdList],Pop3),
    append(Pop3,[OrdList2],Pop4),
    append(Pop4,[OrdList3],Pop5), %estes appends servem para adicionar os individuos da heuristica ï¿½ Populaï¿½ï¿½o inicial
    retractall(old_pop(_)),
    assertz(old_pop(Pop5)),
    avalia_populacao(Pop5,PopAv),
    ordena_populacao(PopAv,PopOrd),
    num_ind(NG),
    %NG is 6,
    gera_geracao(0,NG,PopOrd,0),
    less_ind(Ind),
    write('\n\nMelhor indivíduo: '),
    write(Ind),

    retractall(less_time(_)),
    retractall(less_ind(_)),
    retractall(old_pop(_)),
    retractall(num_ind(_)),
    retractall(geracoes(_)),
    retractall(populacao(_)),
    retractall(melhor_entrega(_)),
    retractall(best_ind(_)),
    retractall(prob_cruzamento(_)),
    retractall(prob_mutacao(_)),
    retractall(current_order(_)),
    retractall(num_orders(_)),
    retractall(tempo(_)),
    retractall(massa(_)),
    retractall(massatempo(_)),
    retractall(num_best_n(_)),
    retractall(old_best_n(_)).

count_seq_orders([],0).
count_seq_orders([_|Cam],Count):- count_seq_orders(Cam,Count2), Count is Count2 + 1.

% Gera Populacao

gera_first_populacao(Cam,Pop):-
    num_ind(X),
    num_orders(NumT),
    TamPop = X -3,
    gera_populacao(TamPop,Cam,NumT,Pop).

gera_populacao(Cam,Pop):-
    num_orders(NumT),
    TamPop is 6,
    gera_populacao(TamPop,Cam,NumT,Pop),retractall(old_pop(_)),assertz(old_pop(Pop)).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
TamPop1 is TamPop-1,
gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
gera_individuo(ListaTarefas,NumT,Ind), %o Ind estï¿½ vazio e vai ser atribuido uma sequencia da Lista de Tarefas
not(member(Ind,Resto)). % nao pode ser repetido...por isso se tal acontecer repete-se a operacao

gera_populacao(TamPop,ListaTarefas,NumT,L):-
gera_populacao(TamPop,ListaTarefas,NumT,L).


%GERA INDIVIDUO

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
NumTemp is NumT + 1, % para usar com random,
random(1,NumTemp,N), %vai buscar uma tarefa aleatoria
retira(N,ListaTarefas,G,NovaLista), %retira a tarefa
NumT1 is NumT-1,
gera_individuo(NovaLista,NumT1,Resto).


retira(1,[G|Resto],G,Resto).

retira(N,[G1|Resto],G,[G1|Resto1]):- N1 is N-1,
retira(N1,Resto,G,Resto1).


%AVALIA POPULACAO
%
% avalia a populacao fornecida no gera populacao, vai buscar cada
% invidividuo nela e converte no formato individuo*avaliacao, sendo a
% avaliacao a soma do atraso
%
%
avalia_populacao([],[]).

avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
    avalia_cam(Ind,V),
    avalia_populacao(Resto,Resto1).

%avalia(Seq,V):- avalia(Seq,0,V).

%avalia([ ],_,0).

%avalia([T|Resto],Inst,V):-
%tarefa(T,Dur,Prazo,Pen),
%InstFim is Inst+Dur,
%avalia(Resto,InstFim,VResto).
%
%
%((InstFim =< Prazo,!, VT is 0) ; (VT is (InstFim-Prazo)*Pen)),
%V is VT+VResto.

avalia_cam(Ind,T):-

    get_cam_arm(Ind,Arm),
    reverse(Arm,Arm2),
    reverse(Arm2,Arm3),
    bestPath(Arm3,eTruck01,_,_,T2), %chamamos um predicado do Sprint anterior, que dado um caminho calcula o tempo do mesmo.
    T is T2,
    less_time(X),
    ((T2 < X,!,retract(less_time(_)),assertz(less_time(T)),retract(less_ind(_)),assertz(less_ind(Ind)));!).

get_cam_arm([],_).
get_cam_arm([X|L],[Y|L2]):-entrega(X,_,_,Y,_,_),get_cam_arm(L,L2).

ordena_populacao(PopAv,PopAvOrd):-
%retractall(best_ind(_)),
    bsort(PopAv,PopAvOrd),
    getBest(PopAvOrd).


getBest(X) :-
    num_best_n(N),
    getBestWithN(X, N, R),
    best_ind(Old_Value),
    assertz(old_best_n(Old_Value)),
    retractall(best_ind(_)),
    assertz(best_ind(R)).

getBestWithN(_, 0, []) :- !.
getBestWithN([X|Pop], N, [X|R]) :-
    N1 is N-1,
    getBestWithN(Pop, N1, R).

bsort([X],[X]):-!. %Paragem quando Xs tiver sï¿½ um elemento e esse elemento fica dentro da Nova Ordem.

bsort([X|Xs],Ys):-
bsort(Xs,Zs), %Vai correr a recursividade toda, quando volta atrï¿½s o Zs sï¿½ tem um elemento sendo o X.
btroca([X|Zs],Ys).% Assumindo que isto ï¿½ a primeira vez que chama este predicado, o Zs comeï¿½a com 2 elementos

btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
       VX>VY,!,btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).

same([], []).

same([H1|R1], [H2|R2]):-
    H1 = H2,
    same(R1, R2).

%Gera Geraï¿½ï¿½o
%
% ï¿½ aqui que sao criadas as novas geracoes da populaï¿½ï¿½o apï¿½s
% os cruzamentos, mutaï¿½ï¿½es e avaliacao dos novos indivï¿½duos de
% cada populacao

% o primeiro parametro ï¿½ o inicio da geracao, o segundo ï¿½ a ultima
% geracao e a PopOrd ï¿½ a populacao criada e ordenada.
%

% A Paragem acontece obviamente quando o atual nr da geracao ï¿½ igual
% ï¿½ geracao final.

gera_geracao(_,_,_,40):-!.

gera_geracao(G,G,Pop,_):-!,
write('\n\nGeração '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao(N,G,Pop,NS):-

% IF THEN ELSE, comparar o valor de 2 gerações atrás com o da geração
% atrás e somar o valor para fazer a condição de paragem de estagnar,
% por completo, o melhor indivíduo

old_best_n(OldValue),
best_ind(NewValue),

((same(NewValue,OldValue),!,(NVal is NS+1);(NVal is 0))),

retractall(old_best_n(_)),

write('\n\nGeração '), write(N), write(':'), nl, write(Pop), nl,

%condiÃ§Ã£o de paragem qnd a geraÃ§Ã£o estagnou

random_permutation(Pop,Pop2), %desorganizamos os individuos
cruzamento(Pop2,NPop1), %Pop ï¿½ a lista que temos Npop1 ï¿½ a nova lista que serï¿½ feita com o cruzamento.
mutacao(NPop1,NPop), % Com a nova geraï¿½ï¿½o (NPop1) faz-se a mutaï¿½ï¿½o dela.

old_pop(OldPop),
%FAZER AQUI A JUNÇÃO DA LISTA APOS MUTAÇÃO E ANTIGA
append(NPop,OldPop,NewList),

%ORDENAR A POPULAÇÃO APÓS A JUNÇÃO
%GET BEST DOS MELHORES DESTA LISTA

%Avalia população
avalia_populacao(NewList, NewListAV),

%Organiza nova população gerada
bsort(NewListAV,AvSortedList),

%Guarda os dois melhores
%getBest(AvSortedList),

stop_elite(OldPop,NPop,NPop2), % NPop2 vai ser uma lista com os elementos da populaï¿½ï¿½o antiga e os gerados por mutaï¿½ï¿½o e cruzamentos onde lhes vï¿½o ser atribuido um valor N*X (N sendo um valor random e X o tempo deles)
ordena_elite(NPop2,NPop3),
reverse(NPop3,NPop4), % a lista vai tar ao contrario por isso damos reverse
num_ind(I),
anti_elitist_pop(NPop4,NPop5,I),
retractall(old_pop(_)),
assertz(old_pop(NPop)),
arranja_Populacao(NPop5, NewPopAV),

append(NewPopAV,AvSortedList,NL),
bsort(NL,NFSorted),
getBest(NFSorted),

%avalia_populacao(NNewPopAv,NPopAv),
%acrescentar os 2 melhores do best_ind a lista dps do stop_elitism
%bsort da lista dps da adiÃ§Ã£o
%remove dos 2 piores
%ordena_populacao(NPopAv2,NPopOrd), % ordena a populaï¿½ï¿½o
N1 is N+1,
gera_geracao(N1,G,NewPopAV, NVal).


% Append best elements, sort and remove the worst elements------------

arranja_Populacao(List,NewList):-
    best_ind(L),
    length(L,N),
    avalia_populacao(List,ListAV),
    append(L,ListAV,ListAp),
    bsort(ListAp,ListSAP),
    remove_last_n(ListSAP,N,NewList).

% Remove_last_n(L, N, R) is true if R is the list L with the last N
% elements removed.
remove_last_n(L, N, R) :-
    % find the length of the list
    length(L, Length),
    % subtract N from the length to get the index of the element you want to keep
    Index is Length - N,
    % use the append predicate to reconstruct the list
    append(R, _, L),
    % the first Index elements of L will be unified with R
    length(R, Index).

%Stopping algorithm elitism-------------------------

stop_elite([],[],_):-!.
stop_elite([],[Y|NPop],[Z|DesoPop]):-random(0.0,1,N),Z = Y*N,stop_elite([],NPop,DesoPop).
stop_elite([X|Pop],NPop,[Z|DesoPop]):-random(0.0,1,N),Z = X*N,stop_elite(Pop,NPop,DesoPop).



ordena_elite(PopAv,PopAvOrd):-
%retractall(best_ind(_)),
    bsort2(PopAv,PopAvOrd).


bsort2([X],[X]):-!. %Paragem quando Xs tiver sï¿½ um elemento e esse elemento fica dentro da Nova Ordem.

bsort2([X|Xs],Ys):-
bsort2(Xs,Zs), %Vai correr a recursividade toda, quando volta atras o Zs sï¿½ tem um elemento sendo o X.
btroca2([X|Zs],Ys).% Assumindo que isto ï¿½ a primeira vez que chama este predicado, o Zs comeï¿½a com 2 elementos

btroca2([X],[X]):-!.

btroca2([X*VX,Y*VY|L1],[Y*VY|L2]):-
       VX>VY,!,btroca2([X*VX|L1],L2).

btroca2([X|L1],[X|L2]):-btroca(L1,L2).

anti_elitist_pop(_,_,0).
anti_elitist_pop([X*_|OldPop],[X|AntiPop],N):-N2 is N - 1,anti_elitist_pop(OldPop,AntiPop,N2).


%-------------------------------

%Include the last gen best Ind
switch_for_the_best([_|NPopAv],NPopAv2):-
    best_ind(Ind),
    NPopAv2 = [Ind|NPopAv]. %adiciona o melhor da geracao anterior

gerar_pontos_cruzamento(P1,P2):- gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
num_orders(N),
NTemp is N+1,
random(1,NTemp,P11), % gerar aleatoriamente os pontos de cruzamento
random(1,NTemp,P21),
P11\==P21,!, % Os pontos nï¿½o podem ser iguais
((P11<P21,!,P1=P11,P2=P21);P1=P21,P2=P11). % se P21>P11 entï¿½o o P1 terï¿½ o valor de P21
gerar_pontos_cruzamento1(P1,P2):- %Se os pontos forem iguais irï¿½ ser tentado de novo.
gerar_pontos_cruzamento1(P1,P2).


cruzamento([ ],[ ]).

cruzamento([Ind*_],[Ind]).

cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
gerar_pontos_cruzamento(P1,P2),
Pcruz = 50, %predefenido pelo user neste exemplo
random(0.0,1.0,Pc),
((Pc =< Pcruz,!,
cruzar(Ind1,Ind2,P1,P2,NInd1), % Chama-se 2x este predicado, cruzamento P1 com P2, e P2 com P1.
cruzar(Ind2,Ind1,P1,P2,NInd2))
;
(NInd1=Ind1,NInd2=Ind2)),
cruzamento(Resto,Resto1).


%Predicados auxiliares para fazer o cruzamento order crossover, que ï¿½ o adequado para o
%sequenciamento de tarefas

preencheh([ ],[ ]).
preencheh([_|R1],[h|R2]):- preencheh(R1,R2). %Vai preencher o resto do novo individuo com Hs.

sublista(L1,I1,I2,L):-I1 < I2,!,
sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!, preencheh(R1,H). %quando os 2 pontos sï¿½o igual a 1.

sublista1([X|R1],1,N2,[X|R2]):-!,N3 is N2 - 1, % se o P1 = 1, decrementa-se P2 e adiciona-se elementos do Ind ao novo Ind.
sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-N3 is N1 - 1, %vai-se decrementando os Pontos -1, e vai-se adicionando Hs ao novo Individuo.
N4 is N2 - 1,
sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):- num_orders(N),
T is N - K,
rr(T,L,L1).
rr(0,L,L):-!.
rr(N,[X|R],R2):- N1 is N - 1,
append(R,[X],R1),
rr(N1,R1,R2).

elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):- not(member(X,L)),!,
elimina(R1,L,R2).

elimina([_|R1],L,R2):-
elimina(R1,L,R2).

insere([],L,_,L):-!.

insere([X|R],L,N,L2):-
num_orders(T),
((N>T,!,N1 is N mod T);N1 = N),
insere1(X,N1,L,L1),
N2 is N + 1,
insere(R,L1,N2,L2).

insere1(X,1,L,[X|L]):-!.

insere1(X,N,[Y|L],[Y|L1]):-
N1 is N-1,
insere1(X,N1,L,L1).



% 2 individuos, os seus 2 pontos de corte.
cruzar(Ind1,Ind2,P1,P2,NInd11):-
sublista(Ind1,P1,P2,Sub1), %Sub1 serï¿½ o Ind com os elementos entre o intervalo de pontos e resto terï¿½ Hs.Exe Sub1: HHH1234HH
num_orders(NumT), % Buscar o nr de tarefas
R is NumT-P2, % R = Numero de Tarefas - o Ponto 2.
rotate_right(Ind2,R,Ind21), % vai rodar para a direita R vezes. Exe se R=2 entï¿½o e Ind2=123456789 entï¿½o Ind21=891234567
elimina(Ind21,Sub1,Sub2), % Elimina os elementos que Sub1 jï¿½ tem ou seja, Sub2=89XXXX567
P3 is P2 + 1,
insere(Sub2,Sub1,P3,NInd1), %vai inserir no Sub1 os elementos do Sub2 formando o NInd1
eliminah(NInd1,NInd11). % Elimina Hs que estejam a mais no NInd1

eliminah([],[]).

eliminah([h|R1],R2):-!,
eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
eliminah(R1,R2).


% A mutaï¿½ï¿½o ï¿½ tentada sobre cada indivï¿½duo da populaï¿½ï¿½oPara saber se se
% realiza a mutaï¿½ï¿½o gera-se um nï¿½ aleatï¿½rio entre 0 e 1 e compara-se com
% a probabilidade de mutaï¿½ï¿½o parametrizada, se for inferior faz-se a
% mutaï¿½ï¿½o

mutacao([],[]).

mutacao([Ind|Rest],[NInd|Rest1]):-
Pmut = 50,
random(0.0,1.0,Pm),
((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind), %se Pm < Pmut a mutaï¿½ï¿½o do individuo acontece (mutacao1)
mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
gerar_pontos_cruzamento(P1,P2), %gera os pontos de cruzamento
mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):- % se P1 for 1 continua-se a decrementar 1 em P2 e chama-se mutacao23
!, P21 is P2-1,
mutacao23(G1,P21,Ind,G2,NInd).

mutacao22([G|Ind],P1,P2,[G|NInd]):- %Se P1 nem P2 forem 1 decrementa-se 1 e chama-se o predicado mutacao22 de novo.
P11 is P1-1, P21 is P2-1,
mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!. % quando P for 1, o primeiro elemento que Ind tiver serï¿½ o que vai ser adicionado ao NInd

mutacao23(G1,P,[G|Ind],G2,[G|NInd]):- %vai apercorrer o Ind, P vezes.
P1 is P-1,
mutacao23(G1,P1,Ind,G2,NInd).

%----------------------------------------------------------

% Gets all the trucks.
% getAllCamioes/1 (<Truck list>)
getAllCamioes(R) :- findall(NomeCamiao, carateristicasCam(NomeCamiao,_,_,_,_,_), R).

% Assigns the orders to the trucks and returns the biggest time
% atribui/0
atribuiEntregas() :- gera2(Entregas),
                     getAllCamioes(Camioes),
                     length(Entregas, NE),
                     length(Camioes, NC),
                     T is round(NE/NC - 0.1),
                     Diff is NE - NC,
                    ((Diff < 0, !, maisCamioes(Camioes, Entregas, Atribuicoes));(maisEntregas(Entregas, Camioes, Atribuicoes, NE, T))),
                     write('\nAtribuicoes: '), write(Atribuicoes),
                     maiorTempo(Atribuicoes, MaiorTempo),
                     write('\nMaior tempo: '), write(MaiorTempo).

% Case where there are more orders than trucks
% maisEntregas/5 (<Orders>, <Trucks>, <Assignments (and time)>, <Number
% of orders>, <Number of orders for each truck>
maisEntregas(_,_,[],0,_).

% When there is only 1 truck left
maisEntregas(Entregas, [X], [L1*X*Tempo2|Atr], NE, T) :- tiraEntregas(Entregas, L1, L2, NE),
                                                         NE2 is 0,
                                                         maisEntregas(L2, [], Atr, NE2, T),
                                                         getArmazensByEntregas(L1,Armazens),
                                                         append([5|Armazens],[5], Armazens2),
                                                         checkBattery(Armazens2,X,_,Tempo),
                                                         truncate(Tempo,0,Tempo2).

maisEntregas(Entregas, [X|Camioes], [L1*X*Tempo2|Atr], NE, T) :- ((NE < T, !, tiraEntregas(Entregas, L1, L2, NE), NE2 is 0);
                                                                  (tiraEntregas(Entregas, L1, L2, T), NE2 is NE - T)),
                                                                   maisEntregas(L2, Camioes, Atr, NE2, T),
                                                                   getArmazensByEntregas(L1, Armazens),
                                                                   append([5|Armazens],[5], Armazens2),
                                                                   checkBattery(Armazens2, X, _, Tempo),
                                                                   truncate(Tempo, 0, Tempo2).

% Updates the orders value and list.
% tiraEntregas/4 (<All orders list>, <List of the orders assigned to
% the truck>, <Remaining orders list>)
tiraEntregas(Entregas, [], L2, 0) :- resto(Entregas, L2).
tiraEntregas([Ent|Entregas], [Ent|L1], L2, T) :- T2 is T - 1,
                                                 tiraEntregas(Entregas, L1, L2, T2).

% Gets the rest of the orders.
% resto/2 (<All orders>, <Remaining orders list>)
resto([],[]).
resto([X|Entregas], [X|L2]):- resto(Entregas, L2).

% Case where there are more trucks than orders.
% maisCamioes/3 (<Trucks>, <Orders>, <Assignments (and time)>).
maisCamioes(_,[],[]).
maisCamioes([X|Camioes], [Y|Entregas], [X*Y*Tempo2|Atribuicoes]) :- maisCamioes(Camioes, Entregas, Atribuicoes),
                                                                    getArmazensByEntregas(Y, Armazens),
                                                                    append([5|Armazens],[5], Armazens2),
                                                                    % predicate from previous sprint that returns the travel time
                                                                    checkBattery(Armazens2, X, _, Tempo),                                                                                                                 truncate(Tempo, 0, Tempo2).

% Gets the warehouse list associated with a orders list.
% getArmazensByEntregas/2 (<Orders>, <Warehouses>)
getArmazensByEntregas([],[]) :- !.

% When there is only 1 order
getArmazensByEntregas(Entrega,[Armazem]) :- entrega(Entrega,_,_,Armazem,_,_).

% When there's a list of orders
getArmazensByEntregas([Entrega|T],[Armazem|T1]) :- getArmazensByEntregas(T, T2),
                                                   entrega(Entrega,_,_,Armazem,_,_),
                                                   T1 = T2.

% Predicate used to format time values.
truncate(X,N,Result) :- X >= 0, Result is floor(10^N*X)/10^N, !.

% Gets the biggest time.
% maiorTempo/2 (<Assignments (and time)>, <Biggest time>)
maiorTempo([],0) :- !.
maiorTempo([_*_*Tempo|T1], Maior) :- maiorTempo(T1, Maior2),
                                     ((Tempo > Maior2, Maior is Tempo);(Maior is Maior2)),!.

%-------------------------BEST PATH-------------------------

% Find all paths in our DB.
% getAllPaths/3 (<L - List with all the warehouses that we want to
% permutate>, <LLP - Result of the findAll>, <R - Final Result with the
% Matosinhos warehouse at the beggining and at the end>).

getAllPaths(L,R) :- findall(LP,permutation(L,LP),LLP),
                    addMatosinhos(LLP,R).

% Adds the Matosinhos warehouse to all paths, assuring that they
% all start in the warehouse number "5" (Matosinhos) and end in it
% aswell.
% addMatosinhos/2 (<[H|T] - The paths list without the Matosinhos
% warehouse>, <[H1|T1] - The result list after adding the Matosinhos
% warehouse>).

addMatosinhos([],[]).
addMatosinhos([H|T],[H2|T1]) :- append([5],H,HR),
                                append(HR,[5],H2),
                                addMatosinhos(T,T1).

% Gets the smallest time (fastest path).
% smallestTime/5 (<[H|T] - path>, <Tr - truck>, <MEP - most efficient
% path>, <SP - stopping points (warehouses)>, <M - time of the most
% efficient path (minutes)>).

smallest(L,Tr,MEP,SP,M) :-
    checkBattery(L,Tr,SP3,Time),
    SP = SP3,
    M is Time,
    MEP = L.

% Gets the best path (fastest).
% bestPath/5 (<L - path>, <Tr - truck>, <MEP - most
% efficient path>, <WP - stopping points (warehouses)>, <T - time
% (minutes)>).

bestPath(L,Tr,MEP,SP,T) :-
                         smallest(L,Tr,MEP,SP,T).

% Gets the initial weight of a truck (with all the orders weight).
% sumWeight/3 (<[H|T] - path>, <Tr - truck>, <IW - initial weight
% (tare)>).

sumWeight([],Tr,IW) :- carateristicasCam(Tr,IW,_,_,_,_).
sumWeight([H|T],Tr,IW) :-
                          entrega(_,_,Mass,H,_,_),
                          sumWeight(T,Tr,IW2),
                          IW is (IW2 + Mass).

% Gets the truck's max weight.
% truckTotalWeight/2 (<Tr - truck>, <W - truck's max weight>).

truckMaxWeight(Tr,MW) :- carateristicasCam(Tr,Tare,LoadCapacity,_,_,_),
                         MW is (Tare + LoadCapacity).

% Checks the truck's battery.
% checkBattery/4 (<P - path>, <Tr - truck>, <SP - stopping points>,
% <T - time of travel>).

checkBattery(P,Tr,SP,T) :- sumWeight(P,Tr,CurrentWeight),
                           carateristicasCam(Tr,_,_,InitialEnergy,_,_),
                           Energy is (InitialEnergy * 0.8),
                           checkBattery2(P,Tr,CurrentWeight,Energy,SP,T).

% Checks if the truck has enough battery to travel to the next
% warehouse.
% checkBattery2/6 (<[H,H2|T] - path>, <Tr - truck>, <CW -
% current weight>, <CE - current energy>, <SP - stopping points>, <FT -
% final time>).

checkBattery2([_],_,_,_,[],0) :- !.
checkBattery2([H,H2|T],Tr,CW,CE,SP,FT) :- truckMaxWeight(Tr,MaxWeight),
                                          dadosCam_t_e_ta(Tr,H,H2,TravelTime,Energy,AdditionalTime),
                                          ruleOfThree(MaxWeight,Energy,CW,EnergyRequired),
                                          ruleOfThree(MaxWeight,TravelTime,CW,TravelTimeRequired),
                                          carateristicasCam(Tr,_,_,InitialEnergy,_,_),
                                          ((H2 = 5, !, CE2 is (CE + (InitialEnergy * 0.2)));(CE2 is CE)),
                                            EnergyDiff is (CE2 - EnergyRequired),
                                          ((EnergyDiff > 0,!,
                                            dontCharge([H,H2|T],Tr,CW,CE2,EnergyRequired,SP,TravelTimeRequired,FT));
                                           (charge([H,H2|T],Tr,CW,CE2,EnergyRequired,SP,TravelTimeRequired,FT,AdditionalTime))).

% If the truck needs to charge.
% charge/9 (<[H,H2|T] - path>, <Tr - truck>, <CW - current weight>,
% <CE - current energy>, <ER - energy required>, <SP - stopping points>,
% <TT - time of travel>, <CT - current time>, <AT - additional time>).

charge([H,H2|T],Tr,CW,CE,ER,SP,TT,CT,AT) :- biggestTime(H,Tr,CE,BiggestTime),
                                            CT2 is (TT + BiggestTime),
                                            carateristicasCam(Tr,_,_,InitialEnergy,_,_),
                                            CE2 is ((InitialEnergy * 0.6) - ER),
                                            ((CE2 < 0, !,
                                              CT3 is CT2 + AT, CE3 is 0);
                                             (CT3 is CT2, CE3 is CE2)),
                                              entrega(_,_,OrderWeight,H2,_,_),
                                              CW2 is (CW - OrderWeight),
                                              checkBattery2([H2|T],Tr,CW2,CE3,SP2,CT4),
                                              SP = [H|SP2],
                                              CT is (CT3 + CT4).

% If the truck doesn't need to charge.
% dontCharge/8 (<[_,H2|T] - path>, <Tr - truck>, <CW - current weight>,
% <CE - current energy>, <ER - energy required>, <SP - stopping points>,
% <TT - time of travel>, <CT - current time>).

dontCharge([H,H2|T],Tr,CW,CE,ER,SP,TT,CT) :- entrega(_,_,_,H,_,UnloadTime),
                                             entrega(_,_,OrderWeight,H2,_,_),
                                             CT2 is (TT + UnloadTime),
                                             CE2 is (CE - ER),
                                             CW2 is (CW - OrderWeight),
                                             checkBattery2([H2|T],Tr,CW2,CE2,SP,CT3),
                                             CT is (CT2 + CT3).

% Compares the charging time and the unloading time and returns the
% biggest. compareTime/4 (<Wh - warehouse>, <Tr - truck>, <CE - current
% energy>, <BT - biggest time>).

biggestTime(Wh,Tr,CE,BT) :- getChargingTime(Tr,CE,ChargeTime),
                            entrega(_,_,_,Wh,_,UnloadTime),
                            ((ChargeTime < UnloadTime,!,BT is UnloadTime);(BT is ChargeTime)).

% Gets the truck's charging time (in minutes).
% chargeTruck/3 (<Tr - truck>, <CE - current energy>, <CT - charging
% time>).

getChargingTime(Tr,CE,CT) :- carateristicasCam(Tr,_,_,FullCharge,_,RechargeTime),
                             ruleOfThree((FullCharge * 0.6),60,CE,R),
                             ruleOfThree(60,RechargeTime,(60 - R),CT).

getChargingTime(CE,CT) :- cam(Tr,_),
                          carateristicasCam(Tr,_,_,FullCharge,_,RechargeTime),
                          ruleOfThree((FullCharge * 0.6),60,CE,R),
                          ruleOfThree(60,RechargeTime,(60 - R),CT).


% Calculates the rule of three (regra de trï¿½s simples).
% ruleOfThree/4 (<A - first term>, <B - second term>, <C - third term>,
% <X - result>).

ruleOfThree(X,Y,Z,R) :- R is ((Z * Y) / X).
