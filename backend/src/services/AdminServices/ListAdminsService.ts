import { Admin } from "@prisma/client";
import prisma from "../../database";

interface Request {
  searchParam?: string;
  pageNumber?: string | number;
}

interface Response {
  admins: Admin[];
  count: number;
  hasMore: boolean;
}

const ListAdminsService = async ({
  searchParam = "",
  pageNumber = "1"
}: Request): Promise<Response> => {
  const whereCondition = {
    OR: [
      {
        name: {
          contains: searchParam.toLowerCase()
        }
      },
      {
        email: {
          contains: searchParam.toLowerCase()
        }
      }
    ]
  };

  const take = 20;
  const skip = take * (+pageNumber - 1);

  const admins = await prisma.admin.findMany({
    where: whereCondition,
    take,
    skip,
    select: {
      name: true,
      email: true,
      role: true,
      id: true,
    }
  });

  const count = await prisma.admin.count({
    where: whereCondition
  });

  const hasMore = count > skip + admins.length;

  return {
    //@ts-ignore
    admins,
    count,
    hasMore
  };
};

export default ListAdminsService;
