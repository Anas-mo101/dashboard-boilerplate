import AppError from "../../errors/AppError";
import prisma from "../../database";

const DeleteAdminService = async (id: number): Promise<void> => {
  const admin = await prisma.admin.delete({
    where: { id }
  });

  if (!admin) {
    throw new AppError("ERR_NO_ADMIN_FOUND", 404);
  }
};

export default DeleteAdminService;
