import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/models';
import { AuthenticationError } from 'apollo-server-express';
import firebaseAdmin from 'firebase-admin';

export async function checkAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const accessToken =
            (req.headers['pickleball-access-token'] as string) || '';
        if (accessToken === '') return next();
        const auth = firebaseAdmin.auth();
        const decodedToken = await auth.verifyIdToken(accessToken);
        const userAuthId = decodedToken.uid;
        const foundUser = await UserModel.findOne({
            authId: userAuthId,
        }).lean();

        if (!foundUser) {
            return res.status(404).json({
                error: new AuthenticationError(
                    'Bad Access Token: user doesnt exist'
                ),
            });
        }

        // req.user = foundUser;
        next();
    } catch (error: any) {
        console.error('access token error: ', error);
        return res.status(401).json({
            error: new AuthenticationError(
                'Bad Access Token: bad token',
                error
            ),
        });
    }
}
