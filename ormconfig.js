module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: ["./src/modules/**/domain/entity/*{.ts,.js}"],
  migrations: ["./src/shared/infra/repositories/migrations/*{.ts,.js}"],
  cli: {
    migrationsDir: "./src/shared/infra/repositories/migrations/",
  },
  synchronize: true,
};
