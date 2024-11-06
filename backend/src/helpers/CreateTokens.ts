import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import { Admin } from "@prisma/client";

export const createAccessToken = (user: Admin): string => {
  const { secret, expiresIn } = authConfig;

  return sign(
    { usarname: user.name, role: user.role, id: user.id },
    secret,
    {
      expiresIn
    }
  );
};

export const createRefreshToken = (user: Admin): string => {
  const { refreshSecret, refreshExpiresIn } = authConfig;

  return sign({ id: user.id, tokenVersion: user.tokenVersion }, refreshSecret, {
    expiresIn: refreshExpiresIn
  });
};
