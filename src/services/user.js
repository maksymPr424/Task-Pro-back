import { User } from '../db/models/User.js';
export const findUser = (filter) => User.findOne(filter);

export const updateUser = (filter, userData, options = {}) =>
  User.findOneAndUpdate(filter, userData, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
