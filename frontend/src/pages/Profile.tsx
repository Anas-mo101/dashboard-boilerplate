import { Card, Flex, Icon, TabPanel, Title, Divider } from "@tremor/react"
import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { updateUser } from "../services/userServices";
import toastError from "../errors/toastError";
import { toast } from "react-toastify";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { DashboardAdmin } from "../interface";



const Profile: React.FC = () => {
    const { user, setUser } = useAuthContext();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repassword, setRePassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setName(user.name)
        }
    }, [user]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

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

            const updatedUser = await updateUser(user!.id, {
                ...toUpdate
            });

            setUser(updatedUser as DashboardAdmin);

            setIsLoading(false);

            toast.success("Profile Updated Succcesfully")
        } catch (error) {
            toastError(error)
        }
    }

    return (
        <Card className="mt-6">
            <div className="flex flex-col justify-center items-center">
                <div>
                    <div className="flex">
                        <Title> Profile </Title>
                        <Icon icon={InformationCircleIcon} variant="simple" tooltip="My Current Profile" />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 w-1/3">
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800" >
                            Name
                        </label>
                        <input
                            onChange={({ target }) => setName(target.value)}
                            type="name"
                            value={name}
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border border-slate-800 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800" >
                            Email
                        </label>
                        <input
                            onChange={({ target }) => setEmail(target.value)}
                            type="email"
                            value={email}
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
                            {isLoading ? "Hold on..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </Card>
    )
}

export default Profile;