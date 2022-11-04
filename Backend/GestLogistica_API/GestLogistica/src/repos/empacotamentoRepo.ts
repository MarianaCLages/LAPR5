import { Document, FilterQuery, Model } from "mongoose";
import { Service, Inject } from "typedi";
import { Result } from "../core/logic/Result";
import { CaractCamiao } from "../domain/camiao/caractCamiao";
import IPacoteRepo from "../services/IRepos/IPacoteRepo";
import { EmpId } from "../domain/empacotamento/empId";
import { Empacotamento } from "../domain/empacotamento/empacotamento";
import { IEmpacotamentoPersistance } from "../dataschema/IEmpacotamentoPersistance";
import { EmpacotamentoMap } from "../mappers/EmpacotamentoMap";
import { ICaminhoPersistence } from "../dataschema/ICaminhoPersistence";
import IEmpacotamentoDTO from "../dto/empacotamento/IEmpacotamentoDTO";
import { EmpEntregaRef } from "../domain/empacotamento/empEntregaRef";
import { EmpCamiaoRef } from "../domain/empacotamento/empCamiaoRef";

@Service()
export default class EmpacotamentoRepo implements IPacoteRepo {
  async;
  private models: any;

  constructor(
    @Inject("empacotamentoSchema") private empacotamentoSchema: Model<IEmpacotamentoPersistance & Document>
  ) {
  }

  private createBaseQuery(): any {
    return {
      where: {}
    };
  }

  public async exists(emp: Empacotamento): Promise<boolean> {
    const idX = emp.empId instanceof EmpId ? (<EmpId>emp.empId).value : emp.empId;
    const query = { id: idX };
    const empDocument = await this.empacotamentoSchema.findOne(query as FilterQuery<IEmpacotamentoPersistance & Document>);

    return !!empDocument === true;
  }

  public async findByDomainId(empacotamentoId: EmpId | string): Promise<Empacotamento> {
    const query = { id: empacotamentoId };
    const roleRecord = await this.empacotamentoSchema.findOne(query as FilterQuery<IEmpacotamentoPersistance & Document>);

    if (roleRecord != null) {
      return EmpacotamentoMap.toDomain(roleRecord);
    } else
      return null;
  }

  public async save(empacotamento: Empacotamento): Promise<Empacotamento> {
    const query = { id: empacotamento.id };
    const empacotamentoDocument = await this.empacotamentoSchema.findOne(query as FilterQuery<IEmpacotamentoPersistance & Document>);
    try {
      if (empacotamentoDocument === null) {
        const rawEmpacotamento: any = EmpacotamentoMap.toPersistence(empacotamento);
        const empacotamentoCreated = await this.empacotamentoSchema.create(rawEmpacotamento);
        return EmpacotamentoMap.toDomain(empacotamentoCreated);
      } else {
        empacotamentoDocument.id = empacotamento.id;
      }
    } catch (err) {
      throw err;
    }
  }

  public async getByEntregaAsync(entregaId: EmpEntregaRef | string): Promise<Result<Array<Empacotamento>>> {
    const idX = entregaId instanceof EmpId ? (<EmpId>entregaId).value : entregaId;

    const query = { empEntregaRef: idX };

    var lista = new Array<Empacotamento>;
    (await this.empacotamentoSchema.find(query)).forEach(
      emp =>
        lista.push(EmpacotamentoMap.toDomain(emp))
    );
    if (lista != null) {
      return Result.ok(lista);
    } else
      return null;
  }

  public async getByCamiaoAsync(entregaId: EmpCamiaoRef | string): Promise<Result<Array<Empacotamento>>> {
    const idX = entregaId instanceof EmpId ? (<EmpId>entregaId).value : entregaId;

    const query = { empCamiaoRef: idX };

    var lista = new Array<Empacotamento>;
    (await this.empacotamentoSchema.find(query)).forEach(
      emp =>
        lista.push(EmpacotamentoMap.toDomain(emp))
    );
    if (lista != null) {
      return Result.ok(lista);
    } else
      return null;

  }

  public async update(empacotamento: Empacotamento): Promise<Result<Empacotamento>> {

    const query = { id: empacotamento.id.toString() };

    const camiaoDocument = await this.empacotamentoSchema.findOne(query as FilterQuery<IEmpacotamentoPersistance & Document>);

    try {
      if (camiaoDocument == null) {
        const rawEmpacotamento = EmpacotamentoMap.toPersistence(empacotamento);

        const empacotamentoCreated = await this.empacotamentoSchema.create(rawEmpacotamento);

        return Result.ok(EmpacotamentoMap.toDomain(empacotamentoCreated));
      } else {
        camiaoDocument.empCamiaoRef = empacotamento.empCamiaoRef.value;
        camiaoDocument.empEntregaRef = empacotamento.empEntregaRef.value;

        await camiaoDocument.save();

        return Result.ok(empacotamento);

      }
    } catch (err) {
      throw err;
    }
  }

  public async getAllEmpacotamentos(): Promise<Result<Array<Empacotamento>>> {
    var lista = new Array<Empacotamento>;
    (await this.empacotamentoSchema.find({})).forEach(
      emp =>
        lista.push(EmpacotamentoMap.toDomain(emp))
    );
    if (lista != null) {
      return Result.ok(lista);
    } else
      return null;
  }

  public async delete(empId: EmpId) {
    const query = { id: empId };
    await this.empacotamentoSchema.deleteOne(query as FilterQuery<ICaminhoPersistence & Document>);
    return true;
  }

}