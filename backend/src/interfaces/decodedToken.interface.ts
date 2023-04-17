import { JwtPayload } from "jsonwebtoken";

export default interface DecodedToken extends JwtPayload {
  userId: number;
}
