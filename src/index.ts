import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { startApolloGraphQLServer, app, httpServer } from './app';

//Import the mongoose module
const mongoose = require('mongoose');
const port = 4000;

const startServer = async () => {
    //Set up default mongoose connection
    const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    //Get the default connection
    const db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.on('open', () => console.log('db connected'));

    await startApolloGraphQLServer(app);
    httpServer.listen(port, () => {
        console.log(`graphql server ready at http://localhost:${port}/graphql`);
    });
};
startServer();
