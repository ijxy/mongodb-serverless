[npm-mongodb]: https://www.npmjs.com/package/mongodb
[npm]: https://www.npmjs.com/package/mongodb-serverless

[![npm verison](https://img.shields.io/npm/v/mongodb-serverless)][npm]
[![npm bundle size](https://img.shields.io/bundlephobia/min/mongodb-serverless)][npm]
[![npm downloads](https://img.shields.io/npm/dm/mongodb-serverless)][npm]

# mongodb-serverless

Create [MongoDB driver][npm-mongodb] instances optimized for serverless environments.

Instances are cached between requests to minimize the number of connections and improve performance.

## Installation

```
npm install mongodb-serverless
```

## Usage

```ts
import { getMongoClient } from "mongodb-serverless";

const client = getMongoClient(process.env.MONGO_URI, { appName: "app" });
```
