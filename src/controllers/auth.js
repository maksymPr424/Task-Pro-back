
import createHttpError from "http-errors";
import { ONE_DAY } from "../constants/auth.js";
import { SessionCollection } from "../db/models/session.js";
import { createSession, getCurrentUser, loginUser, logoutUser, refreshUsersSession, registerUser } from "../services/auth.js";

const createSessionData=async(userId)=>{
    const sessionInf=createSession();
    const session = await SessionCollection.create({
        userId,
        ...sessionInf,
    });
    return session;
};

const sessionCookies=(res,session)=>{
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
};


export const registerUserController=async(req,res)=>{
    if (!req.body || Object.keys(req.body).length === 0) {
        throw createHttpError(400, 'Request body is missing');
    }
    const user=await registerUser(req.body);
    const session = await createSessionData(user._id);
    sessionCookies(res,session);

    res.status(201).json({...user});


};
export const loginUserController=async(req,res)=>{
    if (!req.body || Object.keys(req.body).length === 0) {
        throw createHttpError(400, 'Request body is missing');
    }
   const session= await loginUser(req.body);
   sessionCookies(res,session);
   res.json({
   accessToken: session.accessToken,
    });
};

export const logoutUserController=async(req,res)=>{
    const { sessionId } = req.cookies;
    if (!sessionId) {
        throw createHttpError(400, 'Session ID is missing in cookies');
      }
if(sessionId){
    await logoutUser(sessionId);
}
res.clearCookie('sessionId');
res.clearCookie('refreshToken');
res.status(204).send();
};


export const refreshUserSessionController=async(req,res)=>{
    const { sessionId, refreshToken } = req.cookies;
    if (!sessionId || !refreshToken) {
        throw createHttpError(400, 'Session ID or refresh token is missing in cookies');
    }
    const session = await refreshUsersSession({
        sessionId,
        refreshToken,
    });
    sessionCookies(res,session);
    res.json({accessToken:session.accessToken});
};

export const currentUserController = async (req, res) => {
    const { authorization } = req.headers;
    const accessToken = authorization ? authorization.split(" ")[1] : null;

    const data = await getCurrentUser(accessToken);

    res.json({...data});
};
