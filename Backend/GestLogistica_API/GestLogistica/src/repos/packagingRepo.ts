import { Document, FilterQuery, Model } from "mongoose";
import { Service, Inject } from "typedi";
import { Result } from "../core/logic/Result";
import { CaractTruck } from "../domain/truck/caractTruck";
import IPackagingRepo from "../services/IRepos/IPackagingRepo";
import { PackId } from "../domain/packaging/packId";
import { Packaging } from "../domain/packaging/packaging";
import { IPackagingPersistance } from "../dataschema/IPackagingPersistance";
import { PackagingMap } from "../mappers/PackagingMap";
import { IPathPersistence } from "../dataschema/IPathPersistence";
import IPackagingDTO from "../dto/packaging/IPackagingDTO";
import { OrderRef } from "../domain/packaging/orderRef";
import { TruckRef } from "../domain/packaging/truckRef";

@Service()
export default class PackagingRepo implements IPackagingRepo {
  async;
  private models: any;

  constructor(
    @Inject("packagingSchema") private packagingSchema: Model<IPackagingPersistance & Document>
  ) {
  }

  private createBaseQuery(): any {
    return {
      where: {}
    };
  }

  public async exists(emp: Packaging): Promise<boolean> {
    const idX = emp.packId instanceof PackId ? (<PackId>emp.packId).value : emp.packId;
    const query = { id: idX };
    const empDocument = await this.packagingSchema.findOne(query as FilterQuery<IPackagingPersistance & Document>);

    return !!empDocument === true;
  }

  public async findByDomainId(packagingId: PackId | string): Promise<Packaging> {
    const query = { id: packagingId };
    const roleRecord = await this.packagingSchema.findOne(query as FilterQuery<IPackagingPersistance & Document>);

    if (roleRecord != null) {
      return PackagingMap.toDomain(roleRecord);
    } else
      return null;
  }

  public async save(packaging: Packaging): Promise<Packaging> {
    const query = { id: packaging.id };
    const packagingDocument = await this.packagingSchema.findOne(query as FilterQuery<IPackagingPersistance & Document>);
    try {
      if (packagingDocument === null) {
        const rawPackaging: any = PackagingMap.toPersistence(packaging);
        const packagingCreated = await this.packagingSchema.create(rawPackaging);
        return PackagingMap.toDomain(packagingCreated);
      } else {
        packagingDocument.id = packaging.id;
      }
    } catch (err) {
      throw err;
    }
  }

  public async getByOrderAsync(orderId: OrderRef | string): Promise<Result<Array<Packaging>>> {
    const idX = orderId instanceof PackId ? (<PackId>orderId).value : orderId;

    const query = { orderRef: idX };

    var lista = new Array<Packaging>;
    (await this.packagingSchema.find(query)).forEach(
      emp =>
        lista.push(PackagingMap.toDomain(emp))
    );
    if (lista != null) {
      return Result.ok(lista);
    } else
      return null;
  }

  public async getByTruckAsync(orderId: TruckRef | string): Promise<Result<Array<Packaging>>> {
    const idX = orderId instanceof PackId ? (<PackId>orderId).value : orderId;

    const query = { truckRef: idX };

    var lista = new Array<Packaging>;
    (await this.packagingSchema.find(query)).forEach(
      emp =>
        lista.push(PackagingMap.toDomain(emp))
    );
    if (lista != null) {
      return Result.ok(lista);
    } else
      return null;

  }

  public async update(packaging: Packaging): Promise<Result<Packaging>> {

    const query = { id: packaging.id.toString() };

    const truckDocument = await this.packagingSchema.findOne(query as FilterQuery<IPackagingPersistance & Document>);

    try {
      if (truckDocument == null) {
        const rawPackaging = PackagingMap.toPersistence(packaging);

        const packagingCreated = await this.packagingSchema.create(rawPackaging);

        return Result.ok(PackagingMap.toDomain(packagingCreated));
      } else {
        truckDocument.truckRef = packaging.truckRef.value;
        truckDocument.orderRef = packaging.orderRef.value;

        await truckDocument.save();

        return Result.ok(packaging);

      }
    } catch (err) {
      throw err;
    }
  }

  public async getAllPackagings(): Promise<Result<Array<Packaging>>> {
    var lista = new Array<Packaging>;
    (await this.packagingSchema.find({})).forEach(
      emp =>
        lista.push(PackagingMap.toDomain(emp))
    );
    if (lista != null) {
      return Result.ok(lista);
    } else
      return null;
  }

  public async delete(packId: PackId) {
    const query = { id: packId };
    await this.packagingSchema.deleteOne(query as FilterQuery<IPathPersistence & Document>);
    return true;
  }

}