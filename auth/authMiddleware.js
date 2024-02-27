const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    // remove bearer keyword from token
    const tokenString = token.split(" ");
    if (tokenString.length === 2) {
      token = tokenString[1];
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
