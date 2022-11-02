import {Inject, Service} from "typedi";
import config from "../../config";
import {Result} from "../core/logic/Result";
import IArmazemRepo from "../services/IRepos/IArmazemRepo";
import https = require("https");
import IEmpacotamentoService from "../services/IServices/IEmpacotamentoService";
import IEmpacotamentoRepo from "../repos/empacotamentoRepo";
import ICriarEmpacotamentoDTO from "../dto/empacotamento/ICriarEmpacotamentoDTO";
import IEmpacotamentoDTO from "../dto/empacotamento/IEmpacotamentoDTO";
import { Empacotamento } from "../domain/empacotamento/empacotamento";
import { EmpacotamentoMap } from "../mappers/EmpacotamentoMap";
import { EmpEntregaRef } from "../domain/empacotamento/empEntregaRef";
import { EmpCamiaoRef } from "../domain/empacotamento/empCamiaoRef";
import IEmpacotamentoIdDTO from "../dto/empacotamento/IEmpacotamentoIdDTO";


@Service()
export default class EmpacotamentoService implements IEmpacotamentoService {
  httpsAgent = new https.Agent({
    rejectUnauthorized: false
  });

  constructor(
    @Inject(config.repos.empacotamento.name) private empacotamentoRepo: IEmpacotamentoRepo,
    ) {
  }

  public async getEmpacotamento(empacotamentoDTO: IEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO>> {
    try {
      const empacotamento = await this.empacotamentoRepo.findByDomainId(empacotamentoDTO.id);

      if (empacotamento === null) {
        return Result.fail<IEmpacotamentoDTO>("Empacotamento não foi encontrado!");
      } else {
        const empacotamentoDTOResult = EmpacotamentoMap.toDTO(empacotamento);
        return Result.ok<IEmpacotamentoDTO>(empacotamentoDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createEmpacotamento(empacotamentoDTO: ICriarEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO>> {
    try {
      const empacotamentoOrError = Empacotamento.create(empacotamentoDTO);


      if (empacotamentoOrError.isFailure) {
        return Result.fail<IEmpacotamentoDTO>(empacotamentoOrError.errorValue());
      }

      const empacotamentoResult = empacotamentoOrError.getValue();

      await this.empacotamentoRepo.save(empacotamentoResult);


      const empacotamentoDTOResult = EmpacotamentoMap.toDTO(empacotamentoResult);
      return Result.ok<IEmpacotamentoDTO>(empacotamentoDTOResult);

    } catch (e) {
      console.debug(e.message);
      return Result.fail<IEmpacotamentoDTO>(e.message);
    }

  }

  public async updateEmpacotamento(empacotamentoDTO: IEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO>> {

    const empacotamento = await this.empacotamentoRepo.findByDomainId(empacotamentoDTO.id);

    if (empacotamento === null) return Result.fail<IEmpacotamentoDTO>("O empacotamento não foi encontrado!");

    empacotamento.empArmazemId = EmpEntregaRef.create(empacotamentoDTO.empEntregaRef).getValue();
    empacotamento.empCamiaoRef = EmpCamiaoRef.create(empacotamentoDTO.empCamiaoRef).getValue();

    const empacotamentoUpdatedOrError = await this.empacotamentoRepo.update(empacotamento);
    const empacotamentoDTOResult = EmpacotamentoMap.toDTO(empacotamentoUpdatedOrError.getValue());

    empacotamentoDTOResult.id = empacotamentoDTO.id;

    return Result.ok<IEmpacotamentoDTO>(empacotamentoDTOResult);
  }

  public async getAllEmpacotamentos() {
    const empacotamentos = await this.empacotamentoRepo.getAllEmpacotamentos();
    const caminhosDTO = empacotamentos.getValue().map(emp => EmpacotamentoMap.toDTO(emp));
    return caminhosDTO;
  }

  public async apagaEmpacotamento(empId: IEmpacotamentoIdDTO): Promise<Result<IEmpacotamentoDTO>> {
    try {
      const empacotamento = await this.empacotamentoRepo.findByDomainId(empId.id);
      if (empacotamento === null) {
        return Result.fail<IEmpacotamentoDTO>("Empacotamento não foi encontrado! O id especificado não existe");
      } else {
        await this.empacotamentoRepo.delete(empacotamento.id);

        const empacotamentoDTOResult = EmpacotamentoMap.toDTO(empacotamento) as IEmpacotamentoDTO;
        return Result.ok<IEmpacotamentoDTO>(empacotamentoDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

}
