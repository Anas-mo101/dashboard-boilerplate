import { Setting } from "@prisma/client";
import prisma from "../../database";

const ListSettingsService = async (): Promise<Setting[] | undefined> => {

  const settings = await prisma.setting.findMany({
    where: {}
  });

  return settings;
};

export default ListSettingsService;
