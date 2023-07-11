const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

console.log(MongoClient);
console.log(uri);

const client = new MongoClient(uri);
console.log(client);

const connectToDb = async () => {
  try {
    await client.connect();
    console.log(`Connected to database successfully`);
    listDatabases();
  } catch (error) {
    console.log(`Connection to database failed : ${error}`);
  } finally {
    await client.close();
  }
};

const listDatabases = async () => {
  const dbsList = await client.db().admin().listDatabases();
  console.table(dbsList.databases);
  dbsList.databases.forEach((database) => {
    console.log(`Database: ${database.name}`);
  });
};

connectToDb();

// an application should use a single client to connect to database for every request
// as creating a client is resource intensive
// creating a new one will affect the app performance
