import { ObjectTypeComposer, schemaComposer } from 'graphql-compose';
import mongoose from 'mongoose';
import {
    composeMongoose,
    GenerateResolverType,
} from 'graphql-compose-mongoose';
import { UserModel } from '../models/models';
import * as userResolvers from './resolvers/users';

const createGQLSchema = () => {
    const UserTC = composeMongoose(UserModel, {});
    const addUserResolvers = (
        TC: ObjectTypeComposer<mongoose.Document<any, {}>, any> & {
            mongooseResolvers: GenerateResolverType<
                mongoose.Document<any, {}>,
                any
            >;
        }
    ) => {
        TC.addResolver(userResolvers.getSelf(TC));
        const query: { [name: string]: any } = {};
        query.GetSelf = TC.getResolver('GetSelf');
        schemaComposer.Query.addFields(query);
    };
    addUserResolvers(UserTC);
    return schemaComposer.buildSchema();
};

export { createGQLSchema };
