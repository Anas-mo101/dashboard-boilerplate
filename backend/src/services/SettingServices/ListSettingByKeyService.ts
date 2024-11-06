import prisma from "../../database";
import AppError from "../../errors/AppError";

interface Response {
  key: string;
  value: string;
}
const ListSettingByKeyService = async (
  key: string
): Promise<Response | undefined> => {
  const settings = await prisma.setting.findFirst({
    where: { key }
  });

  if (!settings) {
    throw new AppError("ERR_NO_SETTINGS_FOUND", 404);
  }

  return { key: settings.key, value: settings.value };
};

export default ListSettingByKeyService;
