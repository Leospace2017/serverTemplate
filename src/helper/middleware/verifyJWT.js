import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const token = req.cookies.accessJwt;

  // const authHeader = req.headers["authorization"];

  // if (!authHeader?.startsWith("Bearer")) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  // const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(403);
  }
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("hi" ,decoded);

    if (!decoded) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.email = decoded.UserInfo.email;
    req.role = decoded.UserInfo.role;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
