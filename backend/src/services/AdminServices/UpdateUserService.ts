import * as Yup from "yup";

import AppError from "../../errors/AppError";
import { SerializeUser } from "../../helpers/SerializeUser";
import ShowUserService from "./ShowAdminService";

import prisma from "../../database";
import { hash } from "bcryptjs";

interface UserData {
  email?: string;
  password?: string;
  name?: string;
  role?: string;
}

interface Request {
  userData: UserData;
  id: number;
}

interface Response {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UpdateUserService = async ({
  userData,
  id
}: Request): Promise<Response | undefined> => {

  const schema = Yup.object().shape({
    name: Yup.string().min(2),
    email: Yup.string().email(),
    role: Yup.string(),
    password: Yup.string()
  });

  const { email, password, role, name } = userData;

  try {
    await schema.validate({ email, password, role, name });
  } catch (err: any) {
    throw new AppError(err.message);
  }

  let toUpdate: any = {};

  if(password){
    const hashed =  await hash(password, 8);
    toUpdate.password = hashed;
  }

  if(email){
    toUpdate.email = email;
  }

  if(role){
    toUpdate.role = role;
  }

  if(name){
    toUpdate.name = name;
  }

  const admin = await prisma.admin.update({
    where: {
      id
    },
    data: toUpdate
  });

  return SerializeUser(admin);
};

export default UpdateUserService;
