require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);
const db = "sample_analytics";
const collection = "accounts";

const connectToDb = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
};

const deleteDoc = async () => {
  try {
    await connectToDb();
    const filter = {
      account_id: {
        $in: [1, 2],
      },
    };
    const accounts = client.db(db).collection(collection);
    // the following will delete only 1 document from the collection which matches the result
    const result = await accounts.deleteOne(filter);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

deleteDoc();