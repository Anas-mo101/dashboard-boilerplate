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
    Button,
} from "@tremor/react";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../services/userServices";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { DashboardAdmin } from "../interface";
import ConfirmationDialog from "./ConfirmationDialog";

const Admins: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [admins, setAdmins] = useState<DashboardAdmin[]>([]);

    const [hasMore, setHasMore] = useState(false);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchVideoData = async () => {
            setIsLoading(true)
            const response = await getUsers(search, page);
            setAdmins(prevState => ([...prevState, ...response.admins]))
            setHasMore(response.hasMore)
            setIsLoading(false)
        }

        fetchVideoData();
    }, [page, search])

    const nextPage = () => {
        if (hasMore) {
            setPage(page + 1);
        }
    }

    const deleteAdmin = async (id: number) => {
        setIsLoading(true);
        await deleteUser(id);
        const filtered = admins.filter((admin) => admin.id !== id);
        setAdmins(filtered);
        setIsLoading(false);
    }

    const setAdminList = (admins: Array<DashboardAdmin>) => {
        if (!admins || admins.length <= 0) {
            return <></>
        }

        return admins.map((item) => (
            <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.email}</TableCell>
                <TableCell className="text-center">
                    <ConfirmationDialog
                        title={"Confrim Admin Deletion ?"}
                        desc={"Are you sure you want to delete admin id " + item.id}
                        cancelText={"Cancel Deletion"}
                        confrimText={"Delete Admin"}
                        onConfrim={() => deleteAdmin(item.id)}
                        trigger={
                            <Button className="bg-white mx-2 w-8 h-8">
                                <Icon icon={TrashIcon} variant="simple" tooltip="Delete Admin" />
                            </Button>
                        }
                    />
                    <Button onClick={() => history.push('admin?id=' + item.id)} className="bg-white mx-2 w-8 h-8">
                        <Icon icon={EyeIcon} variant="simple" tooltip="View Admin Details" />
                    </Button>
                </TableCell>
            </TableRow>
        ))
    }

    return (
        <>
            <TabPanel>
                <Card className="mt-6">
                    <div>
                        <Flex className="space-x-0.5 justify-between" justifyContent="start" alignItems="center">
                            <div className="flex flex-1">
                                <Title> Admins </Title>
                                <Icon icon={InformationCircleIcon} variant="simple" tooltip="List of admins" />
                            </div>
                            <div className="flex items-center gap-2 ">
                                <input
                                    placeholder="search admins ..."
                                    id="search"
                                    name="search"
                                    type="search"
                                    className="rounded-lg h-8 border-blue-500"
                                    onChange={({ target }) => {
                                        setAdmins([]);
                                        setPage(1);
                                        setSearch(target.value)
                                    }}
                                />
                                <Button onClick={() => history.push("/admin?add=true")} className="bg-white w-8 h-8">
                                    <Icon icon={PlusIcon} variant="simple" tooltip="Create New Admin" />
                                </Button>
                            </div>
                        </Flex>
                    </div>
                    <Table className="mt-6">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Name</TableHeaderCell>
                                <TableHeaderCell className="text-right">Email</TableHeaderCell>
                                <TableHeaderCell className="text-center">Actions</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading && <Spinner></Spinner>}

                            {!isLoading && setAdminList(admins)}
                        </TableBody>
                    </Table>
                    {
                        hasMore && <div className="flex justify-center mt-6">
                            <Button onClick={() => nextPage()} className="bg-white text-blue-500 w-1/4 h-8">
                                Load More
                            </Button>
                        </div>
                    }
                </Card>
            </TabPanel>
        </>
    );
};

export default Admins;