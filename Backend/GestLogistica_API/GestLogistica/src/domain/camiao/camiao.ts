import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Tara} from "./tara";
import {CapacidadeCarga} from "./capacidadeCarga";
import {CargaMaxima} from "./cargaMaxima";
import {TempoCarregamento} from "./tempoCarregamento"
import { Guard } from "../../core/logic/Guard";
import { ICriarCamiaoDTO } from "../../dto/camiao/ICriarCamiaoDTO";
import { CargaTotal } from "./cargaTotal";
import { CaractCamiao } from "./caractCamiao";
import { MatriculaCamiao } from "./matriculaCamiao";

interface CamiaoProps {
    caractCamiao: CaractCamiao;
    matriculaCamiao: MatriculaCamiao;
    tara: Tara;
    capacidadeCarga: CapacidadeCarga;
    cargaTotal: CargaTotal;
    cargaMax: CargaMaxima;
    tempoCarregamento: TempoCarregamento;
}

export class Camiao extends AggregateRoot<CamiaoProps> {

    get id (): UniqueEntityID {
        return this._id;
    }

    get caractCamiao (): CaractCamiao {
        return this.caractCamiao;
    }

    get matriculaCamiao(): MatriculaCamiao{
        return this.matriculaCamiao;
    }

    set matriculaCamiao(value: MatriculaCamiao){
        this.matriculaCamiao = value;
    }

    get tara (): Tara {
        return this.tara;
    }

    set tara(value: Tara){
        this.tara = value;
    }

    get capacidadeCarga (): CapacidadeCarga {
        return this.capacidadeCarga;
    }

    set capacidadeCarga (value: CapacidadeCarga){
        this.capacidadeCarga = value;
    }

    get cargaMax (): CargaMaxima {
        return this.cargaMax;
    }

    set cargaMax (value: CargaMaxima){
        this.cargaMax = value;
    }

    get cargaTotal (): CargaTotal {
        return this.cargaTotal;
    }

    set cargaTotal (value: CargaTotal){
        this.cargaTotal = value;
    }

    get tempoCarregamento (): TempoCarregamento {
        return this.tempoCarregamento;
    }

    set tempoCarregamento (value: TempoCarregamento){
        this.tempoCarregamento = value;
    }

    private constructor (props: CamiaoProps, id?: UniqueEntityID) {
        super (props, id);
    }

    public static create (camiaoDTO: ICriarCamiaoDTO, id?:UniqueEntityID): Result <Camiao> {

        const guardedProps = [
            {argument: camiaoDTO.caractCamiao, argumentName: 'caractCamiao' },
            {argument: camiaoDTO.matriculaCamiao, argumentName: 'matriculaCamiao' },
            {argument: camiaoDTO.tara, argumentName: "tara"},
            {argument: camiaoDTO.capacidadeCarga, argumentName: "capacidadeCarga"},
            {argument: camiaoDTO.cargaMax, argumentName: "cargaMax"},
            {argument: camiaoDTO.cargaTotal, argumentName: "cargaTotal"},
            {argument: camiaoDTO.tempoCarregamento, argumentName: "tempoCarregamento"}
            
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Camiao>(guardResult.message)
        }     
        else {
            const camiao = new Camiao({
                caractCamiao: new CaractCamiao({value: camiaoDTO.caractCamiao}),
                matriculaCamiao: new MatriculaCamiao({value: camiaoDTO.matriculaCamiao}),
                tara: new Tara ({value: camiaoDTO.tara}),
                capacidadeCarga: new CapacidadeCarga ({value: camiaoDTO.capacidadeCarga}),
                cargaMax: new CargaMaxima ({value: camiaoDTO.cargaMax}),
                cargaTotal: new CargaTotal ({value: camiaoDTO.cargaTotal}),
                tempoCarregamento: new TempoCarregamento ({value: camiaoDTO.tempoCarregamento})},
                id
            );

        return Result.ok<Camiao>(camiao);
    }
}

}