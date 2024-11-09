import * as Yup from "yup";
import AppError from "../../errors/AppError";
import prisma from "../../database";
import { SerializeUser } from "../../helpers/SerializeUser";
import { AdminRole } from "@prisma/client";
import { hash } from "bcryptjs";

interface Request {
  email: string;
  password: string;
  name: string;
  role?: AdminRole;
}

interface Response {
  email: string;
  name: string;
  id: number;
  role: AdminRole;
}

const CreateAdminService = async ({
  email,
  password,
  name,
  role = AdminRole.ADMIN,
}: Request): Promise<Response> => {
  const schema = Yup.object().shape({
    name: Yup.string().required().min(2),
    email: Yup.string()
      .email()
      .required()
      .test(
        "Check-email",
        "ERR_USER_EXISTS",
        async value => {
          if (!value) return false;
          const emailExists = await prisma.admin.findFirst({
            where: { email: value }
          });
          return !emailExists;
        }
      ),
    password: Yup.string().required().min(5)
  });

  try {
    await schema.validate({ email, password, name });
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const hashed =  await hash(password, 8);

  const user = await prisma.admin.create({
    data: {
      email: email.toLowerCase(),
      password: hashed,
      name,
      role,
    }
  });

  return SerializeUser(user);
};

export default CreateAdminService;
