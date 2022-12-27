import { TripBuilder } from "../../../../src/domain/trip/tripBuilder";
import { expect } from "chai";

describe("Trip Builder Test", () => {
  it("should create an valid instance of the Trip", () => {
    const day = "07/08/2022"
    const truck = "TC01"
    const testBuilder = new TripBuilder(day, truck)
    testBuilder.addOrder("04/04/2022/1","C01")
    testBuilder.addOrder("04/04/2021/1", "C02")
    testBuilder.addOrder("04/04/2022/2", "C01")

    const trip = testBuilder.build()

    expect(trip.isSuccess).to.be.true
  })
  it("should create an instance of trip with all the orders", () => {
    const day = "07/08/2022"
    const truck = "TC01"
    const testBuilder = new TripBuilder(day, truck)
    testBuilder.addOrder("04/04/2022/1","C01")
    testBuilder.addOrder("04/04/2021/1", "C02")
    testBuilder.addOrder("04/04/2022/2", "C01")

    const trip = testBuilder.build()

    expect(trip.getValue().props.tripOrders.props.ordersWarehouses.length).to.be.equal(2)
    expect(trip.getValue().props.tripOrders.props.ordersWarehouses[0].order.length).to.be.equal(2)
    expect(trip.getValue().props.tripOrders.props.ordersWarehouses[1].order.length).to.be.equal(1)
  })
})