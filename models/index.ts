import { UserModel } from './models';
export { UserModel };

import { User } from './types';

interface UserMod extends Omit<User, '_id'> {
    _id?: string;
}
