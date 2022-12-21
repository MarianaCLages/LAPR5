:-dynamic entrega_armazens/1.
:-dynamic entregas/1.
:-dynamic cam/2.
:-dynamic less_time/1.
:-dynamic less_ind/1.


:-dynamic tempo/1.
:-dynamic massa/1.
:-dynamic massatempo/1.
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
%tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao).

%HEURISTICA A DEVOLVER AS ENTREGAS

bfsAG_tempo_entrega(Cam,T,OrdList):-
    retractall(tempo(_)),
    retractall(current_order(_)),
    assertz(tempo(10000)),
    assertz(current_order(5555)),
    entrega_armazens(Ent),
    delete(Ent,5,Ent2),
    bfs2AG_tempo_entrega(Ent2,[5],Cam,T,[],OrdList).

bfs2AG_tempo_entrega([],[Final|LA],Cam,T,TempList,OrdList):-
    !,reverse([5,Final|LA],Cam),
    reverse(TempList,OrdList),
    dadosCam_t_e_ta(_,Final,5,T,_,_).

bfs2AG_tempo_entrega(Ent,[Act|LA],Cam,T,TempList,OrdList):-
    findall([X|LA],
            (   dadosCam_t_e_ta(_,Act,X,_,_,_),member(X,Ent)),Novos),
    tempoAG_act_x13(Act,Novos,P),
    delete(Ent,P,Ent2),
    tempo(TempoMin),
    current_order(Order),
    appendAG_inicio14(P,[Act|LA],Todos),
    TempList2 = [Order|TempList],
    bfs2AG_tempo_entrega(Ent2,Todos,Cam,T2,TempList2,OrdList),
    T is TempoMin+T2.

appendAG_inicio14(P,L,[P|L]).

tempoAG_act_x13(_,[],0):-retract(tempo(_)),assertz(tempo(10000)).
tempoAG_act_x13(Act,[[A|_]|Novos],X):-
    tempoAG_act_x13(Act,Novos,X2),
    dadosCam_t_e_ta(_,Act,A,T,E,_),
    entrega(Order,_,_,A,COLO,_),
    tempo(TempoMin),
    cam(TR,CE),
    ED is CE - E,
    (   (ED > 0,!,T2 is T + COLO , CE2 is CE);(getChargingTime(CE,CT),T2 is T + CT + COLO , CE2 is 100)  ),
    (   (TempoMin>T2,!,retract(cam(_,_)),assertz(cam(TR,CE2)),retract(current_order(_)),assertz(current_order(Order)),retract(tempo(_)),assertz(tempo(T2)),X=A);X=X2).



bfsAG_massa(Cam,OrdList):-
    retractall(massa(_)),
    retractall(current_order(_)),
    assertz(massa(0)),
    assertz(current_order(5555)),
    entrega_armazens(Ent),
    delete(Ent,5,Ent2),
    bfsAG_massa2(Ent2,[5],Cam,[],OrdList).

bfsAG_massa2([],LA,Cam,TempList,OrdList):-
    !,reverse([5|LA],Cam),reverse(TempList,OrdList).

bfsAG_massa2(Ent,[Act|LA],Cam,TempList,OrdList):-
    findall([X|LA],
            (dadosCam_t_e_ta(_,Act,X,_,_,_),member(X,Ent)),Novos),
    massaAG_act(Act,Novos,P),
    delete(Ent,P,Ent2),
    current_order(Order),
    appendAG_inicio3(P,[Act|LA],Todos),
    TempList2 = [Order|TempList],
    bfsAG_massa2(Ent2,Todos,Cam,TempList2,OrdList).

appendAG_inicio3(P,L,[P|L]).

massaAG_act(_,[],0):-retract(massa(_)),assertz(massa(0)).
massaAG_act(Act,[[A|_]|Novos],X):-
    massaAG_act(Act,Novos,X2),
    entrega(Order,_,M,A,_,_),
    massa(Massa),
    (   (Massa<M,!,retract(massa(_)),assertz(massa(M)),retract(current_order(_)),assertz(current_order(Order)),X=A);X=X2).


bfsAG_massa_tempo(Cam,OrdList):-
    retractall(massa(_)),
    retractall(current_order(_)),
    assertz(massatempo(0)),
    assertz(current_order(5555)),
    entrega_armazens(Ent),
    delete(Ent,5,Ent2),
    bfsAG_massa_tempo2(Ent2,[5],Cam,[],OrdList).

bfsAG_massa_tempo2([],LA,Cam,TempList,OrdList):-
    !,reverse([5|LA],Cam),reverse(TempList,OrdList).

bfsAG_massa_tempo2(Ent,[Act|LA],Cam,TempList,OrdList):-
    findall([X|LA],(dadosCam_t_e_ta(_,Act,X,_,_,_),member(X,Ent)),Novos),
    massaAG_tempo_act(Act,Novos,P),
    delete(Ent,P,Ent2),
    current_order(Order),
    appendAG_inicio4(P,[Act|LA],Todos),
    TempList2 = [Order|TempList],
    bfsAG_massa_tempo2(Ent2,Todos,Cam,TempList2,OrdList).

appendAG_inicio4(P,L,[P|L]).

massaAG_tempo_act(_,[],0):-retract(massatempo(_)),assertz(massatempo(0)).
massaAG_tempo_act(Act,[[A|_]|Novos],X):-
    massaAG_tempo_act(Act,Novos,X2),
    entrega(Order,_,M,A,_,RET),
    dadosCam_t_e_ta(_,Act,A,T,E,_),
    massatempo(MassaTempo),
    cam(TR,CE),
    ED is CE - E,
    (   (ED > 0,!,T2 is T + RET,CE2 is CE);(getChargingTime(CE,CT),T2 is T + CT + RET,CE2 is CE)  ),
    D = M / T2,
    (   (MassaTempo< D,!,retract(cam(_,_)),assertz(cam(TR,CE2)),retract(massatempo(_)),assertz(massatempo(D)),retract(current_order(_)),assertz(current_order(Order)),X=A);X=X2).



%-------------------------------AG------------------------%

gera:-
    %retract(num_ind(_)),
    assertz(num_ind(6)),
    Temp = 9999,
    Less = [1,2,3],
    BestInd = [2,3,1]*1000,
    retractall(less_time(_)),
    retractall(less_ind(_)),
    assertz(best_ind(BestInd)),
    assertz(less_time(Temp)),
    assertz(less_ind(Less)),
    bfsAG_tempo_entrega(_,_,OrdList),
    bfsAG_massa(_,OrdList2),
    bfsAG_massa_tempo(_,OrdList3),
    %OrdList4 = [OrdList,OrdList2,OrdList3],
    %write('\n\nORDER LIST4:  '),write(OrdList4),
    count_seq_orders(OrdList,Count),
    assertz(num_orders(Count)),
    %gera_populacao(OrdList,Pop),
    gera_first_populacao(OrdList,Pop2),
    append(Pop2,[OrdList],Pop3),
    append(Pop3,[OrdList2],Pop4),
    append(Pop4,[OrdList3],Pop5),
    retractall(old_pop(_)),
    assertz(old_pop(Pop5)),
    avalia_populacao(Pop5,PopAv),
    ordena_populacao(PopAv,PopOrd),
    NG is 6,
    gera_geracao(0,NG,PopOrd),
    less_ind(Ind),
    formatList(Ind).

formatList([A]):-format(A).
formatList([X|L]):-format(X),format(','),formatList(L).

count_seq_orders([],0).
count_seq_orders([_|Cam],Count):- count_seq_orders(Cam,Count2), Count is Count2 + 1.



% Gera Popula��o

gera_first_populacao(Cam,Pop):-
    num_orders(NumT),
    TamPop = 6 -3,
    gera_populacao(TamPop,Cam,NumT,Pop).

gera_populacao(Cam,Pop):-
    num_orders(NumT),
    TamPop is 6,
    gera_populacao(TamPop,Cam,NumT,Pop),retractall(old_pop(_)),assertz(old_pop(Pop)).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
TamPop1 is TamPop-1,
gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
gera_individuo(ListaTarefas,NumT,Ind), %o Ind est� vazio e vai ser atribuido uma sequencia da Lista de Tarefas
not(member(Ind,Resto)). % n�o pode ser repetido...por isso se tal acontecer repete-se a opera��o

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


%AVALIA POPULA��O
%
% avalia a popula��o fornecida no gera popula��o, vai buscar cada
% invidividuo nela e converte no formato individuo*avaliacao, sendo a
% avalia��o a soma do atraso
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
    bestPath(Arm3,'T01',_,_,T2),
    T is T2,
    less_time(X),
    (   (T2 < X,!,retract(less_time(_)),assertz(less_time(T)),retract(less_ind(_)),assertz(less_ind(Ind)));!).

get_cam_arm([],_).
get_cam_arm([X|L],[Y|L2]):-entrega(X,_,_,Y,_,_),get_cam_arm(L,L2).




ordena_populacao(PopAv,PopAvOrd):-
%retractall(best_ind(_)),
    bsort(PopAv,PopAvOrd),
    getBest(PopAvOrd).


getBest([X|_]):-retractall(best_ind(_)),assertz(best_ind(X)).

bsort([X],[X]):-!. %Paragem quando Xs tiver s� um elemento e esse elemento fica dentro da Nova Ordem.

bsort([X|Xs],Ys):-
bsort(Xs,Zs), %Vai correr a recursividade toda, quando volta atr�s o Zs s� tem um elemento sendo o X.
btroca([X|Zs],Ys).% Assumindo que isto � a primeira vez que chama este predicado, o Zs come�a com 2 elementos

btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
       VX>VY,!,btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


%Gera Gera��o
%
% � aqui que s�o criadas as novas gera��es da popula��o ap�s os
% cruzamentos, muta��es e avalia��o dos novos indiv�duos de cada
% popula��o

% o primeiro parametro � o inicio da gera��o, o segundo � a ultima
% gera��o e a PopOrd � a popula��o criada e ordenada.
%

% A Paragem acontece obviamente quando o atual nr da gera��o � igual �
% gera��o final.
gera_geracao(G,G,_):-!,nl.

gera_geracao(N,G,Pop):-
random_permutation(Pop,Pop2),
cruzamento(Pop2,NPop1), %Pop � a lista que temos Npop1 � a nova lista que ser� feita com o cruzamento.
mutacao(NPop1,NPop), % Com a nova gera��o (NPop1) faz-se a muta��o dela.
old_pop(OldPop),
stop_elite(OldPop,NPop,NPop2), %TRABALHA AQUI TIAGO
ordena_elite(NPop2,NPop3),
reverse(NPop3,NPop4),
num_ind(I),
anti_elitist_pop(NPop4,NPop5,I),
retractall(old_pop(_)),
assertz(old_pop(NPop)),
avalia_populacao(NPop5,NPopAv),
switch_for_the_best(NPopAv,NPopAv2),
ordena_populacao(NPopAv2,NPopOrd),
N1 is N+1,
gera_geracao(N1,G,NPopOrd).

%Stopping algorithm elitism-------------------------

stop_elite([],[],_):-!.
stop_elite([],[Y|NPop],[Z|DesoPop]):-random(0.0,1,N),Z = Y*N,stop_elite([],NPop,DesoPop).
stop_elite([X|Pop],NPop,[Z|DesoPop]):-random(0.0,1,N),Z = X*N,stop_elite(Pop,NPop,DesoPop).



ordena_elite(PopAv,PopAvOrd):-
%retractall(best_ind(_)),
    bsort2(PopAv,PopAvOrd).


bsort2([X],[X]):-!. %Paragem quando Xs tiver s� um elemento e esse elemento fica dentro da Nova Ordem.

bsort2([X|Xs],Ys):-
bsort2(Xs,Zs), %Vai correr a recursividade toda, quando volta atr�s o Zs s� tem um elemento sendo o X.
btroca2([X|Zs],Ys).% Assumindo que isto � a primeira vez que chama este predicado, o Zs come�a com 2 elementos

btroca2([X],[X]):-!.

btroca2([X*VX,Y*VY|L1],[Y*VY|L2]):-
       VX>VY,!,btroca2([X*VX|L1],L2).

btroca2([X|L1],[X|L2]):-btroca(L1,L2).

anti_elitist_pop(_,_,0).
anti_elitist_pop([X*_|OldPop],[X|AntiPop],N):-N2 is N - 1,anti_elitist_pop(OldPop,AntiPop,N2).


%-------------------------------

%Include the last gen best Ind
switch_for_the_best([_|NPopAv],NPopAv2):-best_ind(Ind), NPopAv2 = [Ind|NPopAv].

gerar_pontos_cruzamento(P1,P2):- gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
num_orders(N),
NTemp is N+1,
random(1,NTemp,P11), % gerar aleatoriamente os pontos de cruzamento
random(1,NTemp,P21),
P11\==P21,!, % Os pontos n�o podem ser iguais
((P11<P21,!,P1=P11,P2=P21);P1=P21,P2=P11). % se P21>P11 ent�o o P1 ter� o valor de P21
gerar_pontos_cruzamento1(P1,P2):- %Se os pontos forem iguais ir� ser tentado de novo.
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


%Predicados auxiliares para fazer o cruzamento order crossover, que � o adequado para o
%sequenciamento de tarefas

preencheh([ ],[ ]).
preencheh([_|R1],[h|R2]):- preencheh(R1,R2). %Vai preencher o resto do novo individuo com Hs.

sublista(L1,I1,I2,L):-I1 < I2,!,
sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!, preencheh(R1,H). %quando os 2 pontos s�o igual a 1.

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
sublista(Ind1,P1,P2,Sub1), %Sub1 ser� o Ind com os elementos entre o intervalo de pontos e resto ter� Hs.Exe Sub1: HHH1234HH
num_orders(NumT), % Buscar o nr de tarefas
R is NumT-P2, % R = Numero de Tarefas - o Ponto 2.
rotate_right(Ind2,R,Ind21), % vai rodar para a direita R vezes. Exe se R=2 ent�o e Ind2=123456789 ent�o Ind21=891234567
elimina(Ind21,Sub1,Sub2), % Elimina os elementos que Sub1 j� tem ou seja, Sub2=89XXXX567
P3 is P2 + 1,
insere(Sub2,Sub1,P3,NInd1), %vai inserir no Sub1 os elementos do Sub2 formando o NInd1
eliminah(NInd1,NInd11). % Elimina Hs que estejam a mais no NInd1

eliminah([],[]).

eliminah([h|R1],R2):-!,
eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
eliminah(R1,R2).


% A muta��o � tentada sobre cada indiv�duo da popula��oPara saber se se
% realiza a muta��o gera-se um n� aleat�rio entre 0 e 1 e compara-se com
% a probabilidade de muta��o parametrizada, se for inferior faz-se a
% muta��o

mutacao([],[]).

mutacao([Ind|Rest],[NInd|Rest1]):-
Pmut = 50,
random(0.0,1.0,Pm),
((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind), %se Pm < Pmut a muta��o do individuo acontece (mutacao1)
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

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!. % quando P for 1, o primeiro elemento que Ind tiver ser� o que vai ser adicionado ao NInd

mutacao23(G1,P,[G|Ind],G2,[G|NInd]):- %vai apercorrer o Ind, P vezes.
P1 is P-1,
mutacao23(G1,P1,Ind,G2,NInd).



%-------------------------BEST PATH-------------------------

% Find all paths in our DB.
% getAllPaths/3 (<L - List with all the warehouses that we want to
% permutate>, <LLP - Result of the findAll>, <R - Final Result with the
% Matosinhos warehouse at the beggining and at the end>).

getAllPaths(L,R) :- findall(LP,permutation(L,LP),LLP),
                    addMatosinhos(LLP,R),
                    write('\n\nTESTE MATOSAS:').

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
                                          ruleAGOfThree(MaxWeight,Energy,CW,EnergyRequired),
                                          ruleAGOfThree(MaxWeight,TravelTime,CW,TravelTimeRequired),
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

biggestTime(Wh,Tr,CE,BT) :- getAGChargingTime(Tr,CE,ChargeTime),
                            entrega(_,_,_,Wh,_,UnloadTime),
                            ((ChargeTime < UnloadTime,!,BT is UnloadTime);(BT is ChargeTime)).

% Gets the truck's charging time (in minutes).
% chargeTruck/3 (<Tr - truck>, <CE - current energy>, <CT - charging
% time>).

getAGChargingTime(Tr,CE,CT) :- carateristicasCam(Tr,_,_,FullCharge,_,RechargeTime),
                             ruleAGOfThree((FullCharge * 0.6),60,CE,R),
                             ruleAGOfThree(60,RechargeTime,(60 - R),CT).

getAGChargingTime(CE,CT) :- cam(Tr,_),
                          carateristicasCam(Tr,_,_,FullCharge,_,RechargeTime),
                          ruleAGOfThree((FullCharge * 0.6),60,CE,R),
                          ruleAGOfThree(60,RechargeTime,(60 - R),CT).


% Calculates the rule of three (regra de tr�s simples).
% ruleOfThree/4 (<A - first term>, <B - second term>, <C - third term>,
% <X - result>).

ruleAGOfThree(X,Y,Z,R) :- R is ((Z * Y) / X).
