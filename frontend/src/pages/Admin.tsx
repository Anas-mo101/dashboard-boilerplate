import React, { useEffect, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/20/solid";

import {
  Card,
  Title,
  Icon,
  Divider
} from "@tremor/react";
import { useHistory, useLocation } from "react-router-dom";
import { addUser, getUser, updateUser } from "../services/userServices";
import { toast } from "react-toastify";
import toastError from "../errors/toastError";
import { DashboardAdmin } from "../interface";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Admin: React.FC = () => {
  const query = useQuery();
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const history = useHistory();

  const [adminToEdit, setAdminToEdit] = useState<DashboardAdmin | null>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const add = query.get("add");
    const id = query.get("id");

    const init = async () => {
      if(id) {
        const admin = await getUser( parseInt(id) );
        setAdminToEdit( admin as DashboardAdmin )
      } else if (add) {
        setIsAdd(true);
      } 
    }

    init();
  }, [query])

  const addAdmin = async () => {
    let data: any = { email, name }

    if (password.length < 6) {
      setPassword("");
      throw "Password should be at least 6 characters long";
    }

    if (password !== repassword) {
      setPassword("");
      setRePassword("");
      throw "Passwords are not matching";
    }

    data.password = password

    setIsLoading(true);

    await addUser(email, name, password, "ADMIN");

    setIsLoading(false);

    toast.success("Admin Created Succcesfully")
  }

  const editAdmin = async () => { 
    if(!adminToEdit){
      throw "Id not defined";
    }

    let toUpdate: any = { email, name }

    if (password != "") {
        if (password.length < 6) {
            setPassword("");
            throw "Password should be at least 6 characters long";
        }

        if (password !== repassword) {
            setPassword("");
            setRePassword("");
            throw "Passwords are not matching";
        }

        toUpdate.password = password
    }

    setIsLoading(true);

    await updateUser(adminToEdit.id, {
        ...toUpdate
    });

    setIsLoading(false);

    toast.success("Admin Updated Succcesfully")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if(isAdd){
        await addAdmin();
      } else {
        await editAdmin();
      }

      history.push('/');
    } catch (error) {
      toastError(error)
    }
  }

  return (
    <Card className="mt-6">
      <div className="flex flex-col justify-center items-center">
        <div>
          <div className="flex">
            <Title> {isAdd ? "New Admin" : "Edit Admin"} </Title>
            <Icon icon={InformationCircleIcon} variant="simple" tooltip={isAdd ? "Add New Admin" : "Change Existing Admin Details"} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 w-1/3">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800" >
              Name
            </label>
            <input
              onChange={({ target }) => {
                if(!isAdd){
                  setAdminToEdit({
                    ...adminToEdit!,
                    name: target.value,
                  });
                }

                setName(target.value)
              }}
              type="name"
              value={isAdd ? name : adminToEdit?.name}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border border-slate-800 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800" >
              Email
            </label>
            <input
              onChange={({ target }) => {
                if(!isAdd){
                  setAdminToEdit({
                    ...adminToEdit!,
                    email: target.value,
                  });
                }

                setEmail(target.value)
              }}
              type="email"
              value={isAdd ? email : adminToEdit?.email}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border border-slate-800 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <Divider />
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800" >
              Password
            </label>
            <input
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              placeholder="Enter New Password"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border border-slate-800 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800" >
              Confrim Password
            </label>
            <input
              onChange={({ target }) => setRePassword(target.value)}
              type="password"
              placeholder="Re-enter New Password"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border border-slate-800 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6 w-1/2">
            <button disabled={isLoading} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              {isLoading ? "Hold on..." : isAdd ? "Add New Admin" : "Edit Admin" }
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default Admin;
