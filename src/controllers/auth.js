import createHttpError from 'http-errors';
import { ONE_DAY } from '../constants/auth.js';
import { SessionCollection } from '../db/models/session.js';
import {
  createSession,
  findSession,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
} from '../services/auth.js';
import { env } from '../utils/env.js';
const isProduction = env('IS_PRODUCTION', 'false') === 'true';
const createSessionData = async (userId) => {
  const sessionInf = createSession();
  const session = await SessionCollection.create({
    userId,
    ...sessionInf,
  });
  return session;
};

const sessionCookies = (res, session) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
  };

  res.cookie('refreshToken', session.refreshToken, cookieOptions);
  res.cookie('sessionId', session._id, cookieOptions);
};

export const registerUserController = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw createHttpError(400, 'Request body is missing');
  }
  const user = await registerUser(req.body);
  const session = await createSessionData(user._id);
  sessionCookies(res, session);

  res.status(201).json({ ...user });
};
export const loginUserController = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw createHttpError(400, 'Request body is missing');
  }
  const session = await loginUser(req.body);
  sessionCookies(res, session);
  res.json({
    accessToken: session.accessToken,
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;
  const { authorization } = req.headers;
  const accessToken = authorization ? authorization.split(' ')[1] : null;

  if (sessionId) {
    await logoutUser(sessionId);
  } else if (accessToken) {
    const activeSession = await findSession({ accessToken });

    if (!activeSession) {
      return res
        .status(400)
        .json({ message: 'No active session found with provided token' });
    }
    await logoutUser(activeSession._id);
  } else {
    return res.status(400).json({
      message:
        'Session ID is missing in cookies or access token is missing in headers',
    });
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  if (!sessionId || !refreshToken) {
    throw createHttpError(
      400,
      'Session ID or refresh token is missing in cookies',
    );
  }
  const session = await refreshUsersSession({
    sessionId,
    refreshToken,
  });
  sessionCookies(res, session);
  res.json({ accessToken: session.accessToken });
};

export const currentUserController = async (req, res) => {
  const { authorization } = req.headers;
  const accessToken = authorization ? authorization.split(' ')[1] : null;

  const data = await getCurrentUser(accessToken);

  res.json({ ...data });
};
