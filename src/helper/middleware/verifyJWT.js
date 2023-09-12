import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  console.log(authHeader);
  if (!authHeader?.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    const success = decoded.UserInfo.email;
    console.log(success);
    next();
  });
};
