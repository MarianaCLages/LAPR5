import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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
    databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:9791c79b03b4dd163b179a30@vsgate-s1.dei.isep.ipp.pt:10667/?authMechanism=DEFAULT",

    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'info',
    },

    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },

    controllers: {
        role: {
            name: "RoleController",
            path: "../controllers/roleController"
        },
        caminho: {
            name: "CaminhoController",
            path: "../controllers/caminhoController"
        },
        camiao: {
            name: "CamiaoController",
            path: "../controllers/camiaoController"
        },
    },

    repos: {
        role: {
            name: "RoleRepo",
            path: "../repos/roleRepo"
        },
        user: {
            name: "UserRepo",
            path: "../repos/userRepo"
        },
        caminho: {
            name: "CaminhoRepo",
            path: "../repos/caminhoRepo"
        },
        camiao: {
            name: "CamiaoRepo",
            path: "../repos/camiaoRepo"
        },
        armazem: {
            name: "ArmazemRepo",
            path: "../repos/AmazemAPIGetter"
        }
    },

    services: {
        role: {
            name: "RoleService",
            path: "../services/roleService"
        },
        caminho: {
            name: "CaminhoService",
            path: "../services/caminhoService"
        },
        camiao: {
            name: "CamiaoService",
            path: "../services/camiaoService"
        },
    },

    amazemAPIAdress: "https://localhost:5001/api/armazem/search/",
    armazenIDNumberOfCharacters: 3,
    errorNotFoundArmazem: "Não foi encontrado um armazem com esse ID!"
};
