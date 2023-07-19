require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);
const db = "sample_analytics";
const collection = "accounts";

const checkUpdate = async (accounts) => {
  const result = await accounts.find({ account_id: 1 });
  // console.log(result);
  return result;
};

const connectToDatabase = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
};

const updateDoc = async () => {
  try {
    await connectToDatabase();
    const accounts = client.db(db).collection(collection);
    const update = { $inc: { limit: 100 } };
    // let result = await accounts.updateOne({ account_id: 1 }, update);
    let updateDocs = {
      account_id: {
        $in: [1, 2],
      },
    };
    let result = await accounts.updateMany(updateDocs, {
      $set: { limit: 10000 },
    });
    console.log(result);
    result = accounts.find({ account_id: 1 });
    console.table(result);
  } catch (error) {
    console.error(error);
  }
};

updateDoc();
