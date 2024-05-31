import { MongoClient, MongoClientOptions } from "mongodb";

export const getMongoClient = (() => {
  const pool = new Map<string, MongoClient>();
  return (url: string, options?: MongoClientOptions) => {
    const clientOptions = getClientOptions(options);
    const key = constructPoolKey(url, clientOptions);
    let client = pool.get(key);
    if (!client) {
      client = new MongoClient(url, clientOptions);
      pool.set(key, client);
    }
    return client;
  };
})();

function getClientOptions(options?: MongoClientOptions): MongoClientOptions {
  return { maxPoolSize: 1, maxConnecting: 1, ...options };
}

function constructPoolKey(url: string, options: MongoClientOptions): string {
  return JSON.stringify(Object.fromEntries(Object.entries({ ...options, url }).sort()));
}
