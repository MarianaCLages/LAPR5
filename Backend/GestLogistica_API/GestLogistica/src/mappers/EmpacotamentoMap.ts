import {Mapper} from "../core/infra/Mapper";

import {Document, Model} from "mongoose";

import { Empacotamento } from "../domain/empacotamento/empacotamento";
import IEmpacotamentoDTO from "../dto/empacotamento/IEmpacotamentoDTO";
import { IEmpacotamentoPersistance } from "../dataschema/IEmpacotamentoPersistance";

export class EmpacotamentoMap extends Mapper<Empacotamento> {
  public static toDTO(empacotamento: Empacotamento): IEmpacotamentoDTO {
    return {
      id: empacotamento.id.toString(),
      empEntregaRef: empacotamento.empEntregaRef.value,
      empCamiaoRef: empacotamento.empCamiaoRef.value,
    };
  }

  public static toDomain(
    empacotamento: any | Model<IEmpacotamentoPersistance & Document>
  ): Empacotamento {
    const roleOrError = Empacotamento.createWithId(empacotamento);

    roleOrError.isFailure ? console.log(roleOrError.error) : "";

    return roleOrError.isSuccess ? roleOrError.getValue() : null;
  }

  public static toPersistence(empacotamento: Empacotamento): any {

    return {
      id: empacotamento.id,
      empEntregaRef: empacotamento.empEntregaRef.value,
      empCamiaoRef: empacotamento.empCamiaoRef.value,
    };
  }
}
