import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Import components
import Router from './routes/route.js';

// Load environment variables from .env file
dotenv.config();

// Create an instance of the express application
const app = express();


// Enable CORS
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json({ extended: true }));

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Mount the router at the root path
app.use('/', Router);

// Retrieve environment variables
const PORT = process.env.PORT || 8001;
const URL = process.env.DB_URL;


// Connect to the database (async function)
const connectToDatabase = async () => {
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    
  } catch (error) {
   
  }
};

// Export the app instance
export default app;

// Start the server and listen on the specified port
const server = app.listen(PORT, async () => {
  await connectToDatabase(); // Wait for the database connection before listening
});

// Expose the server object to the global scope
global.server = server;

// Test the code
describe('Express Server', () => {
  // Before running the tests, connect to the database
  beforeAll(async () => {
    await connectToDatabase();
  });

  it('should start the server and listen on the specified port', (done) => {
    server.on('listening', () => {
      done();
    });
  });

  // After all tests are done, close the server and disconnect from the database
  afterAll((done) => {
    server.close(() => {
      mongoose.disconnect(done);
    });
  });
});
