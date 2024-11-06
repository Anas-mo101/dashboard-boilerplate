import { Admin, AdminRole } from "@prisma/client";

interface SerializedUser {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
}

export const SerializeUser = (admin: Admin): SerializedUser => {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };
};
