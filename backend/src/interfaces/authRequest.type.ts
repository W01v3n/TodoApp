import { Request } from "express";

type AuthRequest = Request & { userId?: string };

export default AuthRequest;
