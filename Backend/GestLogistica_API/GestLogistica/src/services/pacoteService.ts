import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IArmazemRepo from "../services/IRepos/IArmazemRepo";
import https = require("https");
import IPacoteService from "./IServices/IPacoteService";
import IEmpacotamentoRepo from "../repos/empacotamentoRepo";
import ICriarEmpacotamentoDTO from "../dto/empacotamento/ICriarEmpacotamentoDTO";
import IEmpacotamentoDTO from "../dto/empacotamento/IEmpacotamentoDTO";
import { Empacotamento } from "../domain/empacotamento/empacotamento";
import { EmpacotamentoMap } from "../mappers/EmpacotamentoMap";
import { EmpEntregaRef } from "../domain/empacotamento/empEntregaRef";
import { EmpCamiaoRef } from "../domain/empacotamento/empCamiaoRef";
import IEmpacotamentoIdDTO from "../dto/empacotamento/IEmpacotamentoIdDTO";
import IEncomendaRepo from "./IRepos/IEncomendaRepo";
import ICamiaoRepo from "./IRepos/ICamiaoRepo";
import camiaoRepo from "../repos/camiaoRepo";
import { CaractCamiao } from "../domain/camiao/caractCamiao";
import ICaminhoIdDto from "../dto/caminho/ICaminhoIdDto";
import IEmpacotamentoEntregaDTO from "../dto/empacotamento/IEmpacotamentoEntregaDTO";
import IEmpacotamentoCamiaoDTO from "../dto/empacotamento/IEmpacotamentoCamiaoDTO";


@Service()
export default class PacoteService implements IPacoteService {
  httpsAgent = new https.Agent({
    rejectUnauthorized: false
  });

  constructor(
    @Inject(config.repos.pacote.name) private empacotamentoRepo: IEmpacotamentoRepo,
    @Inject(config.repos.entrega.name) private encomendaRepo: IEncomendaRepo,
    @Inject(config.repos.camiao.name) private camiaoRepo: ICamiaoRepo
  ) {
  }

  public async getByEntregaS(entregaId: IEmpacotamentoEntregaDTO): Promise<Result<Array<IEmpacotamentoDTO>>> {
    try {
      const empacotamento = await this.empacotamentoRepo.getByEntregaAsync(entregaId.empEntregaRef);

      if (empacotamento === null) {
        return Result.fail("Nenhum empacotamento não foi encontrado!");
      } else {
        const caminhosDTO = empacotamento.getValue().map(emp => EmpacotamentoMap.toDTO(emp));
        return Result.ok(caminhosDTO);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getByCamiaoAsync(entregaId: IEmpacotamentoCamiaoDTO): Promise<Result<Array<IEmpacotamentoDTO>>> {
    try {
      const empacotamento = await this.empacotamentoRepo.getByCamiaoAsync(entregaId.empCamiaoRef);

      if (empacotamento === null) {
        return Result.fail("Nenhum empacotamento foi encontrado!");
      } else {

        const caminhosDTO = empacotamento.getValue().map(emp => EmpacotamentoMap.toDTO(emp));
        return Result.ok(caminhosDTO);
      }
    } catch (e) {
      throw e;
    }
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

      const verifica = await this.verificaParametros(empacotamentoDTO.empEntregaRef, empacotamentoDTO.empCamiaoRef);

      if (verifica.isFailure) {
        return Result.fail<IEmpacotamentoDTO>(verifica.errorValue());
      }

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

    const verifica = await this.verificaParametros(empacotamentoDTO.empEntregaRef, empacotamentoDTO.empCamiaoRef);

    if (verifica.isFailure) {
      return Result.fail<IEmpacotamentoDTO>(verifica.errorValue());
    }

    const empacotamento = await this.empacotamentoRepo.findByDomainId(empacotamentoDTO.id);

    if (empacotamento === null) return Result.fail<IEmpacotamentoDTO>("O empacotamento não foi encontrado!");

    empacotamento.empEntregaRef = EmpEntregaRef.create(empacotamentoDTO.empEntregaRef).getValue();
    empacotamento.empCamiaoRef = EmpCamiaoRef.create(empacotamentoDTO.empCamiaoRef).getValue();

    const empacotamentoUpdatedOrError = await this.empacotamentoRepo.update(empacotamento);
    const empacotamentoDTOResult = EmpacotamentoMap.toDTO(empacotamentoUpdatedOrError.getValue());

    empacotamentoDTOResult.id = empacotamentoDTO.id;

    return Result.ok<IEmpacotamentoDTO>(empacotamentoDTOResult);
  }

  public async getAllEmpacotamentos(): Promise<Result<Array<IEmpacotamentoDTO>>> {
    const empacotamentos = await this.empacotamentoRepo.getAllEmpacotamentos();

    const caminhosDTO = empacotamentos.getValue().map(emp => EmpacotamentoMap.toDTO(emp));
    return Result.ok(caminhosDTO);
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

  private async verificaEncomenda(encomendaId: string): Promise<Result<boolean>> {


    const encomendaChegadaResult = await this.encomendaRepo.exists(encomendaId);

    if (encomendaChegadaResult === false) {
      return Result.fail<boolean>("Encomenda não foi encontrado!");
    }

    return Result.ok<boolean>(true);

  }

  private async verificarCamiao(camiaoId: string): Promise<Result<boolean>> {

    const camiao = await this.camiaoRepo.getByCaractAsync(camiaoId);

    if (camiao.getValue().length == 0) {
      return Result.fail<boolean>("Camião não foi encontrado!");
    }

    return Result.ok<boolean>(true);

  }

  private async verificaParametros(empEntregaRef: string, empCamiaoRef: string) {
    const verificarEncomenda = await this.verificaEncomenda(empEntregaRef);

    if (verificarEncomenda.isFailure) {
      return Result.fail<IEmpacotamentoDTO>("Encomenda não foi encontrado! O id especificado não existe");
    }

    const verificarCamiao = await this.verificarCamiao(empCamiaoRef);

    if (verificarCamiao.isFailure) {
      return Result.fail<IEmpacotamentoDTO>("Camiao não foi encontrado! A matricula especificada não existe");
    }

    return Result.ok<boolean>(true);

  }

}