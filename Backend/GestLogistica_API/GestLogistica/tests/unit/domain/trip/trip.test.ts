import { expect } from "chai";
import { TripIdentifier } from "../../../../src/domain/trip/tripIdentifier";
import { Trip } from "../../../../src/domain/trip/trip";
import { TripWarehouse } from "../../../../src/domain/trip/tripWarehouses";

describe("Trip", () => {
  it("should create an valid TripId", () => {

    const day = "22-05-2022";
    const truck = "01";

    let id = TripIdentifier.create(truck, day);

    expect(id.isSuccess).to.be.true;
  });

  it("should create an valid TripId with assetions on the value", () => {

    const day = "22-05-2022";
    const truck = "01";

    let id = TripIdentifier.create(truck, day);

    expect(id.getValue().value).to.equal("01/22-05-2022");
  });

  it("should create an invalid TripId", () => {

    const day = "22-05-2022";
    const truck = "";

    let id = TripIdentifier.create(truck, day);

    expect(id.isSuccess).to.be.false;
  });

  it("should create an valid list of warehouses", function() {

    const warehouses: string[] = ["C05", "C06", "C07", "C08", "C09"];

    const tripW = TripWarehouse.create(warehouses);

    expect(tripW.getValue().value.toString()).to.be.equal(warehouses.toString());
  });

  it("should crate an valid list of associations warehouse/orders", () => {
    
  })
});
