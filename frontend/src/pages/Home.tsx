import React from "react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";

import {
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import Spinner from "../components/Spinner";
import Admins from "../components/Admins";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";

const Home: React.FC = () => {
  return (
    <TabGroup className="mt-6">
      <TabList>
        <Tab> Admins </Tab>
      </TabList>
      <TabPanels>
        <Admins />
      </TabPanels>
    </TabGroup>
  );
};

export default Home;
