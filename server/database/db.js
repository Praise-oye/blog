// Import the mongoose library to connect to MongoDB.
import mongoose from 'mongoose';

// Define a function to establish the database connection.
const Connection = async () => {
    // MongoDB connection URL with the username, password, and database name.
    const URL = `mongodb+srv://oyeboadepraise:Oyeboade@crud.rreeeqs.mongodb.net/blog?retryWrites=true&w=majority`;

    try {
        // Attempt to connect to the MongoDB database using the provided URL and options.
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        // Handle any errors that occur during the connection process.
        console.log('Error while connecting to the database ', error);
    }
};

// Export the Connection function to be used in other parts of the application.
export default Connection;
