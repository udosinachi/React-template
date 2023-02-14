import { useState } from "react";
import {
  EditIcon,
  DeleteIcon,
  PhoneIcon,
  SearchIcon,
  EmailIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
  Flex,
  Icon,
  InputGroup,
  Input,
  InputRightElement,
  InputRightAddon,
  Select,
} from "@chakra-ui/react";
import {
  useGetAllUserInfo,
  useDeleteUserInfo,
  useGetUserInfoByIdMutate,
  useGetSearchUserInfo,
  useGetSearchUserInfoMutate,
  useGetAllUser,
} from "../../services/query/user";
import useCustomToast from "../../utils/notification";
import { AddUserModal } from "../../components/modals/AddUserModal";
import { Loader } from "../../components/WithSuspense";
import { useQueryClient } from "react-query";
import { GET_ALL_USER_INFO } from "../../services/queryKeys";
import { EditUserModal } from "../../components/modals/EditUserModal";
import { NavLink } from "react-router-dom";
import Pagination from "../CustomerBook/Pagination";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

const TeamMembers = () => {
  const queryClient = useQueryClient();
  const { errorToast, successToast } = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [editID, setEditID] = useState("");
  const [userIdData, setUserIdData] = useState("");
  // console.log(userIdData);

  const [allSearchedUserData, setAllSearchedUserData] = useState([]);
  // console.log(allSearchedUserData);
  const [searchedWords, setSearchedWords] = useState("");
  const [noSearchRecord, setNoSearchRecord] = useState("");
  // console.log(noSearchRecord);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  // console.log(currentPage);
  // console.log(recordsPerPage);

  const {
    data,
    isLoading,
    refetch: refetchAllUser,
  } = useGetAllUser(currentPage, recordsPerPage);
  const allUserData = data?.document?.records;
  const totalRecords = data?.document?.totalRecords;
  //   console.log(data?.document?.totalRecords);
  // console.log(allUserData);

  // const {
  //   data: searchedData,
  //   isLoading: searchLoader,
  //   refetch: refetchSearchedUser,
  // } = useGetSearchUserInfo(searchedWords, 1, 100);
  // const allSearchedUserData = searchedData?.document?.records;
  // console.log(allSearchedUserData);

  const { mutate: searchMutate, isLoading: searchLoader } =
    useGetSearchUserInfoMutate({
      onSuccess: (res: any) => {
        // console.log(res);
        setAllSearchedUserData(res?.document?.records);
        setNoSearchRecord(res?.message);
      },
      onError: (err: any) => {
        // console.log(err?.response?.data);
        errorToast("Failed to Search");
      },
    });

  const searchHandler = () => {
    // if (searchedWords.length === 0) {
    //   errorToast("No Record Found");
    //   setTimeout(() => {
    //     window.location.href = "/customer-book";
    //   }, 200);
    // }
    if (searchedWords.length < 3) {
      errorToast("Minimum 3 chracters required for search");
      return false;
    }
    if (noSearchRecord === "No Record Found") {
      errorToast("No Record Found");
    }

    searchMutate({
      searchKey: searchedWords,
      page: currentPage,
      itemsPerPage: recordsPerPage,
    });
  };

  const pageNumbers: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allUserData?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  // console.log(currentRecords, "Recc");
  const nPages = Math.ceil(allUserData?.length / recordsPerPage);
  // console.log(nPages, "npage");

  const nextPage = () => {
    // if (currentPage !== nPages) {
    setCurrentPage(currentPage + 1);
    // searchMutate({
    //   searchKey: searchedWords,
    //   page: currentPage,
    //   itemsPerPage: recordsPerPage,
    // });
    // }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      // searchMutate({
      //   searchKey: searchedWords,
      //   page: currentPage,
      //   itemsPerPage: recordsPerPage,
      // });
    }
  };

  const tableSizeChanger = (e: any) => {
    setRecordsPerPage(e.target.value);
  };

  const { mutate: byIdMutate, isLoading: loaderId } = useGetUserInfoByIdMutate({
    onSuccess: (res: any) => {
      // console.log(res);
      setUserIdData(res);
    },
    onError: (err: any) => {
      // console.log(err);
      errorToast("Failed");
    },
  });

  const { mutate, isLoading: isDelete } = useDeleteUserInfo({
    onSuccess: (res: any) => {
      // console.log(res);
      successToast("Record Deleted");
      setTimeout(() => {
        queryClient.invalidateQueries(GET_ALL_USER_INFO);
      }, 200);
    },
    onError: (err: any) => {
      // console.log(err);
      errorToast("Failed");
    },
  });

  const deleteUserInfo = (id: any) => {
    alert("Are you sure");
    // console.log(id);
    mutate({
      id,
    });
  };

  // console.log(editID);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box>
            <Flex
              justifyContent="space-between"
              mb="3"
              flexWrap="wrap"
              alignItems="center"
            >
              <InputGroup
                w={["100%", "300px", "300px", "300px"]}
                size={"md"}
                border="grey"
              >
                <Input
                  type="text"
                  placeholder="Search User"
                  value={searchedWords}
                  onChange={(e) => setSearchedWords(e.target.value)}
                />
                <InputRightAddon
                  children="Search"
                  bgColor="#26C6DA"
                  color="white"
                  cursor="pointer"
                  onClick={() => searchHandler()}
                />
              </InputGroup>
              {/* <Button size={"sm"} bgColor="#26C6DA" color="white" onClick={onOpen}>
            Add New User
          </Button> */}
              {/* <Box fontSize="14px">Total of {totalRecords} Team Members</Box> */}
            </Flex>
            <TableContainer bg="white">
              <Table size="sm" variant="simple">
                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                <Thead bgColor="gray.200">
                  <Tr>
                    <Th color="#26C6DA" py="4">
                      ID
                    </Th>
                    <Th color="#26C6DA">Email </Th>
                    <Th color="#26C6DA">Role Name </Th>
                    <Th color="#26C6DA">First Name </Th>
                    <Th color="#26C6DA">Last Name </Th>
                    <Th color="#26C6DA">Phone Number</Th>
                    <Th color="#26C6DA">Logged In Status </Th>
                    <Th color="#26C6DA"></Th>
                    {/* <Th>Last Login </Th> */}
                  </Tr>
                </Thead>

                <Tbody>
                  {!allSearchedUserData || allSearchedUserData?.length === 0
                    ? allUserData?.map((info: any) => (
                        <Tr
                          key={info.id}
                          //   onClick={() => {
                          //     setEditID(info?.id);
                          //     onOpenEdit();
                          //     byIdMutate({
                          //       id: info?.id,
                          //     });
                          //   }}
                          cursor="pointer"
                          _hover={{ background: "whitesmoke" }}
                        >
                          <Td py="3">{info?.id}</Td>
                          <Td py="3">
                            <EmailIcon mr="3" color="#26C6DA" />
                            {info?.email}
                          </Td>
                          <Td>{info?.role}</Td>
                          <Td>{info?.firstName}</Td>
                          <Td>{info?.lastName}</Td>
                          <Td>{info?.phoneNumber}</Td>
                          {info?.id % 2 ? (
                            <Td bgColor="green.200" color="green">
                              Logged In
                            </Td>
                          ) : (
                            <Td bgColor="red.200" color="red">
                              Logged Out
                            </Td>
                          )}

                          {/* <Td>{info?.lastLogin}</Td> */}
                          <Td>
                            {/* <Icon
                          onClick={() => {
                            setEditID(info?.id);
                            onOpenEdit();
                            byIdMutate({
                              id: info?.id,
                            });
                          }}
                          as={EditIcon}
                          boxSize={5}
                          mr="3"
                          cursor="pointer"
                        /> */}
                            {/* <Icon
                              onClick={() => deleteUserInfo(info?.id)}
                              as={DeleteIcon}
                              boxSize={5}
                              color="red.500"
                              cursor="pointer"
                            /> */}
                          </Td>
                        </Tr>
                      ))
                    : allSearchedUserData?.map((info: any) => (
                        <Tr key={info.id}>
                          <Td>{info?.id}</Td>
                          <Td py="3">
                            <EmailIcon mr="3" color="#26C6DA" />
                            {info?.email}
                          </Td>
                          <Td>{info?.role}</Td>
                          <Td>{info?.firstName}</Td>
                          <Td>{info?.lastName}</Td>
                          <Td>{info?.phoneNumber}</Td>
                          <Td>Logged In</Td>
                          {/* <Td>{info?.lastLogin}</Td> */}
                          <Td>
                            {/* <Icon
                          onClick={() => {
                            setEditID(info?.id);
                            onOpenEdit();
                            byIdMutate({
                              id: info?.id,
                            });
                          }}
                          as={EditIcon}
                          boxSize={5}
                          mr="3"
                          cursor="pointer"
                        /> */}
                            <Icon
                              onClick={() => deleteUserInfo(info?.id)}
                              as={DeleteIcon}
                              boxSize={5}
                              color="red.500"
                              cursor="pointer"
                            />
                          </Td>
                        </Tr>
                      ))}
                </Tbody>
                {/* ) : ( */}

                {/* )} */}
              </Table>
            </TableContainer>

            <Box>
              <Flex flexWrap="wrap" mt="3" fontSize="13px">
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  mr="2"
                  border="grey"
                  borderRadius="5px"
                  w="35px"
                  h="35px"
                  cursor="pointer"
                  bgColor="white"
                  onClick={prevPage}
                  color="#26C6DA"
                  // mr="3"
                  _hover={{ background: "#26C6DA", color: "white" }}
                >
                  <ArrowLeftIcon />
                </Flex>
                {pageNumbers.map((pgNumber: any) => (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    mr="2"
                    border="grey"
                    borderRadius="5px"
                    w="35px"
                    h="35px"
                    cursor="pointer"
                    mb="2"
                    color={`${currentPage === pgNumber ? "white" : "#26C6DA"}`}
                    key={pgNumber}
                    bgColor={`${
                      currentPage === pgNumber ? "#26C6DA" : "white"
                    }`}
                    onClick={() => {
                      setCurrentPage(pgNumber);
                    }}
                    _hover={{ background: "#26C6DA", color: "white" }}
                  >
                    {pgNumber}
                  </Flex>
                ))}
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  mr="2"
                  border="grey"
                  borderRadius="5px"
                  w="35px"
                  h="35px"
                  bgColor="white"
                  cursor="pointer"
                  onClick={nextPage}
                  color="#26C6DA"
                  _hover={{ background: "#26C6DA", color: "white" }}
                  // ml="3"
                >
                  <ArrowRightIcon />
                </Flex>
                <Flex p="1" px="2" align="center">
                  PageSize
                  <Select
                    size="xs"
                    ml="3"
                    w="55px"
                    h="35px"
                    onChange={tableSizeChanger}
                    border="grey"
                    bgColor="white"
                    borderRadius="5px"
                  >
                    {/* <option value="5">5</option> */}
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </Select>
                </Flex>
              </Flex>
            </Box>
          </Box>
          <AddUserModal
            isOpen={isOpen}
            onClose={onClose}
            refetchAllUser={refetchAllUser}
          />
          <EditUserModal
            editID={editID}
            isOpenEdit={isOpenEdit}
            onCloseEdit={onCloseEdit}
            userIdData={userIdData}
            refetchAllUser={refetchAllUser}
          />
        </>
      )}
    </div>
  );
};

export default TeamMembers;
