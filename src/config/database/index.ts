import { createConnection } from "typeorm";

export const getDBConnection = async () => {
  const connection = await createConnection();

  if (!connection.isConnected) await connection.connect();
  return connection;
}