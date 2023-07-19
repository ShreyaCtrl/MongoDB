const { MongoClient } = require("mongodb");
require("dotenv").config();

// console.log(process.env.MONGODB_URI);
const client = new MongoClient(process.env.MONGODB_URI);

const db = "sample_analytics";
const collection = "accounts";
const filter = {
  limit: {
    $lt: 10000,
  },
};

const connectToDatabase = async () => {
  try {
    await client.connect();
    const accounts = client.db(db).collection(collection);
    // console.log(accounts);
    // how to add projection ?
    const result = await accounts.find(filter, {
      projection: { _id: 0, account_id: 1 },
    });
    // console.log(result);
    let count = await accounts.countDocuments(filter);
    console.log(`Count of documents queried : ${count}`);
    result.forEach((doc) => console.log(doc));
  } catch (err) {
    console.log(`Error querying document : ${err}`);
  }
};

connectToDatabase();
