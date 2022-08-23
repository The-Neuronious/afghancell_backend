import jwt from "jsonwebtoken";

interface TokenInterface {
  id: string;
}

// Generate Access Token
export const generateAccessToken = (id: any): string => {
  return jwt.sign(
    { id } as TokenInterface,
    `${process.env.ACCESS_TOKEN_SECRET}`,
    {
      expiresIn: "30d",
    }
  );
};

// Decode ID and role from token
export const decodeToken = (token: string): string => {
  const decoded = jwt.verify(
    token,
    `${process.env.ACCESS_TOKEN_SECRET}`
  ) as TokenInterface;
  const id: string = decoded.id;
  return id;
};
