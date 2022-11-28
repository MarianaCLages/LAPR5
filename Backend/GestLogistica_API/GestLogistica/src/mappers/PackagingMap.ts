import {Mapper} from "../core/infra/Mapper";

import {Document, Model} from "mongoose";

import { Packaging } from "../domain/packaging/packaging";
import IPackagingDTO from "../dto/packaging/IPackagingDTO";
import { IPackagingPersistance } from "../dataschema/IPackagingPersistance";

export class PackagingMap extends Mapper<Packaging> {
  public static toDTO(packaging: Packaging): IPackagingDTO {
    return {
      id: packaging.id.toString(),
      orderRef: packaging.orderRef.value,
      truckRef: packaging.truckRef.value,
      pos3DX: packaging.pos3DX.value,
      pos3DY: packaging.pos3DY.value,
      pos3DZ: packaging.pos3DZ.value
    };
  }

  public static toDomain(
    packaging: any | Model<IPackagingPersistance & Document>
  ): Packaging {
    const roleOrError = Packaging.createWithId(packaging);

    roleOrError.isFailure ? console.log(roleOrError.error) : "";

    return roleOrError.isSuccess ? roleOrError.getValue() : null;
  }

  public static toPersistence(packaging: Packaging): any {
    return {
      id: packaging.id,
      orderRef: packaging.orderRef.value,
      truckRef: packaging.truckRef.value,
      pos3DX: packaging.pos3DX.value,
      pos3DY: packaging.pos3DY.value,
      pos3DZ: packaging.pos3DZ.value
    };
  }
}
