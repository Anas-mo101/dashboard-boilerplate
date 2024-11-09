import { Request, Response } from "express";
import AppError from "../errors/AppError";

import AuthAdminService from "../services/AdminServices/AuthAdminService";
import { RefreshTokenService } from "../services/AuthServices/RefreshTokenService";
import { SendRefreshToken } from "../helpers/SendRefreshToken";

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const { token, admin, refreshToken } = await AuthAdminService({
    email,
    password
  });

  SendRefreshToken(res, refreshToken);

  return res.status(200).json({
    token,
    admin
  });
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: string = req.cookies.jrt;

  if (!token) {
    throw new AppError("ERR_SESSION_EXPIRED", 401);
  }

  const { admin, newToken, refreshToken } = await RefreshTokenService(
    res,
    token
  );

  //@ts-ignore
  delete admin.password
  //@ts-ignore
  delete admin.tokenVersion

  SendRefreshToken(res, refreshToken);

  return res.json({ token: newToken, admin });
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  res.clearCookie("jrt");

  return res.send();
};
