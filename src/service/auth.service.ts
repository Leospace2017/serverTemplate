import { signJwt, verifyJwt } from "../helpers/utils/jwt.utils";
import SessionModel from "../models/session.model";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken"
import "dotenv/config"
export async function createSession(userId: string | undefined, userAgent: string | undefined) {
    const session = await SessionModel.create({ user: userId, userAgent });
  
    return session.toJSON();
  }



export async function findSessions(query:Object) {
    return SessionModel.find(query).lean();
  }


  export async function updateSession(
    query: Object,
    update: Object
  ) {
    return SessionModel.updateOne(query, update);
  }
  

  export async function reSignToken(refreshToken :string, keyName: string) {
    const  {decoded}   = verifyJwt(refreshToken, keyName);
    console.log("resigntokem",decoded)
    if (!decoded || !decoded.UserInfo.session) return false;
  
    const session = await SessionModel.findById(decoded.UserInfo.session);
  
    console.log("resigndata",session)
    if (!session || !session.valid) return false;
  
    const user = await User.findOne({ _id: session.user });
  
    console.log("resignuser",user)
    if (!user) return false;
  

  const newAccessToken = jwt.sign(
    {
      UserInfo: {
        id: user?._id,
        email: user?.email,
        role: user?.role,
        session: session._id
      },
    },
    process.env.ACCESS_TOKEN_SECRET || "",
    { expiresIn: 60 }
  );
  
    return newAccessToken;
  }
  