:-include('warehousesBD.pl').
:-include('truckBD.pl').

% Find all paths in our DB.
% getAllPaths/3 (<L - List with all the warehouses that we want to
% permutate>, <LLP - Result of the findAll>, <R - Final Result with the
% Matosinhos warehouse at the beggining and at the end>).

getAllPaths(L,LLP,R) :- findall(LP,permutation(L,LP),LLP),
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
sumTime([O,D|C],R) :- dadosCam_t_e_ta(_,O,D,T,_,_),
                      sumTime([D|C],R1),
                      R is R1 + T.

% Gets the smallest time.
% smallestTime/3 (<[L|C] - paths list>, R - <most efficient path>, <M -
% time of the most efficient path>).

smallestTime([L],L,T) :- sumTime(L,T),!.
smallestTime([H|T],R,M) :- sumTime(H,F),
                           smallestTime(T,R1,M1),
                           ((F < M1,!,R = H, M is F);
                           (F > M1,!,R = R1, M is M1);
                           (R = [H,R1], M is F)).
