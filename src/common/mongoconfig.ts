import mongoose from 'mongoose';

export class ConnectDb {
  private static instance: ConnectDb;

  private constructor() {}

  public static getInstance(): ConnectDb {
    if (!ConnectDb.instance) {
      ConnectDb.instance = new ConnectDb();
    }
    return ConnectDb.instance;
  }

  public async connect(): Promise<void> {
    const { DB_USER, DB_PASSWORD } = process.env;
    const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.roe5gio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    if (!mongoose.connection.readyState) {
      await mongoose.connect(dbURL);
    }
  }
}
