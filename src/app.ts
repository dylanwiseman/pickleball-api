import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import firebaseAdmin from 'firebase-admin';
import cors from 'cors';

import express, { RequestHandler } from 'express';
import http from 'http';
import { createGQLSchema } from './graphql/schema';
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import { checkAuth } from './middlewares/auth';
// import https from 'https';
if (!process.env.FIREBASE_CONFIG_BASE64) {
    throw new Error('Firebase config must be defined');
}
const credentialString = Buffer.from(
    process.env.FIREBASE_CONFIG_BASE64,
    'base64'
).toString('ascii');
const credentialObject = JSON.parse(credentialString);
const credential = firebaseAdmin.credential.cert(credentialObject);
firebaseAdmin.initializeApp({ credential });

const app = express();
const httpServer = http.createServer(app);
const schema = createGQLSchema();

const startApolloGraphQLServer = async (_app: any) => {
    const config: ApolloServerExpressConfig = {
        schema,
        context: ({ req }) => ({ req }),
    };
    const apolloServer = new ApolloServer(config);
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app: _app,
        path: '/graphql',
        cors: { credentials: true, origin: true },
    });
};

app.use(express.json() as RequestHandler);
if (process.env.NODE_ENV === 'development') {
    app.use(cors());
}
app.use(checkAuth);
app.use('/health', (req, res) => {
    res.send('health check');
});

export { app, httpServer, startApolloGraphQLServer };
