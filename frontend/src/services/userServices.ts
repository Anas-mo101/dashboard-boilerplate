import toastError from "../errors/toastError";
import { PaginatedDashboardAdmin } from "../interface";
import api from "./apiServices";

const userUrl = "http://localhost:8080/api/admin";

export const addUser = async (
  email: string,
  name: string,
  password: string,
  role: string,
) => {

  const payload = {
    email: email,
    name: name,
    password: password,
    role: role
  };

  try {
    const res = await api.post(userUrl, payload);
    return res.data;
  } catch (error) {
    toastError(error);
  }
};

export const updateUser = async (
  id: number,
  data: {
    email?: string,
    name?: string,
    password?: string,
    role?: string
  }
) => {
  const payload: any = {};

  if (data.email) {
    payload.email = data.email;
  }

  if (data.name) {
    payload.name = data.name;
  }

  if (data.password) {
    payload.password = data.password;
  }

  if (data.role) {
    payload.role = data.role;
  }

  try {
    const res = await api.put(`${userUrl}/${id}`, payload);
    return res.data;
  } catch (error) {
    toastError(error);
  }
};


export const getUsers = async (searchParam: string = "", pageNumber: number = 1): Promise<PaginatedDashboardAdmin> => {
  try {
    const res = await api.get(`${userUrl}`, {
        params: {
          pageNumber, searchParam
        }
      }
    );
    return res.data;
  } catch (error) {
    toastError(error);
    return {
      hasMore: false,
      count: 0,
      admins: []
    };
  }
};

export const getUser = async (uid: number) => {
  try {
    const res = await api.get(`${userUrl}/${uid}`);
    return res.data;
  } catch (error) {
    toastError(error);
    return null;
  }
};

export const deleteUser = async (uid: number) => {
  try {
    const res = await api.delete(`${userUrl}/${uid}`);
    return res.data;
  } catch (error) {
    toastError(error);
    return null;
  }
};

