import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IWarehouseRepo from "./IRepos/IWarehouseRepo";
import https = require("https");
import IPackagingService from "./IServices/IPackagingService";
import IPackagingRepo from "../repos/packagingRepo";
import ICreatePackagingDTO from "../dto/packaging/ICreatePackagingDTO";
import IPackagingDTO from "../dto/packaging/IPackagingDTO";
import { Packaging } from "../domain/packaging/packaging";
import { PackagingMap } from "../mappers/PackagingMap";
import { OrderRef } from "../domain/packaging/orderRef";
import { TruckRef } from "../domain/packaging/truckRef";
import IPackagingIdDTO from "../dto/packaging/IPackagingIdDTO";
import IOrderRepo from "./IRepos/IOrderRepo";
import ITruckRepo from "./IRepos/ITruckRepo";
import truckRepo from "../repos/truckRepo";
import { CaractTruck } from "../domain/truck/caractTruck";
import IPathIdDto from "../dto/path/IPathIdDto";
import IPackagingOrderDTO from "../dto/packaging/IPackagingOrderDTO";
import IPackagingTruckDTO from "../dto/packaging/IPackagingTruckDTO";


@Service()
export default class PackagingService implements IPackagingService {
  httpsAgent = new https.Agent({
    rejectUnauthorized: false
  });

  constructor(
    @Inject(config.repos.packaging.name) private packagingRepo: IPackagingRepo,
    @Inject(config.repos.order.name) private orderRepo: IOrderRepo,
    @Inject(config.repos.truck.name) private truckRepo: ITruckRepo
  ) {
  }

  public async getByOrderS(orderId: IPackagingOrderDTO): Promise<Result<Array<IPackagingDTO>>> {
    try {
      const packaging = await this.packagingRepo.getByOrderAsync(orderId.orderRef);

      if (packaging === null) {
        return Result.fail("No packaging was found!");
      } else {
        const pathsDTO = packaging.getValue().map(emp => PackagingMap.toDTO(emp));
        return Result.ok(pathsDTO);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getByTruckAsync(orderId: IPackagingTruckDTO): Promise<Result<Array<IPackagingDTO>>> {
    try {
      const packaging = await this.packagingRepo.getByTruckAsync(orderId.truckRef);

      if (packaging === null) {
        return Result.fail("No packaging was found!!");
      } else {

        const pathsDTO = packaging.getValue().map(emp => PackagingMap.toDTO(emp));
        return Result.ok(pathsDTO);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getPackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>> {
    try {
      const packaging = await this.packagingRepo.findByDomainId(packagingDTO.id);

      if (packaging === null) {
        return Result.fail<IPackagingDTO>("Packaging not found!");
      } else {
        const packagingDTOResult = PackagingMap.toDTO(packaging);
        return Result.ok<IPackagingDTO>(packagingDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createPackaging(packagingDTO: ICreatePackagingDTO): Promise<Result<IPackagingDTO>> {
    try {

      const verifica = await this.verificaParametros(packagingDTO.orderRef, packagingDTO.truckRef);

      if (verifica.isFailure) {
        return Result.fail<IPackagingDTO>(verifica.errorValue());
      }

      const packagingOrError = Packaging.create(packagingDTO);

      if (packagingOrError.isFailure) {
        return Result.fail<IPackagingDTO>(packagingOrError.errorValue());
      }

      const packagingResult = packagingOrError.getValue();

      await this.packagingRepo.save(packagingResult);


      const packagingDTOResult = PackagingMap.toDTO(packagingResult);
      return Result.ok<IPackagingDTO>(packagingDTOResult);

    } catch (e) {
      console.debug(e.message);
      return Result.fail<IPackagingDTO>(e.message);
    }

  }

  public async updatePackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>> {

    const verifica = await this.verificaParametros(packagingDTO.orderRef, packagingDTO.truckRef);

    if (verifica.isFailure) {
      return Result.fail<IPackagingDTO>(verifica.errorValue());
    }

    const packaging = await this.packagingRepo.findByDomainId(packagingDTO.id);

    if (packaging === null) return Result.fail<IPackagingDTO>("Packaging not found!");

    packaging.orderRef = OrderRef.create(packagingDTO.orderRef).getValue();
    packaging.truckRef = TruckRef.create(packagingDTO.truckRef).getValue();

    const packagingUpdatedOrError = await this.packagingRepo.update(packaging);
    const packagingDTOResult = PackagingMap.toDTO(packagingUpdatedOrError.getValue());

    packagingDTOResult.id = packagingDTO.id;

    return Result.ok<IPackagingDTO>(packagingDTOResult);
  }

  public async getAllPackagings(): Promise<Result<Array<IPackagingDTO>>> {
    const packagings = await this.packagingRepo.getAllPackagings();

    const pathsDTO = packagings.getValue().map(emp => PackagingMap.toDTO(emp));
    return Result.ok(pathsDTO);
  }

  public async deletePackaging(packId: IPackagingIdDTO): Promise<Result<IPackagingDTO>> {
    try {
      const packaging = await this.packagingRepo.findByDomainId(packId.id);
      if (packaging === null) {
        return Result.fail<IPackagingDTO>("Packaging not found! Specified ID does not exist");
      } else {
        await this.packagingRepo.delete(packaging.id);

        const packagingDTOResult = PackagingMap.toDTO(packaging) as IPackagingDTO;
        return Result.ok<IPackagingDTO>(packagingDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  private async verificaOrder(orderId: string): Promise<Result<boolean>> {


    const orderChegadaResult = await this.orderRepo.exists(orderId);

    if (orderChegadaResult === false) {
      return Result.fail<boolean>("Order not found!");
    }

    return Result.ok<boolean>(true);

  }

  private async verificarTruck(truckId: string): Promise<Result<boolean>> {

    const truck = await this.truckRepo.getByCaractAsync(truckId);

    if (truck.getValue().length == 0) {
      return Result.fail<boolean>("Truck not found!");
    }

    return Result.ok<boolean>(true);

  }

  private async verificaParametros(orderRef: string, truckRef: string) : Promise<Result<boolean>>{
    const verificarOrder = await this.verificaOrder(orderRef);

    if (verificarOrder.isFailure) {
      return Result.fail<boolean>("Order not found! Specified ID does not exist");
    }

    const verificarTruck = await this.verificarTruck(truckRef);

    if (verificarTruck.isFailure) {
      return Result.fail<boolean>("Truck não foi encontrado! Specified plate does not exist");
    }

    return Result.ok<boolean>(true);

  }

}