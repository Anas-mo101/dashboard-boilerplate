import toastError from "../errors/toastError";
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
  email?: string,
  name?: string,
  password?: string,
  role?: string,
) => {

  const payload = {
    email: email,
    name: name,
    password: password,
    role: role
  };

  try {
    const res = await api.put(userUrl, payload);
    return res.data;
  } catch (error) {
    toastError(error);
  }
};


export const getUsers = async () => {
  try {
    const res = await api.get(userUrl);
    return res.data;
  } catch (error) {
    toastError(error);
    return [];
  }
};

export const getUser = async (uid: string) => {
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

