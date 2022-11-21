import { UserModel } from '../../../../models';
import mongoose from 'mongoose';

import { GenerateResolverType } from 'graphql-compose-mongoose';
import { ObjectTypeComposer } from 'graphql-compose';
import { ValidationError, AuthenticationError } from 'apollo-server-express';

function returnResolver(
    TC: ObjectTypeComposer<mongoose.Document<any, {}>, any> & {
        mongooseResolvers: GenerateResolverType<
            mongoose.Document<any, {}>,
            any
        >;
    }
) {
    const resolver = {
        name: 'GetSelf',
        type: TC.mongooseResolvers.findOne(),
        args: {},
        description: 'Get user info for logged-in user',
        resolve: async ({ args, context }: any) => {
            const loggedInUser = context.req?.user;
            console.log('user: ', loggedInUser)
            if (!loggedInUser) {
                throw new AuthenticationError('No user');
            }

            const user = await UserModel.findById(loggedInUser._id);
            return user;
        },
    };
    return resolver;
}

export default returnResolver;
