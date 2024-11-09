import { Request, Response } from "express";
import AppError from "../errors/AppError";

import CreateUserService from "../services/AdminServices/CreateAdminService";
import UpdateUserService from "../services/AdminServices/UpdateUserService";
import ShowUserService from "../services/AdminServices/ShowAdminService";
import DeleteUserService from "../services/AdminServices/DeleteAdminService";
import CheckSettingsService from "../services/SettingServices/CheckSettingsService";
import ListAdminsService from "../services/AdminServices/ListAdminsService";

type IndexQuery = {
  searchParam: string;
  pageNumber: string;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { searchParam, pageNumber } = req.query as IndexQuery;

  const { admins, count, hasMore } = await ListAdminsService({
    searchParam,
    pageNumber
  });

  const filterAdmins = admins.filter((admin) => admin.id != parseInt(req.user.id));

  return res.json({ admins: filterAdmins, count, hasMore });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { email, password, name, role } = req.body;

  if (req.url === "/signup" && (await CheckSettingsService("userCreation")) === "disabled") {
    throw new AppError("ERR_USER_CREATION_DISABLED", 403);
  } else if (req.url !== "/signup" && req.user.role !== "ADMIN") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const admin = await CreateUserService({
    email,
    password,
    name,
    role,
  });

  //@ts-ignore
  delete admin.password;
  //@ts-ignore
  delete admin.tokenVersion;

  return res.status(200).json(admin);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const admin = await ShowUserService(parseInt(id));

  //@ts-ignore
  delete admin.password;
  //@ts-ignore
  delete admin.tokenVersion;

  return res.status(200).json(admin);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {

  if (req.user.role !== "ADMIN") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const { id } = req.params;
  const userData = req.body;

  const admin = await UpdateUserService({ userData, id: parseInt(id) });

  //@ts-ignore
  delete admin.password;
  //@ts-ignore
  delete admin.tokenVersion;

  return res.status(200).json(admin);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  if (req.user.role !== "ADMIN") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  await DeleteUserService(parseInt(id));

  return res.status(200).json({ message: "User deleted" });
};
