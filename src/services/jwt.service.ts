import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en el archivo .env");
}

export interface Payload {
  id: string;
  name: string;
  nick: string;
  email: string;
  role: "user" | "admin";
  image?: string;
}

export const createToken = (user: Payload): string => {
  const payload: Payload = {
    id: user.id,
    name: user.name,
    nick: user.nick,
    email: user.email,
    role: user.role,
    image: user.image,
  };

  return jsonwebtoken.sign(payload, JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const verifyToken = (token: string): Payload | null => {
  try {
    return jsonwebtoken.verify(token, JWT_SECRET) as Payload;
  } catch (error) {
    console.error("Token inválido o expirado:", error);
    return null;
  }
};
