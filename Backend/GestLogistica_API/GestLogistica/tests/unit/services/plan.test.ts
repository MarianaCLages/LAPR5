import { ITruckTripDTO } from "../../../src/dto/truck/ITruckTripDTO";
import IOrderDTO from "../../../src/dto/IOrderDTO";
import TruckOrderPlan from "../../../src/repos/TruckOrderPlan";

const sinon = require("sinon");


describe("planing algorithm test", () => {
  it("should be able to plan with one truck", async () => {
    //one truck
    const truck: ITruckTripDTO = {
      domainId: "0001",
      caractTruck: "TC01",
      truckPlate: "AA-FF-55",
      weightCapacity: 500,
      cargaMax: 80,
      tare: 120,
      chargingTime: 60,
      remainingSpace: 500
    };
    const trucks: ITruckTripDTO[] = [truck];

    //3 orders
    const orders: IOrderDTO[] = [
      {
        Identifier: "adsd",
        OrderDate: "07/08/2023",
        OrderMass: "50",
        ChargingTime: "2",
        UnloadingTime: "3",
        WarehouseId: "C05"
      },
      {
        Identifier: "ads",
        OrderDate: "07/08/2023",
        OrderMass: "50",
        ChargingTime: "2",
        UnloadingTime: "3",
        WarehouseId: "C05"
      },
      {
        Identifier: "adsl",
        OrderDate: "07/08/2023",
        OrderMass: "50",
        ChargingTime: "2",
        UnloadingTime: "3",
        WarehouseId: "C05"
      }
    ];
    const planner = new TruckOrderPlan();
    const result = await planner.getTrip(trucks, orders);

    sinon.assert.match(result.getValue()[0].tripOrders.length, 1);
    sinon.assert.match(result.getValue()[0].tripWarehouses.length, 1);
  });

  it("should be able to plan with two trucks", async () => {
    //two trucks
    const truck1: ITruckTripDTO = {
      domainId: "0001",
      caractTruck: "TC01",
      truckPlate: "AA-FF-55",
      weightCapacity: 500,
      cargaMax: 80,
      tare: 120,
      chargingTime: 60,
      remainingSpace: 500
    };
    const truck2: ITruckTripDTO = {
      domainId: "0002",
      caractTruck: "TC02",
      truckPlate: "AA-FF-55",
      weightCapacity: 500,
      cargaMax: 80,
      tare: 120,
      chargingTime: 60,
      remainingSpace: 400
    };

    const trucks: ITruckTripDTO[] = [truck1, truck2];

    const orders: IOrderDTO[] = [
      {
        Identifier: "adsd",
        OrderDate: "07/08/2023",
        OrderMass: "50",
        ChargingTime: "2",
        UnloadingTime: "3",
        WarehouseId: "C10"
      },
      {
        Identifier: "ads",
        OrderDate: "07/08/2023",
        OrderMass: "50",
        ChargingTime: "2",
        UnloadingTime: "3",
        WarehouseId: "C15"
      },
      {
        Identifier: "adsl",
        OrderDate: "07/08/2023",
        OrderMass: "50",
        ChargingTime: "2",
        UnloadingTime: "3",
        WarehouseId: "C20"
      },
      {
        Identifier: "adsp",
        OrderDate: "07/08/2023",
        OrderMass: "380",
        ChargingTime: "2",
        UnloadingTime: "3",
        WarehouseId: "C06"
      }
    ];


    const planner = new TruckOrderPlan();

    const result = await planner.getTrip(trucks, orders);
    const expected: string = "[{\n" +
      "  tripDay: \"06/01/2023\",\n" +
      "  tripIdentifier: \"TC01/06/01/2023\",\n" +
      "  tripOrders: [{ order: [\"adsd\"], warehouse: \"C10\" }, { order: [\"ads\"], warehouse: \"C15\" }, { order: [\"adsl\"], warehouse: \"C20\" }],\n" +
      "  tripTruck: \"TC01\",\n" +
      "  tripWarehouses: [\"C10\", \"C15\", \"C20\"]\n" +
      "}, {\n" +
      "  tripDay: \"06/01/2023\",\n" +
      "  tripIdentifier: \"TC02/06/01/2023\",\n" +
      "  tripOrders: [{ order: [\"adsp\"], warehouse: \"C06\" }],\n" +
      "  tripTruck: \"TC02\",\n" +
      "  tripWarehouses: [\"C06\"]\n" +
      "}]";

    sinon.assert.match(result.getValue()[0].tripOrders.length, 3);
    sinon.assert.match(result.getValue()[0].tripWarehouses.length, 3);
    sinon.assert.match(result.getValue()[1].tripOrders.length, 1);
    // printProperties(result);
  });
});

function printProperties(obj) {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (Array.isArray(obj[property])) {
        console.log(`${property}:`);
        obj[property].forEach(element => {
          if (typeof element === "object") {
            printProperties(element);
          } else {
            console.log(element);
          }
        });
      } else if (typeof obj[property] === "object") {
        console.log(`${property}:`);
        printProperties(obj[property]);
      } else {
        console.log(`${property}: ${obj[property]}`);
      }
    }
  }
}