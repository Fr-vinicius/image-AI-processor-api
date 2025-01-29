import { DataSource } from "typeorm";
import Measure from "../models/Measures";

const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "your-username",
    password: "your-password",
    database: "master",
    synchronize: false,
    logging: false,
    entities: [Measure],
    migrations: ["./src/database/migrations/*.ts"],
    subscribers: [],
    options: {
        trustServerCertificate: true
    }
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

export default AppDataSource;
