import { Types } from "mongoose";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { SECRET } from "./env";

export interface IUserToken
  extends Omit<
    User,
    | "password"
    | "activationCode"
    | "isActive"
    | "email"
    | "fullName"
    | "profilePicture"
    | "username"
  > {
  id?: Types.ObjectId;
}

export const generateToken = (user: IUserToken): string => {
  const token = jwt.sign(user, SECRET, {
    expiresIn: "1h",
  });
  return token;
};
export const getUserData = (token: string) => {
  const user = jwt.verify(token, SECRET) as IUserToken;
  return user;
};

// Fungsi untuk memverifikasi token JWT
export const verifyToken = (req: any) => {
  const token = req.headers.authorization?.split(" ")[1]; // Mengambil token dari header Authorization
  if (!token) {
    throw new Error("Token tidak ditemukan");
  }
  try {
    // Verifikasi token dan ambil data pengguna
    const decoded = jwt.verify(token, SECRET);
    return decoded;  // Mengembalikan payload token (data pengguna)
  } catch (error) {
    throw new Error("Token tidak valid");
  }
};