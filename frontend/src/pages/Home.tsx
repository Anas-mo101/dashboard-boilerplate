import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";

import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Flex,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Button
} from "@tremor/react";
import Spinner from "../components/Spinner";
import Admins from "../components/Admins";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";

const Home: React.FC = () => {
  const { user, handleLogout } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="px-12 py-12">
      <div className="flex justify-between">
        <div>
          <Title>Dashboard</Title>
          <Text>Welcome, {user?.name} </Text>
        </div>

        <Button onClick={() => handleLogout()} className="bg-white mx-2 w-8 h-8">
          <Icon icon={ArrowLeftStartOnRectangleIcon} variant="simple" tooltip="Logout" />
        </Button>
      </div>
      <TabGroup className="mt-6">
        <TabList>
          <Tab> My Profile </Tab>
          <Tab> Admins </Tab>
        </TabList>
        <TabPanels>
          <TabPanel></TabPanel>
          <Admins />
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default Home;
