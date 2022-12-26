import { expect } from 'chai';
import { Truck } from "../../../../src/domain/truck/truck";

describe('Truck', () => {
    it('should create a new Truck', () => {
        const truckDTO = {
            domainId: 'domainId',
            caractTruck: 'caractTruck',
            truckPlate: 'AA-56-BB',
            tare: 1,
            weightCapacity: 1,
            cargaMax: 1,
            totalBatCharge: 1,
            chargingTime: 1,
            activeTruck: true
        };

        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.true;
    });

    it('should not create a new Truck with invalid caractTruck', () => {
        const truckDTO = {
            domainId: 'domainId',
            caractTruck: '',
            truckPlate: 'AA-56-BB',
            tare: 1,
            weightCapacity: 1,
            cargaMax: 1,
            totalBatCharge: 1,
            chargingTime: 1,
            activeTruck: true
        };

        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.true;
    });

    it('should not create a new Truck with invalid truckPlate', () => {
        const truckDTO = {
            domainId: 'domainId',
            caractTruck: 'caractTruck',
            truckPlate: 'ZzZzZzZzZzZ',
            tare: 1,
            weightCapacity: 1,
            cargaMax: 1,
            totalBatCharge: 1,
            chargingTime: 1,
            activeTruck: true
        };

        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.false;
    });

    it('should not create a new Truck with invalid tare', () => {
       const truckDTO = {
            domainId: 'domainId',
            caractTruck: 'caractTruck',
            truckPlate: 'AA-56-BB',
            tare: -1,
            weightCapacity: 1,
            cargaMax: 1,
            totalBatCharge: 1,
            chargingTime: 1,
            activeTruck: true
        };

        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.false;
    });

    it('should not create a new Truck with invalid weightCapacity', () => {
        const truckDTO = {
            domainId: 'domainId',
            caractTruck: 'caractTruck',
            truckPlate: 'AA-56-BB',
            tare: 1,
            weightCapacity: -1,
            cargaMax: 1,
            totalBatCharge: 1,
            chargingTime: 1,
            activeTruck: true
        };

        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.false;
    });

    it('should not create a new Truck with invalid cargaMax', () => {
        const truckDTO = {
            domainId: 'domainId',
            caractTruck: 'caractTruck',
            truckPlate: 'AA-56-BB',
            tare: 1,
            weightCapacity: 1,
            cargaMax: -1,
            totalBatCharge: 1,
            chargingTime: 1,
            activeTruck: true
        };

        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.false;
    });

    it('should not create a new Truck with invalid totalBatCharge', () => {
        const truckDTO = {
            domainId: 'domainId',
            caractTruck: 'caractTruck',
            truckPlate: 'AA-56-BB',
            tare: 1,
            weightCapacity: 1,
            cargaMax: 1,
            totalBatCharge: -1,
            chargingTime: 1,
            activeTruck: true
        };

        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.false;
    });

    it('should not create a new Truck with invalid chargingTime', () => {
        const truckDTO = {
            domainId: 'domainId',
            caractTruck: 'caractTruck',
            truckPlate: 'AA-56-BB',
            tare: 1,
            weightCapacity: 1,
            cargaMax: 1,
            totalBatCharge: 1,
            chargingTime: -1,
            activeTruck: true
        };

        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.false;
    });

    it('should get tare from Truck', () => {
        const truckDTO = {
            domainId: 'domainId',
            caractTruck: 'caractTruck',
            truckPlate: 'AA-56-BB',
            tare: 1,
            weightCapacity: 1,
            cargaMax: 1,
            totalBatCharge: 1,
            chargingTime: 1,
            activeTruck: true
        };
        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.true;
        expect(truck.getValue().tare.props.value).to.be.equal(1);
    });

    it('should get weightCapacity from Truck', () => {
        const truckDTO = {
            domainId: 'domainId',
            caractTruck: 'caractTruck',
            truckPlate: 'AA-56-BB',
            tare: 1,
            weightCapacity: 1,
            cargaMax: 1,
            totalBatCharge: 1,
            chargingTime: 1,
            activeTruck: true
        };

        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.true;
        expect(truck.getValue().weightCapacity.props.value).to.be.equal(1);
    });

    it('should get cargaMax from Truck', () => {
        const truckDTO = {
            domainId: 'domainId',
            caractTruck: 'caractTruck',
            truckPlate: 'AA-56-BB',
            tare: 1,
            weightCapacity: 1,
            cargaMax: 1,
            totalBatCharge: 1,
            chargingTime: 1,
            activeTruck: true
        };

        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.true;
        expect(truck.getValue().cargaMax.props.value).to.be.equal(1);
    });

    it('should get totalBatCharge from Truck', () => {
        const truckDTO = {
            domainId: 'domainId',
            caractTruck: 'caractTruck',
            truckPlate: 'AA-56-BB',
            tare: 1,
            weightCapacity: 1,
            cargaMax: 1,
            totalBatCharge: 1,
            chargingTime: 1,
            activeTruck: true
        };

        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.true;
        expect(truck.getValue().totalBatCharge.props.value).to.be.equal(1);
    });

    it('should get chargingTime from Truck', () => {
        const truckDTO = {
            domainId: 'domainId',
            caractTruck: 'caractTruck',
            truckPlate: 'AA-56-BB',
            tare: 1,
            weightCapacity: 1,
            cargaMax: 1,
            totalBatCharge: 1,
            chargingTime: 1,
            activeTruck: true
        };

        const truck = Truck.create(truckDTO);

        expect(truck.isSuccess).to.be.true;
        expect(truck.getValue().chargingTime.props.value).to.be.equal(1);
    });

    

});