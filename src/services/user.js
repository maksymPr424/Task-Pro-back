import { UserCollection } from '../db/models/UserCollection.js';
export const findUser = (filter) => UserCollection.findOne(filter);

export const updateUser = (filter, userData, options = {}) =>
  UserCollection.findOneAndUpdate(filter, userData, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
