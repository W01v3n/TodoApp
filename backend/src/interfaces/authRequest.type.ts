import { Request } from "express";

type AuthRequest = Request & { userId?: number };

export default AuthRequest;
