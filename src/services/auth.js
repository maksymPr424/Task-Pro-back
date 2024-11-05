import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/UserCollection.js';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/auth.js';

const findByEmail = async (email) => {
  const user = await UserCollection.findOne({ email });
  if (!user || !user._id) {
    throw createHttpError(404, 'User not found');
  }
  return user;
};

export const registerUser = async ({ email, password, name }) => {
  const user = await UserCollection.findOne({ email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(password, 10);
  await UserCollection.create({
    name,
    email,
    password: encryptedPassword,
  });
  return { name, email };
};

export const loginUser = async ({ email, password }) => {
  const user = await findByEmail(email);

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }
  await SessionCollection.deleteMany({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const { _id: userId } = user;

  return await SessionCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session is not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const getCurrentUser = async (accessToken) => {
  if (!accessToken) {
    throw createHttpError(401, 'Authorization token is missing');
  }

  const session = await SessionCollection.findOne({ accessToken });
  if (!session) {
    throw createHttpError(401, 'Missing header with authorization token');
  }

  const user = await UserCollection.findById(session.userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return {
    name: user.name,
    email: user.email,
  };
};
