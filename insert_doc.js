const mongodb = require("mongodb");
const uri = require("./atlas_uri");

const MongoClient = mongodb.MongoClient;
const client = new MongoClient(uri);
const db = "sample_analytics";
const collection = "accounts";

// console.log(MongoClient);
// console.log(client);

const sampleDoc = [
  {
    limit: 10000,
    account_id: 1,
    products: ["InvestmentStock", "Commodity", "Brokerage"],
  },
  {
    limit: 10000,
    account_id: 2,
    products: ["InvestmentStock", "Commodity"],
  },
];

const insertDocument = async () => {
  try {
    await client.connect();
    const accounts = client.db(db).collection(collection);
    // console.log(analytics);
    // const result = await accounts.insertOne(sampleDoc);
    const result = await accounts.insertMany(sampleDoc);
    console.log(`The number of document inserted : ${result.insertedCount}`);
    console.log(result);
  } catch (err) {
    console.log(`Error inserting document : ${err}`);
  } finally {
    // gives an error in code when uncommented
    // await client.close();
  }
};

// insertDocument();
