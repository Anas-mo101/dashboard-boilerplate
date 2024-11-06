import { verify } from "jsonwebtoken";
import { Response as Res } from "express";

import AppError from "../../errors/AppError";
import ShowUserService from "../AdminServices/ShowAdminService";
import authConfig from "../../config/auth";
import {
  createAccessToken,
  createRefreshToken
} from "../../helpers/CreateTokens";
import { Admin } from "@prisma/client";

interface RefreshTokenPayload {
  id: string;
  tokenVersion: number;
}

interface Response {
  admin: Admin;
  newToken: string;
  refreshToken: string;
}

export const RefreshTokenService = async (
  res: Res,
  token: string
): Promise<Response> => {
  try {
    const decoded = verify(token, authConfig.refreshSecret);
    const { id, tokenVersion } = decoded as RefreshTokenPayload;

    const admin = await ShowUserService( parseInt(id) );

    if (admin.tokenVersion !== tokenVersion) {
      res.clearCookie("jrt");
      throw new AppError("ERR_SESSION_EXPIRED", 401);
    }

    const newToken = createAccessToken(admin);
    const refreshToken = createRefreshToken(admin);

    return { admin, newToken, refreshToken };
  } catch (err) {
    res.clearCookie("jrt");
    throw new AppError("ERR_SESSION_EXPIRED", 401);
  }
};
