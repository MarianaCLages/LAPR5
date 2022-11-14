:-include('warehousesBD.pl').
:-include('truckBD.pl').

% Find all paths in our BD
% getAllPaths/3 (<L - List with all the warehouses that we want to
% permutate>, <LLP - Result of the findAll>, <R - Final Result with the
% Matosinhos warehouse at the beggining and at the end>).

getAllPaths(L,LLP,R):-findall(LP,permutation(L,LP),LLP),
                      fix(LLP,R).

% Adds the Matosinhos warehouse to all paths, assuring that they
% all start in the warehouse number "5" (Matosinhos) and end in it
% aswell.
% addMatosinhos/2 (<[H|T] - The paths list without the Matosinhos
% warehouse>, <[H1|T1] - The result list after adding the Matosinhos
% warehouse>).

addMatosinhos([],[]).
addMatosinhos([H|T],[H1|T1]):-append(H,[5],HR),
                              append([5],HR,H1),
                              addMatosinhos(T,T1).



