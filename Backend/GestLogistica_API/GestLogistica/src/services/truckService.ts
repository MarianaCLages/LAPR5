import {Inject, Service} from "typedi";
import config from "../../config";

import ITruckService from "../services/IServices/ITruckService";
import {ITruckDTO} from "../dto/truck/ITruckDTO";
import {Truck} from "../domain/truck/truck";
import {TruckMap} from "../mappers/TruckMap";

import {Result} from "../core/logic/Result";
import ITruckRepo from "./IRepos/ITruckRepo";
import {ICreateTruckDTO} from "../dto/truck/ICreateTruckDTO";
import {MaxLoadAutonomy} from "../domain/truck/maxLoadAutonomy";
import {TruckPlate} from "../domain/truck/truckPlate";
import {Tare} from "../domain/truck/tare";
import {ChargingTime} from "../domain/truck/chargingTime";
import ITruckCaractDTO from "../dto/truck/ITruckCaractDTO";
import ITruckPlateDTO from "../dto/truck/ITruckPlateDTO";
import { WeightCapacity } from "../domain/truck/weightCapacity";

@Service()
export default class TruckService implements ITruckService {
    constructor(
        @Inject(config.repos.truck.name) private truckRepo: ITruckRepo
    ) {
    }


    public async createTruck(truckDTO: ICreateTruckDTO): Promise<Result<ITruckDTO>> {

        try {
            const truckOrError = await Truck.create(truckDTO);
            if (truckOrError.isFailure) {
                return Result.fail<ITruckDTO>(truckOrError.errorValue());
            }
            const truckResult = truckOrError.getValue();
            await this.truckRepo.save(truckResult);
            const truckDTOResult = TruckMap.toDTO(truckResult) as ITruckDTO;
            return Result.ok<ITruckDTO>(truckDTOResult);
        } catch (e) {
            return Result.fail<ITruckDTO>(e.message);
        }
    }

    public async getByCaract(caract: ITruckCaractDTO): Promise<Result<Array<ITruckDTO>>> {
        try {
            const truck = await this.truckRepo.getByCaractAsync(caract.caractTruck);

            if (truck === null) {
                return Result.fail("Truck not found!");
            } else {
                const trucksDTO = truck.getValue().map(cam => TruckMap.toDTO(cam));
                return Result.ok(trucksDTO);
            }
        } catch (e) {
            throw e;
        }
    }

    public async getByPlate(plate: ITruckPlateDTO): Promise<Result<Array<ITruckDTO>>> {
        try {
            const truck = await this.truckRepo.getByPlateAsync(plate.truckPlate);

            if (truck === null) {
                return Result.fail("Truck not found!");
            } else {
                const trucksDTO = truck.getValue().map(cam => TruckMap.toDTO(cam));
                return Result.ok(trucksDTO);
            }
        } catch (e) {
            throw e;
        }
    }

    public async getAllTrucks(): Promise<Result<Array<ITruckDTO>>> {
        const trucks = await this.truckRepo.getAllTrucks();

        const trucksDTO = trucks.getValue().map(cam => TruckMap.toDTO(cam));
        return Result.ok(trucksDTO);
    }

    public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {

        const truck = await this.truckRepo.findByDomainId(truckDTO.domainId);

        if (truck === null) {
            return Result.fail<ITruckDTO>("Truck does not exist");
        }

        truck.weightCapacity = WeightCapacity.create(truckDTO.weightCapacity).getValue();
        truck.cargaMax = MaxLoadAutonomy.create(truckDTO.cargaMax).getValue();
        truck.truckPlate = TruckPlate.create(truckDTO.truckPlate).getValue();
        truck.tare = Tare.create(truckDTO.tare).getValue();
        truck.chargingTime = ChargingTime.create(truckDTO.chargingTime).getValue();

        const truckUpdateError = await this.truckRepo.update(truck);
        const truckDTOResult = TruckMap.toDTO(truckUpdateError.getValue());

        return Result.ok<ITruckDTO>(truckDTOResult);

    }

    public async deleteTruck(dto: ITruckDTO): Promise<Result<ITruckDTO>> {
        try {
            const truck = await this.truckRepo.findByDomainId(dto.domainId);

            if (truck === null) {
                return Result.fail<ITruckDTO>("Truck does not exist");
            }


            await this.truckRepo.deleteTruck(dto.domainId);
            const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;

            return Result.ok<ITruckDTO>(truckDTOResult);
        } catch (e) {
            throw e;
        }
    }

}