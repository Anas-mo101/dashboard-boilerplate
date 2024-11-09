import React from "react";
import { ArrowLeftStartOnRectangleIcon, UserIcon } from "@heroicons/react/20/solid";

import {
    Title,
    Text,
    Icon,
    Button
} from "@tremor/react";
import Spinner from "../components/Spinner";
import Admins from "../components/Admins";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import Profile from "../pages/Profile";
import { useHistory } from "react-router-dom";

const Header: React.FC = () => {
    const { user, handleLogout } = useAuthContext();
    const history = useHistory();

    return (
        <div className="flex justify-between">
            <div>
                <Title>Dashboard</Title>
                <Text>Welcome, {user?.name} </Text>
            </div>


            <div>
                <Button onClick={() => history.push("/profile")} className="bg-white mx-2 w-8 h-8">
                    <Icon icon={UserIcon} variant="simple" tooltip="Profile" />
                </Button>

                <Button onClick={() => handleLogout()} className="bg-white mx-2 w-8 h-8">
                    <Icon icon={ArrowLeftStartOnRectangleIcon} variant="simple" tooltip="Logout" />
                </Button>
            </div>
        </div>
    );
};

export default Header