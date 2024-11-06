import { InformationCircleIcon, PlusIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";

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
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../services/userServices";
import { DashboardAdmin } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Admins: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [admins, setAdmins] = useState<DashboardAdmin[]>([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchVideoData = async () => {
            setIsLoading(true)
            const response = await getUsers();
            setAdmins(response.admins);
            setIsLoading(false)
        }

        fetchVideoData();
    }, [])

    const deleteAdmin = (uid: number) => {
        setIsLoading(true);
        deleteUser(uid).then(() => {
            setAdminList(admins.filter((admin) => admin.id !== uid));
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    }

    const setAdminList = (admins: Array<DashboardAdmin>) => {

        if (!admins || admins.length <= 0) {
            return (
                <TableRow key="0">
                    <TableHeaderCell className="text-center"> No Admins </TableHeaderCell>
                </TableRow>
            )
        }

        return admins.map((item) => (
            <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.role}</TableCell>
                <TableCell className="text-center">
                    <Button onClick={() => { deleteAdmin(item.id) }} className="bg-white mx-2 w-8 h-8">
                        <Icon icon={TrashIcon} variant="simple" tooltip="Delete Admin" />
                    </Button>
                    <Button onClick={() => { history.push('admins/' + item.id) }} className="bg-white mx-2 w-8 h-8">
                        <Icon icon={EyeIcon} variant="simple" tooltip="View Admin Details" />
                    </Button>
                </TableCell>
            </TableRow>
        ))
    }

    return (
     <>
      {isLoading && <Spinner></Spinner>}
      {!isLoading && <TabPanel>
            <div className="mt-6">
                <Card>
                    <div>
                        <Flex className="space-x-0.5 justify-between" justifyContent="start" alignItems="center">
                            <div className="flex">
                                <Title> Admins </Title>
                                <Icon icon={InformationCircleIcon} variant="simple" tooltip="List of admins" />
                            </div>
                            <div>
                                <Button onClick={() => { }} className="bg-white w-12 h-12">
                                    <Icon icon={PlusIcon} variant="simple" tooltip="Create New Admin" />
                                </Button>
                            </div>
                        </Flex>
                    </div>
                    <Table className="mt-6">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Name</TableHeaderCell>
                                <TableHeaderCell className="text-right">Role</TableHeaderCell>
                                <TableHeaderCell className="text-center">Actions</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {setAdminList(admins)}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </TabPanel>}
     </>
    );
};

export default Admins;