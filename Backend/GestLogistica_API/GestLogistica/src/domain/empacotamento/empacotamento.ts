import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { EmpEntregaRef } from "./empEntregaRef";
import { EmpCamiaoRef } from "./empCamiaoRef";
import ICriarEmpacotamentoDTO from "../../dto/empacotamento/ICriarEmpacotamentoDTO";
import IEmpacotamentoDTO from "../../dto/empacotamento/IEmpacotamentoDTO";
import { CaminhoId } from "../caminho/caminhoId";

interface EmpacotamentoProps {
  empEntregaRef: EmpEntregaRef;
  empCamiaoRef: EmpCamiaoRef;
}

export class Empacotamento extends AggregateRoot<EmpacotamentoProps> {
  private constructor(props: EmpacotamentoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get empId(): CaminhoId {
    return new CaminhoId(this.id.toValue());
  }

  get empEntregaRef(): EmpEntregaRef {
    return this.props.empEntregaRef;
  }

  get empCamiaoRef(): EmpCamiaoRef {
    return this.props.empCamiaoRef;
  }

  set empCamiaoRef(value: EmpCamiaoRef) {
    this.props.empCamiaoRef = value;
  }

  set empArmazemId(value: EmpEntregaRef) {
    this.props.empEntregaRef = value;
  }

  public static create(empacotamentoDTO: ICriarEmpacotamentoDTO, id?: UniqueEntityID): Result<Empacotamento> {
    const guardedProps = [
      { argument: empacotamentoDTO.empEntregaRef, argumentName: "encomendaReferenciada" },
      { argument: empacotamentoDTO.empCamiaoRef, argumentName: "camiaoReferenciada" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    //caminho chega e partida não podem ser iguais
    if (empacotamentoDTO.empEntregaRef === empacotamentoDTO.empCamiaoRef) {
      return Result.fail<Empacotamento>("Não pode existir referencias iguais! (Entre o camião e a entrega)");
    }

    if (!guardResult.succeeded) {
      return Result.fail<Empacotamento>(guardResult.message);
    } else {
      try {
        const _empEntregaRef = EmpEntregaRef.create(empacotamentoDTO.empEntregaRef);
        const _empCamiaoRef = EmpCamiaoRef.create(empacotamentoDTO.empCamiaoRef);

        if (_empEntregaRef.isFailure || _empCamiaoRef.isFailure) {
          //adds to the message the errors of each value object if they exist
          let message = "Não foi possviel criar o caminho: \n";
          if (_empEntregaRef.isFailure) {
            message += _empEntregaRef.errorValue() + "\n";
          }
          if (_empCamiaoRef.isFailure) {
            message += _empCamiaoRef.errorValue() + "\n";
          }
          return Result.fail<Empacotamento>(message);
        }

        const empacotamento = new Empacotamento({
          empEntregaRef: _empEntregaRef.getValue(),
          empCamiaoRef: _empCamiaoRef.getValue()
        }, id);
        return Result.ok<Empacotamento>(empacotamento);
      } catch (err) {
        console.debug(err);
        return Result.fail<Empacotamento>(err.toString());
      }

    }
  }

  public static createWithId(empacotamentoDTO: IEmpacotamentoDTO): Result<Empacotamento> {
    const guardedProps = [
      { argument: empacotamentoDTO.empEntregaRef, argumentName: "encomendaReferenciada" },
      { argument: empacotamentoDTO.empCamiaoRef, argumentName: "camiaoReferenciada" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    //caminho chega e partida não podem ser iguais
    if (empacotamentoDTO.empEntregaRef === empacotamentoDTO.empCamiaoRef) {
      return Result.fail<Empacotamento>("Não pode existir referencias iguais! (Entre o camião e a entrega)");
    }

    if (!guardResult.succeeded) {
      return Result.fail<Empacotamento>(guardResult.message);
    } else {
      try {
        const _empEntregaRef = EmpEntregaRef.create(empacotamentoDTO.empEntregaRef);
        const _empCamiaoRef = EmpCamiaoRef.create(empacotamentoDTO.empCamiaoRef);

        if (_empEntregaRef.isFailure || _empCamiaoRef.isFailure) {
          //adds to the message the errors of each value object if they exist
          let message = "Não foi possviel criar o caminho: \n";
          if (_empEntregaRef.isFailure) {
            message += _empEntregaRef.errorValue() + "\n";
          }
          if (_empCamiaoRef.isFailure) {
            message += _empCamiaoRef.errorValue() + "\n";
          }
          return Result.fail<Empacotamento>(message);
        }

        const empacotamento = new Empacotamento({
          empEntregaRef: _empEntregaRef.getValue(),
          empCamiaoRef: _empCamiaoRef.getValue()
        }, new UniqueEntityID(empacotamentoDTO.id));
        return Result.ok<Empacotamento>(empacotamento);
      } catch (err) {
        console.debug(err);
        return Result.fail<Empacotamento>(err.toString());
      }

    }
  }
}
