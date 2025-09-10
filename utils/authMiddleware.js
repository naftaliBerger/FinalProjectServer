import jwt from "jsonwebtoken";

//--------------------------------------------
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ error: "Missing token" });
  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
}
//--------------------------------------------
export function requireUser(req, res, next) {
  if (!req.user || (req.user.role !== "user" && req.user.role !== "admin")) {
    return res.status(403).json({ error: "User access only" });
  }
  next();
}
//--------------------------------------------
export function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
}

