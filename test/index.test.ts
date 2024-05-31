import assert from "node:assert";
import test from "node:test";

import { MongoMemoryServer } from "mongodb-memory-server";

import { getMongoClient } from "../src";

test("getMongoClient", async (t) => {
  const mongo = await MongoMemoryServer.create();
  try {
    await t.test("should return the same instance when called with the same args", () => {
      const client1 = getMongoClient(mongo.getUri("db"));
      const client2 = getMongoClient(mongo.getUri("db"));
      assert.deepStrictEqual(client2, client1);

      const client3 = getMongoClient(mongo.getUri("db"), { appName: "test", maxConnecting: 2 });
      const client4 = getMongoClient(mongo.getUri("db"), { maxConnecting: 2, appName: "test" });
      assert.deepStrictEqual(client4, client3);
    });

    await t.test("should return different instances when called with different urls", () => {
      const client1 = getMongoClient(mongo.getUri("db1"));
      const client2 = getMongoClient(mongo.getUri("db2"));
      assert.notDeepStrictEqual(client2, client1);
    });

    await t.test("should return different instances when called with different options", () => {
      const client1 = getMongoClient(mongo.getUri("db"), { appName: "app1" });
      const client2 = getMongoClient(mongo.getUri("db"), { appName: "app2" });
      assert.notDeepStrictEqual(client2, client1);
    });
  } finally {
    await mongo.stop();
  }
});
