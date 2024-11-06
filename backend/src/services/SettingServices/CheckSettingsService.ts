import prisma from "../../database";
import AppError from "../../errors/AppError";


const CheckSettingsService = async (key: string): Promise<string> => {
  const setting = await prisma.setting.findFirst({
    where: { key }
  });

  if (!setting) {
    throw new AppError("ERR_NO_SETTING_FOUND", 404);
  }

  return setting.value;
};

export default CheckSettingsService;
