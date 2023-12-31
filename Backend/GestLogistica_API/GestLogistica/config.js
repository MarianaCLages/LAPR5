import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  // databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/test",
  databaseURL:
    process.env.MONGODB_URI ||
    "mongodb://mongoadmin:9791c79b03b4dd163b179a30@vsgate-s1.dei.isep.ipp.pt:10667/?authMechanism=DEFAULT",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "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",

  jwtTokenClient:
    process.env.JWT_TOKEN_CLIENT ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ik1hcmlhbmEgTGFnZXMiLCJlbWFpbCI6Im1hcmlhbmFsYWdlczIwMDJAZ21haWwuY29tIiwibmJmIjoxNjcyNjg2OTg3LCJleHAiOjE2NzMyOTE3ODcsImlhdCI6MTY3MjY4Njk4N30.bJN6YhU-Lr2BN7_t9cpzJKjmPZ4lM14E6fLhFWrsZFY",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "info",
  },

  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController",
    },
    trip: {
      name: "TripController",
      path: "../controllers/tripController",
    },
    path: {
      name: "PathController",
      path: "../controllers/pathController",
    },
    truck: {
      name: "TruckController",
      path: "../controllers/truckController",
    },
    packaging: {
      name: "PackagingController",
      path: "../controllers/packagingController",
    },
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo",
    },
    trip: {
      name: "TripRepo",
      path: "../repos/tripRepo",
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo",
    },
    path: {
      name: "PathRepo",
      path: "../repos/pathRepo",
    },
    truck: {
      name: "TruckRepo",
      path: "../repos/truckRepo",
    },
    warehouse: {
      name: "WarehouseRepo",
      path: "../repos/WarehouseAPIGetter",
    },
    packaging: {
      name: "PackagingRepo",
      path: "../repos/packagingRepo",
    },
    order: {
      name: "OrderAPIGetter",
      path: "../repos/OrderAPIGetter",
    },
    auth: {
      name: "AuthRepo",
      path: "../repos/AuthRepo",
    },
  },

  services: {
    bestpath: {
      name: "GetBestPathService",
      path: "../services/getBestPathService",
    },
    role: {
      name: "RoleService",
      path: "../services/roleService",
    },
    trip: {
      name: "TripService",
      path: "../services/tripServices",
    },
    path: {
      name: "PathService",
      path: "../services/pathService",
    },
    truck: {
      name: "TruckService",
      path: "../services/truckService",
    },
    packaging: {
      name: "PackagingService",
      path: "../services/packagingService",
    },
    auth: {
      name: "VerifyAuthGoogleService",
      path: "../services/verifyAuthGoogleService",
    },
  },

  warehouseAPIAdress: "https://localhost:5001/api/warehouse/search/",
  orderAPIAdress: "https://localhost:5001/api/order/search?",
  orderAPIAdressDate: "https://localhost:5001/api/Order/byDate?data=",
  armazenIDNumberOfCharacters: 3,
  errorNotFoundWarehouse: "A warehouse with that ID was not found!",
  errorNotFoundOrder: "Não foi encontrado nenhuma order!",
  userRepoAPIAddress: "https://localhost:5001/api/User/byEmail?email=",
  planingAlgorithm: "AL1", //AL1 is the mock algorithm AL2 is the actual algorithm
};
