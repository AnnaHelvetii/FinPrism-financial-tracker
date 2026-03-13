import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	const token = authHeader.split(" ")[1];

	const secret = process.env.JWT_SECRET;
	if (!secret) return res.status(500).json({ error: "JWT secret not set" });

	try {
		const payload = jwt.verify(token, secret);
		req.user = payload as any;
		next();
	} catch (err) {
		return res.status(401).json({ error: "Invalid token" });
	}
};