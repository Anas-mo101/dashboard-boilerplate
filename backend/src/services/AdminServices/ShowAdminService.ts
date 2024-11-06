import AppError from "../../errors/AppError";
import prisma from "../../database";
import { Admin } from "@prisma/client";

const ShowAdminService = async (id: number): Promise<Admin> => {
  const admin = await prisma.admin.findUnique({
    where: {
      id
    }
  });

  if (!admin) {
    throw new AppError("ERR_NO_ADMIN_FOUND", 404);
  }

  return admin;
};

export default ShowAdminService;
