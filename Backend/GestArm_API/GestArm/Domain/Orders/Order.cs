using GestArm.Domain.Shared;

namespace GestArm.Domain.Orders;

    public class Order : Entity<OrderId>, IAggregateRoot
    {
        public Order()
        {
        }

        public Order(OrderDomainId orderDomainId, OrderDate orderDate, OrderMass orderMass,
            TimeOrder chargingTime, TimeOrder unloadingTime, string warehouseId)
        {
            Id = new OrderId(Guid.NewGuid().ToString());
            OrderDate = orderDate;
            OrderMass = orderMass;
            ChargingTime = chargingTime;
            UnloadingTime = unloadingTime;
            WarehouseId = warehouseId;
            OrderDomainId = orderDomainId;
        }

        public OrderDate OrderDate { get; private set; }

        public OrderMass OrderMass { get; private set; }

        public string WarehouseId { get; private set; }

        public TimeOrder ChargingTime { get; private set; }

        public TimeOrder UnloadingTime { get; private set; }

        public OrderDomainId OrderDomainId { get; private set; }

        public void ChangeOrderDate(OrderDate orderDate)
        {
            OrderDate = orderDate;
        }

        public void ChangeOrderMass(OrderMass orderMass)
        {
            OrderMass = orderMass;
        }

        public void ChangeChargingTime(TimeOrder chargingTime)
        {
            ChargingTime = chargingTime;
        }

        public void ChangeUnloadingTime(TimeOrder unloadingTime)
        {
            UnloadingTime = unloadingTime;
        }

        public void ChangeWarehouseId(string warehouseId)
        {
            WarehouseId = warehouseId;
        }
        
    }