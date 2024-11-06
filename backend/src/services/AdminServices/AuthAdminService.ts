import { compare } from "bcryptjs";
import prisma from "../../database";
import AppError from "../../errors/AppError";
import { createAccessToken, createRefreshToken } from "../../helpers/CreateTokens";
import { SerializeUser } from "../../helpers/SerializeUser";


interface SerializedUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: SerializedUser;
  token: string;
  refreshToken: string;
}

const AuthAdminService = async ({
  email,
  password
}: Request): Promise<Response> => {
  const user = await prisma.admin.findFirst({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    throw new AppError("ERR_INVALID_CREDENTIALS", 401);
  }

  const isValid = await compare(password, user.password);

  if (!isValid) {
    throw new AppError("ERR_INVALID_CREDENTIALS", 401);
  }

  const token = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  const serializedUser = SerializeUser(user);

  return {
    user: serializedUser,
    token,
    refreshToken
  };
};

export default AuthAdminService;
