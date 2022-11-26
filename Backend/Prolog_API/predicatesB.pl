:-include('warehousesBD.pl').
:-include('truckBD.pl').
:-include('orderDB.pl').

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
addMatosinhos([H|T],[H1|T1]) :- append(H,[5],HR),
                                append([5],HR,H1),
                                addMatosinhos(T,T1).


% Sums the total time for each path.
% sumTime/2 (<[O,D|C] - path list>, <R - path's time>).

sumTime([_],0) :- !.
sumTime([H,H2|T],R) :- dadosCam_t_e_ta(_,H,H2,T,_,_),
                       sumTime([H2|T],R1),
                       R is R1 + T.

% Gets the smallest time (fastest path).
% smallestTime/5 (<[H|T] - path>, <Tr - truck>, <R - most efficient
% path>, <M - time of the most efficient path>).

smallest([],_,[],[],99999) :- !.
smallest([H|T],Tr,R,P,M) :- checkBattery(H,Tr,P2,F),
                            smallest(T,Tr,R1,P1,M1),
                            ((F =< M1, !, M is F, R = H, P = P2);
                            (F > M1, !, R = R1, M is M1, P = P1)).

% Gets the best path (fastest).
% bestPath/5 (<L - path>, <Tr - truck>, <MEP - most
% efficient path>, <WP - stopping points (warehouses)>, <T - time>).

bestPath(L,Tr,MEP,SP,T) :- getAllPaths(L,R),
                           smallest(R,Tr,MEP,SP,T).

% Sums the total weight of a truck.
% sumWeight/3 (<[H|T] - path>, <Tr - truck>, <IW - initial weight>).

sumWeight([],Tr,IW) :- carateristicasCam(Tr,IW,_,_,_,_).
sumWeight([H|T],Tr,IW) :- entrega(_,_,M,H,_,_),
                          sumWeight(T,Tr,IW2),
                          IW is (IW2 + M).

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
                                          ruleOfThree(MaxWeight,Energy,CW,Energy2),
                                          ruleOfThree(MaxWeight,TravelTime,CW,TravelTime2),
                                          EnergyDiff is (CE - Energy2),
                                          ((EnergyDiff > 0,!,
                                            dontCharge([H,H2|T],Tr,CW,CE,Energy2,SP,TravelTime2,FT));
                                           (charge([H,H2|T],Tr,CW,CE,Energy2,SP,TravelTime2,FT, AdditionalTime))).

% If the truck needs to charge.
% charge/9 (<[H,H2|T] - path>, <Tr - truck>, <CW - current weight>,
% <CE - current energy>, <ER - energy required>, <SP - stopping points>,
% <TT - time of travel>, <CT - current time>, <AT - additional time>).

charge([H,H2|T],Tr,CW,CE,ER,SP,TT,CT, AT) :- biggestTime(H,Tr,CE,BiggestTime),
                                             CT2 is (TT + BiggestTime),
                                             carateristicasCam(Tr,_,_,InitialEnergy,_,_),
                                             CE2 is ((InitialEnergy * 0.6) - ER),
                                             ((CE2 < 0, !,
                                               CT3 is CT2 + AT, CE3 is (CE2 + (InitialEnergy * 0.2)));
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

dontCharge([_,H2|T],Tr,CW,CE,ER,SP,TT,CT) :- entrega(_,_,OrderWeight,H2,_,UnloadTime),
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

% Gets the truck's charging time.
% chargeTruck/3 (<Tr - truck>, <CE - current energy>, <CT - charging
% time>).

getChargingTime(Tr,CE,CT) :- carateristicasCam(Tr,_,_,FullCharge,_,RechargeTime),
                             ruleOfThree(FullCharge,CE,100,R),
                             ruleOfThree(60,RechargeTime,(80 - R),CT).

% Calculates the rule of three (regra de três simples).
% ruleOfThree/4 (<A - first term>, <B - second term>, <C - third term>,
% <X - result>).

ruleOfThree(X,Y,Z,R) :- R is ((Z * Y) / X).
