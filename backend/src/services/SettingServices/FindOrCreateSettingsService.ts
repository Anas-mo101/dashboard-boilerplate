import { Setting } from "@prisma/client";
import prisma from "../../database";

const FindOrCreateSettingService = async (
  key: string,
  def?: string
): Promise<Setting> => {
  let whereCondition = {
    key
  };

  let settings = await prisma.setting.findFirst({
    where: whereCondition
  });

  if (!settings) {
    settings = await prisma.setting.create({
      data: {
        key: key,
        value: def ?? "",
      }
    });
  }

  return settings;
};

export default FindOrCreateSettingService;
