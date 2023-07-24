const { MongoClient } = require("mongodb");
require("dotenv").config();

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

const aggregation = async () => {
  try {
    await connectToDb();
    const accounts = client.db(db).collection(collection);
    const pipeline = [
      {
        $match: {
          limit: { $gte: 1000 },
        },
      },
      {
        $group: {
          _id: "$products",
          total: { $sum: "$limit" },
          average: { $avg: "$limit" },
        },
      },
    ];
      const result = await accounts.aggregate(pipeline);
    //   console.log(result);
    // for await (const doc of result) {
    //   console.log(doc);
    // }
    await result.forEach((doc) => console.log(doc))
  } catch (error) {
    console.error(error);
  }
}
// console.log('sjlafkj');
aggregation();