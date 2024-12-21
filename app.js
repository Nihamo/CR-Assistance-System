const { MongoClient } = require('mongodb');

// Replace the <username>, <password>, and <dbname> with your actual MongoDB Atlas credentials
const uri = "mongodb+srv://rifahb03:y12FgL6D3BQJBhse@hackathon.tvx7w.mongodb.net/?retryWrites=true&w=majority&appName=Hackathon";

// Create a new MongoClient with the connection string and options
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // Ensure SSL is enabled
  tls: true  // Try using TLS (sometimes needed for newer MongoDB drivers)
});

// Function to connect to MongoDB and perform a basic operation
async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    console.log("Connected to MongoDB Atlas!");

    // Choose a database (replace <dbname> with the actual name)
    const database = client.db('<dbname>');
    const collection = database.collection('test'); // Replace 'test' with your collection name

    // Example operation: Insert a document
    const result = await collection.insertOne({ name: 'test' });
    console.log('Document inserted:', result);

    // Example operation: Find all documents
    const documents = await collection.find().toArray();
    console.log('Documents found:', documents);

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    // Close the connection after use
    await client.close();
  }
}

// Call the run function
run().catch(console.error);
