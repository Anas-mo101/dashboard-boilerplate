import { Setting } from "@prisma/client";
import AppError from "../../errors/AppError";
import prisma from "../../database";

interface Request {
  key: string;
  value: string;
}

const UpdateSettingService = async ({
  key,
  value,
}: Request): Promise<Setting | undefined> => {

  const setting = await prisma.setting.update({
    where: {
      key
    },
    data: {
      value
    }
  });

  if (!setting) {
    throw new AppError("ERR_NO_SETTING_FOUND", 404);
  }

  return setting;
};

export default UpdateSettingService;
