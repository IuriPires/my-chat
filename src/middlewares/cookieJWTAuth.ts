import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

type RequestWithUser = Request & { user: { id: string } };

function cookieJWTAuth(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");

    req.user = decoded as { id: string };

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send("Unauthorized");
  }
}

export default cookieJWTAuth;
